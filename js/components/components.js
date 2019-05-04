const navbar = `
  <div class="d-flex align-items-center navbar-left">
      <a href="#" class="menu-button d-none d-md-block">
          <svg class="main" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 17">
              <rect x="0.48" y="0.5" width="7" height="1" />
              <rect x="0.48" y="7.5" width="7" height="1" />
              <rect x="0.48" y="15.5" width="7" height="1" />
          </svg>
          <svg class="sub" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 17">
              <rect x="1.56" y="0.5" width="16" height="1" />
              <rect x="1.56" y="7.5" width="16" height="1" />
              <rect x="1.56" y="15.5" width="16" height="1" />
          </svg>
      </a>
      <a href="#" class="menu-button-mobile d-xs-block d-sm-block d-md-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 17">
              <rect x="0.5" y="0.5" width="25" height="1" />
              <rect x="0.5" y="7.5" width="25" height="1" />
              <rect x="0.5" y="15.5" width="25" height="1" />
          </svg>
      </a>
  </div>

  <a class="navbar-logo" href="Dashboard.Default.html">
      <span class="logo d-none d-xs-block"></span>
      <span class="logo-mobile d-block d-xs-none"></span>
  </a>

  <div class="navbar-right">
      <div class="header-icons d-inline-block align-middle">
          
          <div class="position-relative d-inline-block">
              <button class="header-icon btn btn-empty" type="button" id="notificationButton" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  <i class="simple-icon-bell"></i>
                  <span class="count">3</span>
              </button>
              <div class="dropdown-menu dropdown-menu-right mt-3 scroll position-absolute" id="notificationDropdown">

                  <div class="d-flex flex-row mb-3 pb-3 border-bottom">
                      <a href="#">
                          <img src="img/profile-pic-l-2.jpg" alt="Notification Image" class="img-thumbnail list-thumbnail xsmall border-0 rounded-circle" />
                      </a>
                      <div class="pl-3 pr-2">
                          <a href="#">
                              <p class="font-weight-medium mb-1">Joisse Kaycee just sent a new comment!</p>
                              <p class="text-muted mb-0 text-small">09.04.2018 - 12:45</p>
                          </a>
                      </div>
                  </div>

                  <div class="d-flex flex-row mb-3 pb-3 border-bottom">
                      <a href="#">
                          <img src="img/notification-thumb.jpg" alt="Notification Image" class="img-thumbnail list-thumbnail xsmall border-0 rounded-circle" />
                      </a>
                      <div class="pl-3 pr-2">
                          <a href="#">
                              <p class="font-weight-medium mb-1">1 item is out of stock!</p>
                              <p class="text-muted mb-0 text-small">09.04.2018 - 12:45</p>
                          </a>
                      </div>
                  </div>


                  <div class="d-flex flex-row mb-3 pb-3 border-bottom">
                      <a href="#">
                          <img src="img/notification-thumb-2.jpg" alt="Notification Image" class="img-thumbnail list-thumbnail xsmall border-0 rounded-circle" />
                      </a>
                      <div class="pl-3 pr-2">
                          <a href="#">
                              <p class="font-weight-medium mb-1">New order received! It is total $147,20.</p>
                              <p class="text-muted mb-0 text-small">09.04.2018 - 12:45</p>
                          </a>
                      </div>
                  </div>

                  <div class="d-flex flex-row mb-3 pb-3 ">
                      <a href="#">
                          <img src="img/notification-thumb-3.jpg" alt="Notification Image" class="img-thumbnail list-thumbnail xsmall border-0 rounded-circle" />
                      </a>
                      <div class="pl-3 pr-2">
                          <a href="#">
                              <p class="font-weight-medium mb-1">3 items just added to wish list by a user!</p>
                              <p class="text-muted mb-0 text-small">09.04.2018 - 12:45</p>
                          </a>
                      </div>
                  </div>

              </div>
          </div>

          <button class="header-icon btn btn-empty d-none d-sm-inline-block" type="button" id="fullScreenButton">
              <i class="simple-icon-size-fullscreen"></i>
              <i class="simple-icon-size-actual"></i>
          </button>

      </div>

      <div class="user d-inline-block">
          <button class="btn btn-empty p-0" type="button" data-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false">
              <span class="name">Apitec Student Name</span>
              <span>
                  <img alt="Profile Picture" src="img/profile-pic-l.jpg" />
              </span>
          </button>

          <div class="dropdown-menu dropdown-menu-right mt-3">
              <a class="dropdown-item" href="#">Mi Perfil</a>
              <a class="dropdown-item" href="#">Mi Portafolio</a>
              <a class="dropdown-item" href="#">Soporte</a>
              <a class="dropdown-item" href="#">Cerrar Sesión</a>
          </div>
      </div>
  </div>
`

const mainMenu = `
  <div class="scroll">
    <ul class="list-unstyled">
      <li class="main-menu-item dashboard-menu-item active">
          <a href="index.html">
              <i class="simple-icon-home"></i>
              <span>Dashboard</span>
          </a>
      </li>
      <li class="main-menu-item material-menu-item">
          <a href="#material-apoyo">
            <i class="iconsmind-Digital-Drawing"></i> Material de apoyo
          </a>
      </li>
      <li class="main-menu-item quizzes-menu-item">
        <a href="quizzes.html">
          <i class="iconsmind-Brain"></i> Quizzes
        </a>
      </li>
      <li class="main-menu-item bolsa-menu-item">
          <a href="#bolsa-trabajo">
              <i class="iconsmind-Letter-Open"></i> Bolsa de trabajo
          </a>
      </li>
      <li class="main-menu-item academica-menu-item">
          <a href="#area-academica">
              <i class="iconsmind-Pencil"></i> Área académica
          </a>
      </li>
    </ul>
  </div>
`

const subMenu = `
  <div class="scroll">
    <ul class="list-unstyled" data-link="material-apoyo">
        <li class="sub-menu-item libros-sub-menu-item">
          <a href="libros.html">
            <i class="iconsmind-Open-Book"></i>Libros
          </a>
        </li>
        <li class="sub-menu-item videos-sub-menu-item">
          <a href="videos_tutoriales.html">
            <i class="iconsmind-Video-5"></i>Videos y Tutoriales
          </a>
        </li>
        <li class="sub-menu-item discusiones-sub-menu-item">
          <a href="discusiones.html">
            <i class="simple-icon-cup"></i>Discusiones en linea
          </a>
        </li>
    </ul>
    <ul class="list-unstyled" data-link="bolsa-trabajo">
      <li class="sub-menu-item trabajos-sub-menu-item">
        <a href="trabajos.html">
          <i class="iconsmind-Suitcase"></i> Ver trabajos
        </a>
      </li>
      <li class="sub-menu-item aplicaciones-sub-menu-item">
        <a href="aplicaciones.html">
          <i class="simple-icon-check"></i> Mis aplicaciones
        </a>
      </li>
      <li class="sub-menu-item empresas-sub-menu-item">
        <a href="empresas.html">
          <i class="iconsmind-Building"></i> Empresas
        </a>
      </li>
    </ul>
    <ul class="list-unstyled" data-link="area-academica">
      <li class="sub-menu-item tareas-sub-menu-item">
        <a target="_blank" href="#">
          <i class="iconsmind-Upload-Window"></i> Subir tarea
        </a>
      </li>
      <li class="sub-menu-item notas-sub-menu-item">
        <a target="_blank" href="#">
          <i class="simple-icon-graduation"></i> Mis notas
        </a>
      </li>
      <li class="sub-menu-item rendimiento-sub-menu-item">
        <a target="_blank" href="#">
          <i class="iconsmind-Bar-Chart"></i> Mi rendimiento 
        </a>
      </li>
    </ul>
  </div>
`