// Classe Parquimetro
class Parquimetro {
    constructor(valor) {
        this.valor = parseFloat(valor);
        this.tabela = [
            { valor: 1.00, tempo: 30 },
            { valor: 1.75, tempo: 60 },
            { valor: 3.00, tempo: 120 }
        ];
    }

    calcularTempoETroco() {
        if (this.valor < 1.00) {
            return { mensagem: "Valor insuficiente. O mínimo é R$1,00.", tempo: 0, troco: 0 };
        }

        // Ordena a tabela do maior para o menor valor
        let tempo = 0;
        let valorCobrado = 0;

        for (let i = this.tabela.length - 1; i >= 0; i--) {
            if (this.valor >= this.tabela[i].valor) {
                tempo = this.tabela[i].tempo;
                valorCobrado = this.tabela[i].valor;
                break;
            }
        }

        let troco = (this.valor - valorCobrado).toFixed(2);

        return {
            mensagem: `Tempo de permanência: ${tempo} minutos.<br>Troco: R$${troco}`,
            tempo,
            troco
        };
    }
}

// Manipulação do DOM
document.getElementById('parquimetro-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const valor = document.getElementById('valor').value;
    const parquimetro = new Parquimetro(valor);
    const resultado = parquimetro.calcularTempoETroco();

    document.getElementById('resultado').innerHTML = resultado.mensagem;
});