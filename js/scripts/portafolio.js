auth.checkSession()
SetActiveTabMenu('portfolio')

const getProjects = async () => {
  try {
    const { data: projects } = await http.get(`academy/projects/${auth.user.id}/`)
    setProjects(projects)
  } catch (error) {

  }
}

const setProjects = projects => {
  let projectsHtml = ''
  for (const project of projects) {
    projectsHtml += `
      <tr>
        <td>
          <p class="list-item-heading">${project.title}</p>
        </td>
        <td>
          <p class="text-muted"><a href="${project.url}" target="_blank">Visitar pagina</a></p>
        </td>
        <td>
          <img src="${project.image}" alt="project image" height="100px">
        </td>
        <td>
          <button type="button" class="btn btn-outline-info mb-1" onclick="getProject(${project.id})" data-toggle="modal" data-target="#modal-project">Edit</button>
          <button type="button" class="btn btn-outline-danger mb-1" onclick="projectDelete(${project.id})">Delete</button>
        </td>
      </tr>
    `
  }
  $('#projects-tbody').html(projectsHtml)
}

const getProject = async projectId => {
  $('.modal-title').html('Cargando información del proyecto')
  try {
    const { data } = await http.get(`academy/project/${projectId}/`)
    setProject(data)
  } catch (error) {
    console.log(error)
    showMessage('Error', '<p>No se pudo cargar la información del proyecto, intente nuevamente</p>')
  }
}

const setProject = project => {
  $('.modal-title').html('Información del proyecto')
  $('#project-title').val(project.title)
  $('#project-url').val(project.url)
  if (project.image) {
    $('#project-image-exists').html(`
    <p>Imagen actual</p>
    <img src="${project.image}" class="w-100">
    `)
  }
  $('#modal-project-footer').html(`
    <button type="button" class="btn btn-outline-primary" data-dismiss="modal">Cerrar</button>
    <button type="button" class="btn btn-outline-info" id="btn-save-project" onclick="saveProject(${project.id})">Guardar Cambios</button>
  `)
}

const saveProject = async projectId => {
  const data = new FormData()
  const projectImage = $('#project-image-upload')[0].files[0]
  const projectTitle = $('#project-title').val()
  const projectUrl = $('#project-url').val()

  if (projectTitle == '') {
    showMessage('Error', '<p>Ingrese el titulo del proyecto</p>')
    return
  }

  if (projectUrl == '') {
    showMessage('Error', '<p>Debe adjuntar una URL válida</p>')
    return
  }

  if (!projectImage && !projectId) {
    showMessage('Error', '<p>Debe adjuntar una imagen del proyecto válida</p>')
    return
  }

  if (projectImage) data.append('image', projectImage)

  data.append('title', projectTitle)
  data.append('url', projectUrl)
  
  $('#btn-save-project').prop('disabled', true)
  $('#btn-save-project').html('Guardando cambios...')
  try {
    if (projectId) {
      const response = await http.patch(`academy/project/${projectId}/`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
      if (response.status == 200) {
        location.reload()
      }
    }else{
      data.append('owner', auth.user.id)
      const response = await http.post(`academy/projects/0/`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
      if (response.status == 201) {
        location.reload()
      }
    }
  } catch (error) {
    console.log(error.response.data.url[0])
    $('#btn-save-project').prop('disabled', false)
    $('#btn-save-project').html('Guardar Cambios')
    if (error.response.data.url[0] == 'Enter a valid URL.') {
      showMessage('Error de formato', 'Ingrese una URL válida')
    } else {
      showMessage('Error de conexión', '<p>No se ha podido completar la entrega, intente nuevamente.</p>')
    }
  }
}

const setFormProject = () => {
  $('#project-title').val('')
  $('#project-url').val('')
  $('#project-iamge-exists').html('')
  $('.modal-title').html('Agregar nuevo poryecto')
  $('#modal-project-footer').html(`
    <button type="button" class="btn btn-outline-primary" data-dismiss="modal">Cerrar</button>
    <button type="button" class="btn btn-outline-info" id="btn-save-project" onclick="saveProject()">Guardar Cambios</button>
  `)
}

(() => {
  getProjects()

})()