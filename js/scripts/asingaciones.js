
const getAssignments = async () => {
  try {
    const { data: assignments } = await http.get('academy/assignments/')
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

  let currentDate = moment(new Date())

  let pointsEarned = 0
  let pointsLost = 0
  let averageScore = 0
  let assignmentsDelivered = 0
  let assignmentsExpired = 0
  let assignmentsReviewed = 0
  
  const proportions = []

  for (const assignment of assignments) {
    //Condition for pending to deliver assignments and expired assignments:
    let deadline = moment(assignment.deadline, "Y-MM-DD hh:mm:ss")
    const diff = (deadline - currentDate) / (1000 * 60 * 60 * 24)
    if (!assignment.url_assignment && !assignment.file_assignment) {
      // If diff greater than zero, assignment is still pending to deliver
      if (diff > 0) {
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
      } else { // Assignment is expired
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
      }
    }
    //Condition for delivered assignments
    if (assignment.url_assignment || assignment.file_assignment) {
      if (assignment.score) { // If score is set and defined is a reviewed assignment
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
      } else { // score is not set and defined, it hasn't been reviewed yet but delivered
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
      }
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
  getAssignments()
})()


