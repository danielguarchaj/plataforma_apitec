const getAssignments = async () => {
  const user = JSON.parse(auth.user)
  try {
    const { data: assignments } = await http.get('academy/assignments_user/' + user.id)
    populateAssignments(assignments)
  } catch (error) {
    console.log(error)
    alert('No se pudieron cargar las asignaciones, intente mas tarde.')
  }
}

const populateAssignments = async assignments => {
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
              <p class="text-muted">${moment(assignment.created).format('DD/MM/Y hh:mm:ss')}</p>
            </td>
            <td>
              <p class="text-muted">${moment(assignment.deadline).format('DD/MM//Y hh:mm:ss')}</p>
            </td>
            <td>
              <p class="text-muted">${assignment.activity.value}</p>
            </td>
            <td>
              <button type="button" class="btn btn-outline-info mb-1"
                onclick="location.href='asignaciones_detalle.html?assignment=${assignment.id}'">Ver</button>
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
                <p class="text-muted">${moment(assignment.created).format('DD/MM/Y hh:mm:ss')}</p>
              </td>
              <td>
                <p class="text-muted">${moment(assignment.deadline).format('DD/MM/Y hh:mm:ss')}</p>
              </td>
              <td>
                <p class="text-muted">${assignment.activity.value}</p>
              </td>
              <td>
                <button type="button" class="btn btn-outline-info mb-1"
                  onclick="location.href='asignaciones_detalle.html?assignment=${assignment.id}'">Ver</button>
              </td>
            </tr>
          `
        break
      case 'reviewed':
        pointsEarned += assignment.score
        assignmentsReviewed++
        proportions.push(assignment.score / assignment.activity.value)
        reviewed += `
            <tr>
              <td>
                <p class="list-item-heading">${assignment.activity.title}</p>
              </td>
              <td>
                <p class="text-muted">${moment(assignment.deadline).format('DD/MM//Y hh:mm:ss')}</p>
              </td>
              <td>
                <p class="text-muted">${moment(assignment.delivered).format('DD/MM/Y hh:mm:ss')}</p>
              </td>
              <td>
                <p class="text-muted"> ${assignment.score} / ${assignment.activity.value}</p>
              </td>
              <td>
                <button type="button" class="btn btn-outline-info mb-1"
                  onclick="location.href='asignaciones_detalle.html?assignment=${assignment.id}'">Ver</button>
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
              <p class="text-muted">${moment(assignment.deadline).format('DD/MM//Y hh:mm:ss')}</p>
            </td>
            <td>
              <p class="text-muted">${moment(assignment.delivered).format('DD/MM/Y hh:mm:ss')}</p>
            </td>
            <td>
              <p class="text-muted">${assignment.activity.value}</p>
            </td>
            <td>
              <button type="button" class="btn btn-outline-info mb-1"
                onclick="location.href='asignaciones_detalle.html?assignment=${assignment.id}'">Ver</button>
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
  if (auth.checkSession()){
    SetActiveTabMenu('asignations')
    getAssignments()
  }
})()