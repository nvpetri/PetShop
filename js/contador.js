function aumentarContador() {
    var contadorElemento = document.getElementById("contador");
    var contadorAtual = parseInt(contadorElemento.innerText);
    contadorElemento.innerText = contadorAtual + 1;
  }
  
  function diminuirContador() {
    var contadorElemento = document.getElementById("contador");
    var contadorAtual = parseInt(contadorElemento.innerText);
    contadorElemento.innerText = contadorAtual - 1;
  }