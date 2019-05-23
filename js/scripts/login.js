auth.userIsLogged()

const login = async () => {
  const username = $('#username').val()
  const password = $('#password').val()

  if (username == '' || password == '') {
    alert('Ingrese su usuario y su contraseña')
    return
  }

  const credentials = {
    username: username,
    password: password
  }
  try {
    const { data: authResponse } = await http.post('api-token-auth/', credentials)
    const payload = parseJwt(authResponse.token)
    try {
      const { data: currentUser } = await http.get('users/' + payload.user_id, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT '.concat(authResponse.token)
        }
      })
      auth.login(authResponse.token, currentUser)
    } catch (error) {
      console.log(error)
    }
  } catch (error) {
    console.log(error)
    alert('Credenciales inválidos');
  }
}