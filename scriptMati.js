//variables *******
var menu = document.getElementById('menu');
var abrir = document.getElementById('abrir-menu');
var cerrar = document.getElementById('cerrar-menu');
var slides = document.getElementById('slides');
var dots = document.getElementById('dots');
var slide = slides.children;
var distancia = slides.children[0].clientWidth;
var dot = dots.children;
var cantidadSlides = slides.children.length;
var cantidadDots = dots.children.length;
var distanciaActual = 0;
// animacion
let animado = document.querySelectorAll('.animado');


//eventos ******
function eventos() {
    //cerrar y abrir menu
    document.addEventListener('click', cerrarMenu);
    abrir.addEventListener('click', abrirMenu);
    
    // slide
    dots.addEventListener('click', moverSlide);
    prepararSlide();
    arrastrarSlide();

    //aparecer elementos con scroll
    window.addEventListener('scroll', mostrarScroll);   
}



//funciones
function abrirMenu() {
    menu.classList.add('mostrar-menu');
}

function cerrarMenu(e) {
    if ( menu.classList.contains('mostrar-menu')) {    
        if ( e.target.classList.contains('img-abrir') ) {
            menu.classList.remove('ocultar-menu');
            menu.classList.add('mostrar-menu');
        } else {
            menu.classList.add('ocultar-menu');
            menu.classList.remove('mostrar-menu');
        }
    }
}

function prepararSlide() {
    
    if ( cantidadSlides === cantidadDots ) {
        for ( let i=0; i < cantidadDots; i++ ){
            dot[i].setAttribute("id", `dot-${i+1}`);
            slide[i].setAttribute("id", `slide-${i+1}`);
        }
    } else {
        alert('Cantidad de Slides y Dots no coinciden');
    }
}

function moverSlide(e) {  
     clearInterval(automaticSlide);
    
     // ver si dio click en un dot
    if ( e.target.id.split('-')[1] ) { 
        let idDot = e.target.id.split('-')[1];
        let distanciaMover = distanciaActual + distancia * idDot;

        for( let i=0; i < slide.length; i++ ){
            let idSlide = slide[i].id.split('-')[1];
            if ( idSlide === idDot ) {
                distanciaMover = distanciaMover - distancia - distanciaActual;
                if ( distanciaActual != distanciaMover) {
                    slides.scrollTo({ left: (slides.scrollLeft + distanciaMover - distanciaActual), behavior: 'smooth' });
                }
                setTimeout(() => {
                    distanciaActual = slides.scrollLeft;
                }, cantidadDots * 250);
            }
        }   
      
        // espero que termine de deslizar para actualizar dots 
        setTimeout(() => {
            coloresDots();
        }, cantidadDots * 260);
    
    }
}

var automaticSlide = setInterval(() => {
    slides.scrollTo({ left: (slides.scrollLeft + distancia), behavior: 'smooth' });
    setTimeout(() => {
        coloresDots();
    }, cantidadDots * 260);
}, 8000);


// mostrar dot activo
function coloresDots() {
 
    let ubicacionSlide = Math.round(slides.scrollLeft / distancia + 1);
    for (let i=0; i < dot.length; i++) {
        dot[i].classList.remove('active');
        if ( dot[i].id.split('-')[1] == ubicacionSlide ) {
            dot[i].classList.add('active');
        }
    }
}

function arrastrarSlide() {
    slides.addEventListener("touchend", () => {
        clearInterval(automaticSlide);
        // espero que termine de deslisar para actualizar dots
        setTimeout(() => {
            coloresDots();
        }, cantidadDots * 260);
        
    })
}

function mostrarScroll() {
    let scrollTop = document.documentElement.scrollTop;
    let alturaPantalla = document.getElementById('slides').clientHeight;
    for (let i=0; i<animado.length; i++) {
        let alturaAnimado = animado[i].offsetTop;
        if (alturaAnimado - alturaPantalla - 100 < scrollTop) {
            animado[i].style.opacity = 1;
            animado[i].classList.add('mostrar-arriba');
        }
    }
}

// llamar funcion "eventos" desde el HTML con img de pixel
eventos();
