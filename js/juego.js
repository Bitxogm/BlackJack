/**
 * 2C = Two of Clubs (Treboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Clubs (Corazones)
 * 2S = Two of Spades (Espadas) 
 */


// CREAMOS LA BARAJA DE CARTAS INICIALIZANDO LA VARIABLE DECK , EN EL ARREGLO RECIBIMOS LA BARAJA


let deck         = [];
const tipos      = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K']

let puntosJugador = 0;
let puntosComputadora = 0 ;


// REFERENCIAS DEL HTML. CREAMOS CONSTANTE QUE HACE REFERENCIA AL BOTON .


const btnPedir   = document.querySelector ('#btnPedir');
const btnDetener = document.querySelector ('#btnDetener');
const btnNuevoJuego = document.querySelector ('#btnNuevoJuego');

// CREAMOS UNA CONSTANTE PARA REICBIR LA SUMA DE LAS CARTAS Y AÑADIRLAS A LA ETIQUETA SMALL DEL HTML
const puntosHtml           = document.querySelectorAll('small');
const divCartasJugador     = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

// AHORA CREAMOS UNA FUNCION QUE CREA LA BARAJA Y RECORRERA UN CICLO FOR TODOOS LOS ELEMENTO S DE LA BARAJA

const crearDeck = () =>{
    for ( let i = 2 ; i <= 10; i++ ){
        for ( let tipo of tipos){

            deck.push ( i + tipo);
        }
    }

    for ( let tipo of tipos) {
        for( let especial of especiales) {
            deck.push ( especial + tipo );
        }
    }
    // console.log(deck);
    deck = _.shuffle ( deck);
    console.log( deck );
    return deck;
}

crearDeck();


// ESTA FUNCION ME PERMITE PEDIR UNA CARTA 
const pedirCarta = () => {

    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
        
    }
    
    const carta = deck.pop ();
    
    return carta;
}
// pedirCarta();

// AHORA RECIBIMNOS LA CARTA Y EVALUAMOS EL VALOR  DE LA CARTA

const valorCarta = ( carta ) => {
    const valor = carta.substring( 0, carta.length -1);
    return ( isNaN ( valor) ) ?
    (valor === 'A' ) ? 11 : 10 
    :valor * 1;

    // EL METODO SUBSTRING RECIBE EL VALOR COMO UN ARREGLO , Y USAMOS LA POSICION 0 Y 1 DEL LARGO , LA 2 
    // USAMOS EL METODO OSUBSTRING PARA QUE PUEDA RECONOCER EL 10 EN EL VALOR DE LA CARTA ,
    // SERIA LA LETRA QUE NO QUEREMOS ,POR ESO LENGHT -1
    
}

    // TURNO DE LA COMPUTADORA 

     const turnoComputadora = ( puntosMinimo ) => {

      do {
        const carta = pedirCarta();
        // necesitamos saber  cuantos puntos va acumulando la persona , creamos arriba las variables de puntosJugador y puntosComputadora.
    
        puntosComputadora = puntosComputadora + valorCarta ( carta );
        puntosHtml[1].innerText = puntosComputadora ;
        // console.log(puntosJugador);
    
        const imgCarta = document.createElement ('img');
        imgCarta.src=`assets/cartas/${ carta }.png` 
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if ( puntosMinimo > 21 ) {
            break;
        }
        
    
      }while( ( puntosComputadora < puntosMinimo ) && ( puntosMinimo <= 21 ) );

      setTimeout(() => {
        
      


      if ( puntosJugador === puntosComputadora){
        window.alert('Nadie gana');
      } else if ( puntosJugador> 21 ) {
        window.alert ('Gana computadora');
    } else if ( puntosComputadora > 21 ){
        window.alert('Jugador gana');
    }else{
        window.alert('Computadora gana');
    }

}, 10 ); 
    };
    


     
 
            

// EVENTOS .TENEMOS QUE HACER REFERENCIA AL BOTON Y AL EVENTO ONCLICK
// AHORA LE DECIMO SQUE CAUNDO HAGA CLICK EN EL BOTON PEDIR , SE DISPARE 
// LA FUNCION QUE DEFINIMOS.
btnPedir.addEventListener('click', () => {
    // creamos una funcion llamada carta que va a pedir carta
    const carta = pedirCarta();
    // necesitamos saber  cuantos puntos va acumulando la persona , creamos arriba las variables de puntosJugador y puntosComputadora.

    puntosJugador = puntosJugador + valorCarta ( carta );
    puntosHtml[0].innerText = puntosJugador ;
    // console.log(puntosJugador);

    const imgCarta = document.createElement ('img');
    imgCarta.src=`assets/cartas/${ carta }.png` 
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);



    if( puntosJugador > 21 ) {
        console.warn('Te has pasado bro....');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }else if ( puntosJugador  === 21 ){
        console.warn( ' 21 , muy bien ,ahora mi turno...');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }

});

btnDetener.addEventListener( 'click',( ) =>{
    btnDetener.disabled = true;
    btnPedir.disabled = true;
    
    turnoComputadora ( puntosJugador );
});


btnNuevoJuego.addEventListener ( 'click' , ( ) => {

    console.clear();
    deck = [];

    deck = crearDeck();

    

    puntosJugador     = 0 ;
    puntosComputadora = 0;

    puntosHtml [0].innerText = 0;
    puntosHtml [1].innerText = 0;
    
    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML     = ''; 

    btnPedir.disabled    = false;
    btnDetener.disabled  = false;
    
    
});



