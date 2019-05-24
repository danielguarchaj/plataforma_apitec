auth.checkSession()

//Global vars
let assignmentStatus = ''

const getAssignment = async () => {
  const assignmentId = getUrlParameter('assignment')
  if (!assignmentId) location.href = 'asignaciones.html'
  try {
    const { data: assignment } = await http.get('academy/assignments/' + assignmentId + '/' + auth.user.id)
    if ( assignment.id )
      setAssignment(assignment)
    else 
      location.href = 'asignaciones.html'
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
      let type = ''
      switch (material.material_type) {
        case 'link':
          type = `<a target="_blank" href="${material.material_url}">Link</a>`
          break
        case 'file':
          type = `<a target="_blank" href="${material.material_file}">Archivo</a>`
        case 'video':
          type = `<a target="_blank" href="${material.material_url}">Video</a>`
        default:
          break
      }
      materialsHtml += `
        <div class="col-3 mb-4">
          <div class="card dashboard-small-chart">
            <div class="card-body text-center">
              <h4>${material.title}</h4>
              <p>${type}</p>
            </div>
          </div>
        </div>
      `
    }
    $('#activity-material').html(materialsHtml)
  } else {
    $('#activity-no-material').html('<h1>No hay material de apoyo para esta actividad</h1>')
  }

  const difference = getDecomposedDatetimeDifference(assignment.deadline)
  $('#assignment-time').html(`${difference.days} días ${difference.hours} horas y ${difference.minutes} minutos`)
  assignmentStatus = GetAssignmentStatus(assignment)
  switch (assignmentStatus) {
    case 'pending':
      $('#assignment-status').html('Expira en')
      $('#assignment-upload-container').removeClass('hidden')
      $('#assignment-status-pending').removeClass('hidden')
      break;
    case 'expired':
      $('#assignment-status').html('Expiró hace')
      $('#assignment-time').addClass('text-danger')
      $('#assignment-status-expired').removeClass('hidden')
      break
    case 'reviewed':
      var differenceDelivered = getDecomposedDatetimeDifference(assignment.delivered)
      $('#assignment-time').html(`${differenceDelivered.days} días ${differenceDelivered.hours} horas y ${differenceDelivered.minutes} minutos`)
      $('#assignment-status').html('Entregado hace')
      $('#assignment-time').addClass('text-success')
      $('#assignment-score-title').html('Puntaje obtenido')
      $('#activity-value').html(`${assignment.score} / ${assignment.activity.value}`)
      $('#assignment-delivered-container').removeClass('hidden')
      $('#assignment-status-reviewed').removeClass('hidden')
      break
    case 'delivered':
      var differenceDelivered = getDecomposedDatetimeDifference(assignment.delivered)
      $('#assignment-time').html(`${differenceDelivered.days} días ${differenceDelivered.hours} horas y ${differenceDelivered.minutes} minutos`)
      $('#assignment-status').html('Entregado hace')
      $('#upload-file-title').html('Editar entrega')
      $('#btn-deliver').html('Editar entrega')
      $('#btn-deliver').addClass('btn-outline-danger').removeClass('btn-outline-info')
      $('#assignment-time').addClass('text-success')
      $('#assignment-delivered-container').removeClass('hidden')
      $('#assignment-status-delivered').removeClass('hidden')
      $('#assignment-upload-container').removeClass('hidden')
      break
    default:
      break;
  }

  if (assignmentStatus == 'reviewed' || assignmentStatus == 'delivered') {
    $('#assignment-delivered-content').append('<h5 class="mb-4">Contenido entregado</h5>')
    if (assignment.file_assignment)
      $('#assignment-delivered-content').append(`        
        <h5 class="mb-4">Se adjunto archivo</h5>
        <div class="input-group mb-3">
          <a href="${assignment.file_assignment}">${assignment.file_assignment}</a>
        </div>
      `)
    else
      $('#assignment-delivered-content').append(`<p class="mb-4">No se subió ningún archivo</p>`)
    if (assignment.url_assignment)
      $('#assignment-delivered-content').append(`
      <h5 class="mb-4">Se adjunto URL</h5>
      <div class="form-group mt-3">
        <a href="${assignment.url_assignment}">${assignment.url_assignment}</a>
      </div>
    `)
    else
      $('#assignment-delivered-content').append('<p>No se adjuntó ningúna url</p>')
  }
}

const UploadAssignment = async () => {
  const data = new FormData()
  const file = $('#assignment-file')[0].files[0]
  const url = $('#assignment-url').val()
  const assignmentId = getUrlParameter('assignment')

  if (!file && url == '') {
    showMessage('Error', '<p>Debe adjuntar un archivo o una URL válida</p>')
    return
  }

  if (file) data.append('file_assignment', file)
  if (url != '') data.append('url_assignment', url)
  data.append('delivered', moment(new Date()).format('Y-MM-DD hh:mm:ss-12'))
  const user = auth.user
  try {
    const response = await http.patch(`academy/assignments/${assignmentId}/${auth.user.id}/`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
    if (response.status == 200) {
      location.reload()
    }
  } catch (error) {
    if(error.response.data.url_assignment[0] == 'Enter a valid URL.') {
      showMessage('Error de formato', 'Ingrese una URL válida')
    }else{
      showMessage('Error de conexión', '<p>No se ha podido completar la entrega, intente nuevamente.</p>')
    }
  }
}

(() => {
  SetActiveTabMenu('asignations')
  getAssignment()
})()