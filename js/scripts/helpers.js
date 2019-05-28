const SetActiveTabMenu = menuElement => {
  $('.main-menu-item').removeClass('active')
  $(`.${menuElement}-menu-item`).addClass('active')
}

function getUrlParameter(_a) { return decodeURIComponent((new RegExp("[?|&]" + _a + "=([^&;]+?)(&|#|;|$)").exec(location.search) || [, ""])[1].replace(/\+/g, "%20")) || null }

const GetAssignmentStatus = assignment => {
  let currentDate = moment(new Date())
  let deadline = moment(assignment.deadline, "Y-MM-DD hh:mm:ss")
  const diff = (deadline - currentDate) / (1000 * 60 * 60 * 24)

  // Condition for pending to deliver assignments and expired assignments:
  if (assignment.assignment_deliveries.length == 0) {
    if (diff > 0) // If diff greater than zero, assignment it can still be delivered
      return 'pending'
    else // Assignment has expired
      return 'expired'
  }
  
  console.log(assignment.assignment_deliveries.length)
  // Condition for delivered assignments that have been reviewed and pending to be reviewed

  let status = 'delivered'

  //Check every delivery score related to the assignment
  for (const delivery of assignment.assignment_deliveries) {
    console.log(delivery)
    // If at least one delivery has a score set, then it has been reviewed, otherwise it hasn't been reviewed
    if (delivery.score) status = 'reviewed'
  }

  // return the assignment status
  return status
}

// Receives a valid datetime and returns object with difference in days, hours and minutes.
// Returns ABS value of difference
const getDecomposedDatetimeDifference = datetime => {
  const difference = {}
  const currentDate = moment(new Date())
  let deadline = moment(datetime, "Y-MM-DD hh:mm:ss")
  const diff = Math.abs((deadline - currentDate) / (1000 * 60 * 60 * 24))

  difference['days'] = Math.floor(diff)
  difference['hours'] = Math.floor((diff - difference.days) * 24)
  difference['minutes'] = Math.floor( ( ((diff - difference.days) * 24) - difference.hours ) * 60 )

  return difference
}

const showMessage = (title, body) => {
  $('#message-modal-title').html(title)
  $('#message-modal-body').html(body)
  $('#message-modal').modal('show');
}