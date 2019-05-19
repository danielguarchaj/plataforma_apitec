//Global vars
let assignmentStatus = ''

const getAssignment = async () => {
  const assignmentId = getUrlParameter('assignment')
  if (!assignmentId) location.href = 'asignaciones.html'

  try {
    const { data: assignment } = await http.get('academy/assignments/' + assignmentId + '/')
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

  if (assignment.activity.support_materials.length > 0){
    let materialsHtml = ''
    for (const material of assignment.activity.support_materials) {
      materialsHtml += `
        <a href="#" class="card">
          <div class="card-body text-center">
            <i class="iconsmind-Idea-4"></i>
            <p class="card-text mb-0">
              ${material.title}
            </p>
            <p class="lead text-center">
              ${material.material_type}
            </p>
          </div>
        </a>
      `
    }
    $('#activity-material').html(materialsHtml)
  }else{
    $('#activity-material').html('<h1>No hay material de apoyo para esta actividad</h1>')
  }

  const difference = getDecomposedDatetimeDifference(assignment.deadline)
  $('#assignment-time').html(`${difference.days} días ${difference.hours} horas y ${difference.minutes} minutos`)
  assignmentStatus = GetAssignmentStatus(assignment)
  switch ( assignmentStatus ) {
    case 'pending':
      $('#assignment-status').html('Expira en')    
      break;
    case 'expired':
      $('#assignment-status').html('Expiró hace')
      $('#assignment-time').addClass('text-danger')
      $('#assignemnt-upload-container').remove()
      break
    case 'reviewed':
      var differenceDelivered = getDecomposedDatetimeDifference(assignment.delivered)
      $('#assignment-time').html(`${differenceDelivered.days} días ${differenceDelivered.hours} horas y ${differenceDelivered.minutes} minutos`)
      $('#assignment-status').html('Entregado hace')
      $('#assignment-time').addClass('text-success')
      $('#assignment-score-title').html('Puntaje obtenido')
      $('#activity-value').html(`${assignment.score} / ${assignment.activity.value}`)
      $('#btn-deliver').remove()
      break
    case 'delivered':
      var differenceDelivered = getDecomposedDatetimeDifference(assignment.delivered)
      $('#assignment-time').html(`${differenceDelivered.days} días ${differenceDelivered.hours} horas y ${differenceDelivered.minutes} minutos`)
      $('#assignment-status').html('Entregado hace')
      $('#assignment-time').addClass('text-success')
      $('#btn-deliver').remove()
      break
    default:
      break;
  }
}

(() => {
  SetActiveTabMenu('asignations')
  getAssignment()
})()