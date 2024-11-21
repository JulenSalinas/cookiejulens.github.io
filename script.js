function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}

function cambiarIdioma(idioma) {
  setCookie('lengua', idioma, 6);
  

  if (idioma === 'Castellano') {
    window.location.href = 'index-es.html';
  } else 
  if (idioma === 'Euskera') {
    window.location.href = 'index-eu.html';
  } else {
    window.location.href = 'index.html'; // Por defecto le tengo que mandar al index Inglés.
  }
}





var idioma = getCookie('lengua'); // Pillo el idioma de la cookie


if (idioma) {
  // Redirijo a la página correspondiente
  if (idioma === 'Ingles') {
    if (!window.location.href.includes('index.html') && !window.location.href.includes('about.html')) {
      window.location.href = 'index.html';
    }
     /* 
       Esto redirige a la página de inicio en inglés si el idioma seleccionado es inglés si no está ya en esa página y si no es la página de about, esto es que si la cookie está en Ingles y si no se va a about, te va a llevar al index en Ingles.
     */ 
  } else 
  if (idioma === 'Euskera') {
    if (!window.location.href.includes('index-eu.html') && !window.location.href.includes('about-eu.html')) {
      window.location.href = 'index-eu.html';
    }
  } else 
  if (idioma === 'Castellano') {
    if (!window.location.href.includes('index-es.html') && !window.location.href.includes('about-es.html')) {
      window.location.href = 'index-es.html';
    }
  }
}

  /* 
    Este trámite/código de arriba de los if else hace que si el usuario tiene configurado un idioma en la cookie y no está en la página correspondiente, se le redirige a la adecuada eso si, si este decide NO ir a about, si se va a una página de about se le cargará esa.
  */

// Muestro el idioma actual
var elementoResultado = document.getElementById('resultado');
if (elementoResultado) {
  if (idioma) {
      elementoResultado.innerText = 'Idioma actual: ' + idioma;
  } else {
      elementoResultado.innerText = 'No hay cookie de idioma';
  }
}


var enlaces = document.getElementsByClassName('enlace');
for (let i = 0; i < enlaces.length; i++) {
  enlaces[i].onclick = function() { // https://www.w3schools.com/JSREF/tryit.asp?filename=tryjsref_onclick_dom una estructura similar a eso, ya que necesito poner una función a cada enlace tras hacer clic a cada uno de los elementos de nav, en este caso yo he usado una función anónima pero soy consiente que podría haber sido mejor usar una función flecha.
      var idiomaSeleccionado = this.getAttribute('idioma'); // Uso el atributo que tengo declarado en la lista del HTML    lo he sacado de: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_element_getattribute1
      // Tengo que usar el this porque enlaces es un array ya que estoy obteniendo todos los elementos de esa clase, en el ejemplo, trabaja directamente con esa variable ya que hace un getElmentById
      cambiarIdioma(idiomaSeleccionado); // Cambiar el idioma y esto lo hago gracias a los atributos que tengo el los li, porque estos se llaman igual que en los if else de la función cambiarIdioma
      return false; // Esto lo que supuestamente hace es que haga toda la parafernalia del JS que es ejecutar el código en vez de seguir con la navegación normal a la URL.
  }
}