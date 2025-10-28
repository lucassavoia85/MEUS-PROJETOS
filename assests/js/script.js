
function calcularIMC() {
    
    // ENTRADA & CONVERSÃO
    
    const valorpeso = parseFloat(document.getElementById("peso").value);
    const valoraltura = parseFloat(document.getElementById("altura").value);


    // VALIDAÇÃO
    if (isNaN(valorpeso) || isNaN(valoraltura) || valorpeso <= 0 || valoraltura <= 0) {
        document.getElementById("valor-imc").innerHTML = "0.00";
        document.getElementById("classificacao-imc").innerHTML = "Erro: Dados inválidos.";
        return; 
    }

    // PROCESSAMENTO (Cálculo)

    const imc = valorpeso / (valoraltura * valoraltura);

    // SAÍDA (Exibir o valor numérico)
    document.getElementById("valor-imc").innerHTML = imc.toFixed(2);


    // PROCESSAMENTO
    let classificacao = "";

    if (imc < 18.5) {
        classificacao = "Abaixo do Peso";
    }
    else if (imc < 25) {
        classificacao = "Peso normal";
    }
    else if (imc < 30) {
        classificacao = "Sobrepeso";
    }
    else if (imc < 35) {
        classificacao = "Obesidade Grau I";
    }
    else if (imc < 40) {
        classificacao = "Obesidade Grau II (Severa)"; 
    }
    else {
        classificacao = "Obesidade Grau III (Mórbida)";
    }

    // SAÍDA
    document.getElementById("classificacao-imc").innerHTML = classificacao;
}

document.getElementById("btn-calcular").addEventListener("click", calcularIMC);