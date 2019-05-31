auth.checkSession()
SetActiveTabMenu('profile')

const setUserData = () => {
  $('#user-first-name').val(auth.user.first_name)
  $('#user-last-name').val(auth.user.last_name)
  $('#user-email').val(auth.user.email)
  $('#student-address').val(auth.user.student.address)
  $('#student-phone-number').val(auth.user.student.phone_number)
  $('#student-phone-emergency').val(auth.user.student.emergency_phone_number)
  
  if (auth.user.student.birth_date)
    $('#student-birthdate').val(
      moment(auth.user.student.birth_date).format('MM/DD/Y')
    )
  
  if (auth.user.student.resume) $('#resume-container').html(`
    <a href="${auth.user.student.resume}" target="_blank">Ver mi currículum actual</a>
  `)
  else $('#resume-container').html(`
    <p>No tienes un currículum en tu perfil</p>
  `)
  let groupsHtml = ''
  for (const group of auth.user.student.groups) groupsHtml += `<li>${group.title}</li>`
  if (groupsHtml == '') $('#groups-title').html('Aun no estas asignado a un grupo')
  else $('#student-groups').html(groupsHtml)

  $('#student-avatar-profile').attr('src', auth.user.student.avatar)

}

const saveChanges = async () => {
  const data = {}
  data['first_name'] = $('#user-first-name').val()
  data['last_name'] = $('#user-last-name').val()
  data['email'] = $('#user-email').val()
  $('#btn-save-student').prop('disabled', true)
  $('#btn-save-student').html('Guardando Cambios...')
  try {
    await http.patch('users/'+auth.user.id+'/', data)
  } catch (error) {
    showMessage('Error', 'Los cambios no se guardaron correctamente, intente nuevamente.')
    $('#btn-save-student').prop('disabled', false)
    $('#btn-save-student').html('Guardar Cambios')
    console.log(error)
  }

  const dataStudent = new FormData()
  dataStudent.append('address', $('#student-address').val())
  dataStudent.append('phone_number', $('#student-phone-number').val())
  dataStudent.append('emergency_phone_number', $('#student-phone-emergency').val())
  
  if ($('#student-resume')[0].files[0])
    dataStudent.append('resume', $('#student-resume')[0].files[0])

  let birthDate = ''
  if ($('#student-birthdate').val() != '')
    birthDate = moment($('#student-birthdate').val()).format('Y-MM-DD')
  
  if (birthDate == 'Invalid date'){
    showMessage('Error', 'Ingrese una fecha valida')
    return
  }else{
    dataStudent.append('birth_date', birthDate)
  }
  try {
    const response = await http.patch('users/student/'+auth.user.id+'/', dataStudent)
    if (response.status == 200) {
      console.log(response)
      await setAvatar()
      setUserData()
      $('#btn-save-student').prop('disabled', false)
      $('#btn-save-student').html('Guardar Cambios')
      showMessage('Datos guardados', 'Los cambios se guardaron correctamente')
    }
  } catch (error) {
    showMessage('Error', 'Los cambios no se guardaron correctamente, intente nuevamente.')
    $('#btn-save-student').prop('disabled', false)
    $('#btn-save-student').html('Guardar Cambios')
    console.log(error)
  }
}

const uploadPicture = async () => {
  const picture = new FormData()
  const file = $('#student-avatar-file')[0].files[0]
  if (!file){
    showMessage('Error', 'Debes adjuntar un archivo válido para subir')
    return
  }
  picture.append('avatar', file)
  $('#btn-upload-picture').html('Subiendo archivo...')
  $('#btn-upload-picture').prop('disabled', true)
  try {
    const response = await http.patch('users/student/'+auth.user.id+'/', picture)
    if (response.status == 200){
      await setAvatar()
      setUserData()
      showMessage('Foto guardada', 'El archivo se ha subido correctamente')
    }
  } catch (error) {
    showMessage('Error', 'Los cambios no se guardaron correctamente, intente nuevamente.')
    console.log(error)
  }
  $('#btn-upload-picture').html('Cambiar foto')
  $('#btn-upload-picture').prop('disabled', false)
}

(async () => {
  await setUserData()
}) () 