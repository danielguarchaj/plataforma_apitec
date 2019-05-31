$('#navbar').html(navbar)
$('#mainmenu').html(mainMenu)
$('#submenu').html(subMenu)
const setAvatar = async () => {
  try {
    const { data } = await http.get(`users/${auth.user.id}`)
    auth.user = JSON.stringify(data)
    $('#student-avatar').attr('src', auth.user.student.avatar)
    $('#student-name-nav').html(`${auth.user.first_name} ${auth.user.last_name} | ${auth.user.username}`)
  } catch (error) {
    console.log(error)
  }
}

setAvatar()