/**
 * 2C = Two of clubs (tréboles)
 * 2D = Diamonds
 * 2H = Hearts
 * 2S = Spades
 */

let deck = []; //para poder manipularlo
let valor;
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];
let puntosJugador = 0,
  puntosComputadora = 0;
//Referencias para trabajar con el DOM
const btnNuevo = document.querySelector("#btnNuevo");
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const smalls = document.querySelectorAll("small");
//mostrar las cartas pedidas
const divCartasJugador = document.querySelector("#jugador");
const divCartasComputadora = document.querySelector("#computadora");
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }
  //console.log(deck);

  //para los tipos especiales
  for (let tipe of tipos) {
    for (let especial of especiales) {
      deck.push(especial + tipe);
    }
  }
  //console.log(deck);
  deck = _.shuffle(deck);
  //console.log(deck);
  return deck;
};

crearDeck();

//me permite pedir una carta

const pedirCarta = () => {
  const carta = deck.pop();
  //console.log(carta);
  return carta;
};
//pedirCarta();

const valorCarta = (carta) => {
  valor = String(carta).substring(0, carta.length - 1);
  //console.log({valor});

  let puntos = 0;
  //is not a number, retorna true si no es un número
  /*if( isNaN (valor)){
        //console.log('no es un nro');
        if(valor == 'J' || valor == 'K' || valor == 'Q'){
            puntos = 10;
        } else {
            puntos =11;
        } o podemos usar el operador ternario, porque ya sabemos que son solo letras
        puntos = (valor === 'A') ? 11 : 10;
    } else{
        //console.log('es un nro');
        //lo multiplicamos por uno para tomar el valor y no el string
        puntos = valor * 1;
    } Lo de arriba ^^^^^^^^^^ lo podemos reducir así
    */
  puntos = isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;

  //console.log(puntos)
  return puntos;
};

valorCarta(pedirCarta());

//turno de la computadora
const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();
    puntosComputadora * 1;
    puntosComputadora += valorCarta(carta);
    //console.log(puntosJugador);
    smalls[1].innerHTML = puntosComputadora;

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.className = "cart";

    divCartasComputadora.append(imgCarta);

    if(puntosMinimos > 21){
        break;
    }
  } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <=21));

  setTimeout(()=>{
    if(puntosComputadora === puntosMinimos){
        alert('nadie ganó, empate');
        btnDetener.disabled = true;
        btnPedir.disabled = true;
    }else if (puntosMinimos > 21){
        alert('Computadora gana!!!');
        btnDetener.disabled = true;
        btnPedir.disabled = true;
    }else if (puntosComputadora > 21){
        alert('Jugador gana');
        btnDetener.disabled = true;
        btnPedir.disabled = true;
    }else{
        alert('computadora gana');
        btnDetener.disabled = true;
        btnPedir.disabled = true;
    }
  }, 10);
};

// Eventos...

btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();
  puntosJugador * 1;
  puntosJugador += valorCarta(carta);
  //console.log(puntosJugador);
  smalls[0].innerHTML = puntosJugador;

  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.className = "cart";

  divCartasJugador.append(imgCarta);

  if (puntosJugador > 21) {
    console.warn("lo siento perdiste");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn("21, genial");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
});

btnDetener.addEventListener('click', ()=>{
    btnDetener.disabled = true;
    btnPedir.disabled = true;
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', ()=>{
  crearDeck();
  puntosJugador, puntosComputadora = 0;
  smalls[0].innerText =0;
  smalls[1].innerText =0;
  btnPedir.disabled = false;
  btnDetener.disabled = false;

  divCartasJugador.innerHTML = '';
  divCartasComputadora.innerHTML = '';
});