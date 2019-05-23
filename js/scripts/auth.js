const auth = {
    // Name in localStorage
    TOKEN_STR: 'tokenAuth',
    USER_DATA: 'currentUser',
  
    // Token Getter, Setter, Remove
    get token() {
      return localStorage.getItem(this.TOKEN_STR)
    },
  
    set token(token) {
      localStorage.setItem(this.TOKEN_STR, token)
    },
  
    get user() {
      return localStorage.getItem(this.USER_DATA)
    },
  
    set user(userData) {
      localStorage.setItem(this.USER_DATA, userData)
    },
  
    removeToken() {
      localStorage.removeItem(this.TOKEN_STR)
    },
  
    removeUser() {
      localStorage.removeItem(this.USER_DATA)
    },
  
    login(token, userData) {
      this.user = JSON.stringify(userData)
      this.token = token
      location.href = 'asignaciones.html'
    },
  
    logout () {
      this.removeToken()
      this.removeUser()
      location.href = 'login.html'
    },
  
    checkSession() {
      if (!this.token || !this.user) {
        this.logout()
        return false
      }
      return true
    },
  
    userIsLogged() {
      if (this.token && this.user){
        location.href = 'asignaciones.html'
      }
      return
    },
  
    async currentUser() {
      if ( !this.user )
        this.logout()
      const { data } = await axios.get(`users/${userId}`)
      return data
    },
  
    async verifyToken() {
      try {
        await http.post(`api-token-verify/`, {
          "token": this.token
        })
      } catch (error) {
        console.log(error)
        alert('Sesión expirada')
        this.logout()        
      }
    }
  }