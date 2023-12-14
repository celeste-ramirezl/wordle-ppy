//Determinamos la cantidad de intentos//
let intentos = 6;
//Definimos la API//
const API = "https://random-word-api.herokuapp.com/word?lang=es&length=5";
fetch(API)
  .then((response) => response.json())
  //Se asigna la parabra y se convierte en MAYUSCULA
  .then((response) => {
    palabra = response[0].toUpperCase();
  })
  //En caso de error de API, usamos el diccionario con palabras que predeterminamos :)//
  .catch((err) => {
    console.log("La API no responde, se usa lista local");
    let diccionario = ["APPLE", "CLOUD", "ANGEL", "FIELD"];
    let palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
  });
//Agregamos el botón de intento///
const button = document.getElementById("guess-button");
button.addEventListener("click", intentar);

const input = document.getElementById("guess-input");
const valor = input.value;
//Añadimos la función intentar//
function intentar() {
  const GRID = document.getElementById("grid");
  const ROW = document.createElement("div");
  ROW.className = "row";
  //mostrar al usuario la palabra GANASTE en caso de ganar//

  const INTENTO = leerIntento();
  if (INTENTO === palabra) {
    terminar("<h1>GANASTE!😀</h1>");
    return;
  }
//
  for (let i in palabra) {
    const SPAN = document.createElement("span");
    SPAN.className = "letter";
    if (INTENTO[i] === palabra[i]) {
      //Letra en color verde para indicar que el intento es igual que la letra de la palabra y en el orden correcto//
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = "green";
    } else if (palabra.includes(INTENTO[i])) {
      //Letra en color amarillo para indicar que la letra si existe en la palabra pero esta mal posicionada//
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = "yellow";
    } else {
      //Letra en color gris para indicar que la letra no existe en la palabra//
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = "grey";
    }
    ROW.appendChild(SPAN);
  }
  GRID.appendChild(ROW);
  intentos--;
  if (intentos == 0) {
    terminar(`<h1>PERDISTE!😖</h1>
              <h4>¡sigue intentando!</h4>
              <p>La palabra era ${palabra}</p>`);
  }
}
function terminar(mensaje) {
  const INPUT = document.getElementById("guess-input");
  const BOTON = document.getElementById("guess-button");
  INPUT.disabled = true;
  BOTON.disabled = true;
  let contenedor = document.getElementById("guesses");
  contenedor.innerHTML = mensaje;
}
function leerIntento() {
  let intento = document.getElementById("guess-input");
  intento = intento.value;
  intento = intento.toUpperCase();
  return intento;
}

