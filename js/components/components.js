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
      <button class="header-icon btn btn-empty d-none d-sm-inline-block" type="button" id="fullScreenButton">
        <i class="simple-icon-size-fullscreen"></i>
        <i class="simple-icon-size-actual"></i>
      </button>
    </div>

    <div class="user d-inline-block">
      <button class="btn btn-empty p-0" type="button" data-toggle="dropdown" aria-haspopup="true"
        aria-expanded="false">
        <span class="name" id="student-name-nav">${auth.user.first_name} ${auth.user.last_name} | ${auth.user.username}</span>
        <span>
          <img alt="Profile Picture" src="" id="student-avatar"/>
        </span>
      </button>

      <div class="dropdown-menu dropdown-menu-right mt-3">
        <a class="dropdown-item" href="#">Soporte</a>
        <a class="dropdown-item" href="#" onclick="auth.logout()">Cerrar Sesión</a>
      </div>
    </div>
  </div>
`

const mainMenu = `
  <div class="scroll">
    <ul class="list-unstyled">
      <li class="main-menu-item profile-menu-item">
          <a href="perfil.html">
            <i class="iconsmind-Profile"></i> Perfil
          </a>
      </li>
      <li class="main-menu-item portfolio-menu-item">
        <a href="portafolio.html">
          <i class="iconsmind-Folder-Cloud"></i> Portafolio
        </a>
      </li>
      <li class="main-menu-item asignations-menu-item">
          <a href="asignaciones.html">
              <i class="iconsmind-Letter-Open"></i> Asignaciones
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