(() => {
  'use strict'
  /**
   * 2C = Two of clubs (tréboles)
   * 2D = Diamonds
   * 2H = Hearts
   * 2S = Spades
   */

  let deck = [];
  const tipos = ["C", "D", "H", "S"],
        especiales = ["A", "J", "Q", "K"];
  let puntosJugadores = [];
  //Referencias para trabajar con el DOM
  const btnNuevo = document.querySelector("#btnNuevo"),
        btnPedir = document.querySelector("#btnPedir"),
        btnDetener = document.querySelector("#btnDetener");
  const divCartasJugadores = document.querySelectorAll('.divCartas'),
        smalls = document.querySelectorAll("small");
  
  const crearDeck = () => {

    deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(i + tipo);
      }
    }
    //para los tipos especiales
    for (let tipe of tipos) {
      for (let especial of especiales) {
        deck.push(especial + tipe);
      }
    }
    return _.shuffle(deck);
  };

  const inicializarJuego = (numJugadores = 2)=>{
   deck = crearDeck();
   puntosJugadores = [];
   for( let i=0; i<numJugadores; i++){
    puntosJugadores.push(0);
   }
   console.log({puntosJugadores})

   smalls.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );

        btnPedir.disabled   = false;
        btnDetener.disabled = false;
  }


  const pedirCarta = () => {
    if(deck.length === 0){
      throw 'no hay cartas en el deck';
    }
    return deck.pop();
    
  };

  const valorCarta = (carta) => {
    const valor = String(carta).substring(0, carta.length - 1);
    return (isNaN(valor)) ? 
    (valor === "A" ) ? 11 : 10
    : valor * 1;
  };

  //valorCarta(pedirCarta());

  const acumularPuntos = (carta, turno)=>{
    puntosJugadores[turno] += valorCarta(carta);
      smalls[turno].innerHTML = puntosJugadores[turno];
    return puntosJugadores[turno];
  }

  const crearCarta = (carta, turno)=>{
    carta = pedirCarta();
    acumularPuntos(carta, 0)
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.className = "cart";

    divCartasJugadores[turno].append(imgCarta);
  }
  const determinarGanador= ()=>{
    const [puntosMinimos, puntosComputadora] =puntosJugadores;
    
    setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
        alert('nadie ganó, empate');
        btnDetener.disabled = true;
        btnPedir.disabled = true;
      } else if (puntosMinimos > 21) {
        alert('Computadora gana!!!');
        btnDetener.disabled = true;
        btnPedir.disabled = true;
      } else if (puntosComputadora > 21) {
        alert('Jugador gana');
        btnDetener.disabled = true;
        btnPedir.disabled = true;
      } else {
        alert('computadora gana');
        btnDetener.disabled = true;
        btnPedir.disabled = true;
      }
    }, 10);
  }


  //turno de la computadora
  const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0;
    do {
      carta = pedirCarta();
      puntosComputadora =acumularPuntos(carta, puntosJugadores.length -1)
      crearCarta(carta, puntosJugadores.length -1 );
    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
    determinarGanador();

  };

  // Eventos...

  btnPedir.addEventListener("click", () => {
   const carta = pedirCarta();
   const puntosJugador = acumularPuntos(carta, 0);
   crearCarta(carta, 0);

    if (puntosJugador > 21) {
      console.warn("lo siento perdiste");
      btnPedir.disabled = true;
      btnDetener.disabled = true;

      turnoComputadora(puntosJugadores);
    } else if (puntosJugador === 21) {
      console.warn("21, genial");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }
  });

  btnDetener.addEventListener('click', () => {
    btnDetener.disabled = true;
    btnPedir.disabled = true;
    turnoComputadora(puntosJugadores[0]);
  });

  btnNuevo.addEventListener('click', () => {
    console.clear();
    inicializarJuego();
  });

})();


/**
 * () =>{
 * Arrow function}
 * 
 * (()=>{
 * Arrow function autoinvocada})()
 */