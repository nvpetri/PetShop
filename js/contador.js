function aumentarContador() {
    var contadorElemento = document.getElementById("contador");
    var contadorAtual = parseInt(contadorElemento.innerText);
    contadorElemento.innerText = contadorAtual + 1;

    // if(contadorAtual == estoque){
    //     contadorElemento.innerText = contadorAtual + 0;
    // } else {
    //     contadorElemento.innerText = contadorAtual + 1;
    // }
  }
  
  function diminuirContador() {
    var contadorElemento = document.getElementById("contador");
    var contadorAtual = parseInt(contadorElemento.innerText);
    
    if(contadorAtual == 0){
        contadorElemento.innerText = contadorAtual - 0;
    } else {
        contadorElemento.innerText = contadorAtual - 1;
    }

  }