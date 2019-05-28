auth.checkSession()

//Global vars
let assignmentStatus = ''

const getAssignment = async () => {
  const assignmentId = localStorage.assignmentId
  if (!assignmentId) location.href = 'asignaciones.html'
  try {
    const { data: assignment } = await http.get('academy/assignments/' + auth.user.id + '/' + assignmentId + '/')
    setAssignment(assignment)
  } catch (error) {
    console.log(error)
  }
}

const setAssignment = assignment => {
  $('#activity-title').html(assignment.activity.title)
  $('#activity-instructions').html(assignment.activity.instructions)
  $('#activity-module').html(assignment.activity.module.title)
  $('#activity-language').html(assignment.activity.language.title)
  $('#activity-value').html(assignment.activity.value)
  $('#activity-difficulty-level').html(`
    <select class="rating" data-current-rating="${assignment.activity.difficulty_level}" data-readonly="true">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  `)

  if (assignment.activity.support_materials.length > 0) {
    let materialsHtml = ''
    for (const material of assignment.activity.support_materials) {
      if (material.material_file)
        materialsHtml += `
          <div class="card mb-4">
            <div class="card-body d-flex justify-content-between align-items-center">
              <h6 class="mb-0">${material.title}</h6>
              <a href="${material.material_file}" target="_blank">Ver archivo</a>
            </div>
          </div>
        `
      if (material.material_url)
        materialsHtml += `
          <div class="card mb-4">
            <div class="card-body d-flex justify-content-between align-items-center">
              <h6 class="mb-0">${material.title}</h6>
              <a href="${material.material_url}" target="_blank">Ver link</a>
            </div>
          </div>
        `
    }
    $('#activity-material').html(materialsHtml)
  } else {
    $('#activity-material-title').html('No hay material de apoyo para esta actividad')
  }

  let score = 0
  for (const delivery of assignment.assignment_deliveries) score += delivery.score
  const difference = getDecomposedDatetimeDifference(assignment.deadline)
  $('#assignment-time').html(`${difference.days} días ${difference.hours} horas y ${difference.minutes} minutos`)
  assignmentStatus = GetAssignmentStatus(assignment)
  $('#assignment-status').html('Expira en')
  $('#assignment-time').addClass('text-success')
  switch (assignmentStatus) {
    case 'pending':
      $('#assignment-status-title').html('Pendiente').addClass('text-warning')
      $('#assignment-status-container').append('<i class="simple-icon-clock mt-2 ml-2 text-warning" style="font-size: 25px"></i>')
      $('#assignment-status-title').html('Pendiente de entregar').addClass('text-warning')
      $('#assignment-upload-container').removeClass('hidden')
      break
    case 'expired':
      $('#assignment-status-title').html('Pendiente').addClass('text-danger')
      $('#assignment-status-container').append('<i class="simple-icon-close mt-2 ml-2 text-danger" style="font-size: 25px"></i>')
      $('#assignment-status-title').html('Expirado').addClass('text-danger')
      $('#assignment-status').html('Expiró hace')
      $('#assignment-time').addClass('text-danger')
      $('#assignment-upload-container').removeClass('hidden').html('<h1 class="m-5">Ya no puedes subir entregas</h1>')
      break
    case 'reviewed':
      $('#assignment-score-title').html('Puntaje obtenido')
      $('#assignment-status-title').html('Calificado').addClass('text-success')
      $('#assignment-status-container').append('<i class="simple-icon-check mt-2 ml-2 text-success" style="font-size: 25px"></i>')
      $('#activity-value').html(`${score} / ${assignment.activity.value}`)
      $('#assignment-delivered-container').removeClass('hidden')
      break
    case 'delivered':
      $('#assignment-status-title').html('Entregado').addClass('text-info')
      $('#assignment-status-container').append('<i class="simple-icon-arrow-up-circle mt-2 ml-2 text-info" style="font-size: 25px"></i>')
      $('#assignment-delivered-container').removeClass('hidden')
      break
    default:
      break;
  }

  if (assignmentStatus == 'reviewed' || assignmentStatus == 'delivered') {
    if ( difference.diff < 0) {
      $('#assignment-status').html('Expiró hace')
      $('#assignment-time').addClass('text-danger')
    }else{
      $('#assignment-upload-container').removeClass('hidden')
    }

    let deliveriesHtml = ''
    for (const delivery of assignment.assignment_deliveries) {
      let fileIcon = ''
      let linkIcon = ''
      let deliveryScore = ''
      let comment = ''
      if (delivery.anotation) comment = delivery.anotation
      if (delivery.delivery_file) fileIcon = `
        <a href="${delivery.delivery_file}" target="_blank" class="mr-3">
          <i class="iconsmind-File-Link" style="font-size: 40px"></i>
        </a>
      `
      if (delivery.delivery_url) linkIcon = `
        <a href="${delivery.delivery_url}" target="_blank">
          <i class="simple-icon-link" style="font-size: 40px"></i>
        </a>
      `
      if (delivery.score) deliveryScore = `Punteo: ${delivery.score} |`
      deliveriesHtml += `
        <div class="d-flex flex-row mb-3 pb-3 border-bottom">
          <div class="pl-3 pr-2">
            ${fileIcon}
            ${linkIcon}
            <p class="font-weight-medium mb-0">${comment}</p>
            <p class="text-muted mb-1 text-small">${deliveryScore} Entregado: ${moment(delivery.delivered).format('DD/MM/Y hh:mm:ss a')}</p>
          </div>
        </div>
      `
    }

    $('#assignment-delivered-content').html(deliveriesHtml)

  }

}

const UploadDelivery = async () => {
  const data = new FormData()
  const file = $('#assignment-file')[0].files[0]
  const url = $('#assignment-url').val()
  const anotation = $('#assignment-comment').val()
  const assignmentId = localStorage.assignmentId

  if (!assignmentId) location.href = 'asignaciones.html'

  if (!file && url == '') {
    showMessage('Error', '<p>Debe adjuntar un archivo o una URL válida</p>')
    return
  }

  if (file) data.append('delivery_file', file)
  if (url != '') data.append('delivery_url', url)

  data.append('delivered', moment(new Date()).format('Y-MM-DD hh:mm:ss-12'))
  data.append('anotation', anotation)
  data.append('student', auth.user.id)
  data.append('assignment_activity', assignmentId)
  $('#btn-deliver').prop('disabled', true)
  $('#btn-deliver').html('Subiendo...')

  try {
    const response = await http.post(`academy/deliveries/`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
    if (response.status == 201) {
      location.reload()
    }
  } catch (error) {
    $('#btn-deliver').prop('disabled', false)
    $('#btn-deliver').html('Subir entrega')
    if (error.response.data.delivery_url[0] == 'Enter a valid URL.') {
      showMessage('Error de formato', 'Ingrese una URL válida')
    } else {
      showMessage('Error de conexión', '<p>No se ha podido completar la entrega, intente nuevamente.</p>')
    }
  }
}

(() => {
  SetActiveTabMenu('asignations')
  getAssignment()
})()