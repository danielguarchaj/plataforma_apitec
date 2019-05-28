auth.checkSession()
localStorage.removeItem('assignmentId')


const getAssignments = async () => {
  try {
    const { data } = await http.get('users/assignments/' + auth.user.id + '/')
    let assignments = []
    for (const group of data.student.groups) {
      for (const assignment of group.group_assignments) {
        const repeated = assignments.filter(obj => { return obj.activity.id === assignment.activity.id })
        if (repeated.length == 0)
          assignments.push(assignment)
      }
    }
    populateAssignments(assignments)
  } catch (error) {
    console.log(error)
    alert('No se pudieron cargar las asignaciones, intente mas tarde.')
  }
}

const getAssignment = assignmentId => {
  localStorage.assignmentId = assignmentId
  location.href = 'asignaciones_detalle.html'
}

const populateAssignments = assignments => {
  let pending = ''
  let delivered = ''
  let reviewed = ''
  let expired = ''

  let pointsEarned = 0
  let pointsLost = 0
  let assignmentsDelivered = 0
  let assignmentsExpired = 0
  let assignmentsReviewed = 0

  const proportions = []

  for (const assignment of assignments) {
    switch (GetAssignmentStatus(assignment)) {
      case 'pending':
        pending += `
          <tr>
            <td>
              <p class="list-item-heading">${assignment.activity.title}</p>
            </td>
            <td>
              <p class="text-muted">${moment(assignment.created).format('DD/MM/Y hh:mm:ss a')}</p>
            </td>
            <td>
              <p class="text-muted">${moment(assignment.deadline).format('DD/MM/Y hh:mm:ss a')}</p>
            </td>
            <td>
              <p class="text-muted">${assignment.activity.value}</p>
            </td>
            <td>
              <button type="button" class="btn btn-outline-info mb-1"
                onclick="getAssignment(${assignment.id})">Ver</button>
            </td>
          </tr>
        `
        break
      case 'expired':
        pointsLost += assignment.activity.value
        assignmentsExpired++
        expired += `
            <tr>
              <td>
                <p class="list-item-heading">${assignment.activity.title}</p>
              </td>
              <td>
                <p class="text-muted">${moment(assignment.created).format('DD/MM/Y hh:mm:ss a')}</p>
              </td>
              <td>
                <p class="text-muted">${moment(assignment.deadline).format('DD/MM/Y hh:mm:ss a')}</p>
              </td>
              <td>
                <p class="text-muted">${assignment.activity.value}</p>
              </td>
              <td>
                <button type="button" class="btn btn-outline-info mb-1"
                  onclick="getAssignment(${assignment.id})">Ver</button>
              </td>
            </tr>
          `
        break
      case 'reviewed':
        let deliveryScore = 0
        for (const delivery of assignment.assignment_deliveries) {
          deliveryScore += delivery.score
          proportions.push(delivery.score / assignment.activity.value)
          pointsEarned += delivery.score
        }
        assignmentsReviewed++
        reviewed += `
            <tr>
              <td>
                <p class="list-item-heading">${assignment.activity.title}</p>
              </td>
              <td>
                <p class="text-muted">${moment(assignment.deadline).format('DD/MM/Y hh:mm:ss a')}</p>
              </td>
              <td>
                <p class="text-muted">${moment(assignment.delivered).format('DD/MM/Y hh:mm:ss a')}</p>
              </td>
              <td>
                <p class="text-muted"> ${deliveryScore} / ${assignment.activity.value}</p>
              </td>
              <td>
                <button type="button" class="btn btn-outline-info mb-1"
                  onclick="getAssignment(${assignment.id})">Ver</button>
              </td>
            </tr>
          `
        break
      case 'delivered':
        assignmentsDelivered++
        delivered += `
          <tr>
            <td>
              <p class="list-item-heading">${assignment.activity.title}</p>
            </td>
            <td>
              <p class="text-muted">${moment(assignment.deadline).format('DD/MM/Y hh:mm:ss a')}</p>
            </td>
            <td>
              <p class="text-muted">${moment(assignment.delivered).format('DD/MM/Y hh:mm:ss a')}</p>
            </td>
            <td>
              <p class="text-muted">${assignment.activity.value}</p>
            </td>
            <td>
              <button type="button" class="btn btn-outline-info mb-1"
                onclick="getAssignment(${assignment.id})">Ver</button>
            </td>
          </tr>
        `
      default:
        break;
    }
  }

  $('#pendientes-tbody').html(pending)
  $('#expiradas-tbody').html(expired)
  $('#entregadas-tbody').html(delivered)
  $('#calificadas-tbody').html(reviewed)

  $('#card-entregadas').html(assignmentsDelivered)
  $('#card-expiradas').html(assignmentsExpired)
  $('#card-calificadas').html(assignmentsReviewed)
  $('#card-puntos-sumados').html(pointsEarned)
  $('#card-puntos-perdidos').html(pointsLost)
  $('#card-promedio').html(
    ((proportions.reduce((a, b) => a + b, 0) / proportions.length) * 100).toFixed(2) + '%'
  )

}


(() => {
  SetActiveTabMenu('asignations')
  getAssignments()
})()