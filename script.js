function conversoromanos (){
    var numero = document.getElementById("numero").value;
    let arabico = [1,4,5,9,10,40,50,90,100,400,500,900,1000];
    let romano  = ["I","IV","V","IX","X","XL","L","XC","C","CD","D","CM","M"]

    let resultado = "";
    let i;
    for (i = 12; i>= 0; i--){
      while (numero >= arabico[i]) {
            resultado += romano[i];
            numero -= arabico[i];
        }
    }

   document.getElementById("resultado").textContent = "Número Romano: " + resultado;

}

function conversorarabico() {
  var numero = document.getElementById("numberRoma").value;
  let arabico = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
  let romano = ["I", "IV", "V", "IX", "X", "XL", "L", "XC", "C", "CD", "D", "CM", "M"];
  let resultadoarabico = 0;

  for (let i = romano.length - 1; i >= 0; i--) {
    while (numero.startsWith(romano[i])) {
      resultadoarabico += arabico[i];
      numero = numero.substring(romano[i].length);
    }
  }

  document.getElementById("resultadoarabico").textContent = "Número arábico: " + resultadoarabico;
}