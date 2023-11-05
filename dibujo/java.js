// Interfaz para la estrategia de dibujo
class EstrategiaDibujo {
	dibujar(color, xInicial, yInicial, xFinal, yFinal, lienzo) {}
  }
  
  // Implementación concreta de la estrategia de dibujo
  class DibujoLinea extends EstrategiaDibujo {
	dibujar(color, xInicial, yInicial, xFinal, yFinal, lienzo) {
	  lienzo.beginPath();
	  lienzo.strokeStyle = color;
	  lienzo.lineWidth = 2;
	  lienzo.moveTo(xInicial, yInicial);
	  lienzo.lineTo(xFinal, yFinal);
	  lienzo.stroke();
	  lienzo.closePath();
	}
  }
  
  // Contexto que utiliza la estrategia de dibujo
  class Dibujador {
	constructor() {
	  this.estrategia = new DibujoLinea(); // Estrategia por defecto
	}
  
	cambiarEstrategia(estrategia) {
	  this.estrategia = estrategia;
	}
  
	dibujar(color, xInicial, yInicial, xFinal, yFinal, lienzo) {
	  this.estrategia.dibujar(color, xInicial, yInicial, xFinal, yFinal, lienzo);
	}
  }
  
  // Crea una instancia del dibujador
  const dibujador = new Dibujador();
  
  // Asocia el dibujador al contexto del canvas
  const cuadrito = document.getElementById("area_dibujo");
  const papel = cuadrito.getContext("2d");
  
  var x = 250;
  var y = 250;
  var trazo = false;
  var color_trazado = "black";
  
  document.addEventListener("keydown", dibujarTeclado);
  document.addEventListener("mousedown", dibujarMause);
  document.addEventListener("mousemove", dibujarMause2);
  document.addEventListener("mouseup", dibujarMause3);
  
  var botonRojo = document.getElementById("botonColorRojo");
  var botonBlanco = document.getElementById("botonColorBlanco");
  var botonNegro = document.getElementById("botonColorNegro");
  
  botonRojo.addEventListener("click", seleccionarRojo);
  botonBlanco.addEventListener("click", seleccionarBlanco);
  botonNegro.addEventListener("click", seleccionarNegro);
  
  function dibujarTeclado(evento) {
	console.log(evento);
	var colorcito = color_trazado;
	var movimiento = 10;
  
	if (evento.keyCode == teclas.ARRIBA) {
	  dibujador.dibujar(colorcito, x, y, x, y - movimiento, papel);
	  y = y - movimiento;
	}
	if (evento.keyCode == teclas.ABAJO) {
	  dibujador.dibujar(colorcito, x, y, x, y + movimiento, papel);
	  y = y + movimiento;
	}
	if (evento.keyCode == teclas.DERECHA) {
	  dibujador.dibujar(colorcito, x, y, x + movimiento, y, papel);
	  x = x + movimiento;
	}
	if (evento.keyCode == teclas.IZQUIERDA) {
	  dibujador.dibujar(colorcito, x, y, x - movimiento, y, papel);
	  x = x - movimiento;
	}
  }
  
  function dibujarMause(evento) {
	trazo = true;
	x = evento.layerX;
	y = evento.layerY;
  }
  
  function dibujarMause2(evento) {
	console.log(evento);
	if (trazo == true) {
	  dibujador.dibujar(color_trazado, x, y - 20, evento.layerX, evento.layerY - 20, papel);
	  x = evento.layerX;
	  y = evento.layerY;
	}
  }
  
  function dibujarMause3(evento) {
	trazo = false;
  }
  
  function seleccionarRojo() {
	color_trazado = "red";
  }
  
  function seleccionarBlanco() {
	color_trazado = "white";
  }
  
  function seleccionarNegro() {
	color_trazado = "black";
  }
  
  var teclas = {
	ARRIBA: 38,
	ABAJO: 40,
	DERECHA: 39,
	IZQUIERDA: 37,
  };
  