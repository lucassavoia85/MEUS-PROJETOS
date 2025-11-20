const form = document.getElementById('userRegistrationForm');
const cepInput = document.getElementById('cep');
const ruaInput = document.getElementById('rua');
const bairroInput = document.getElementById('bairro');
const cidadeInput = document.getElementById('cidade');
const estadoInput = document.getElementById('estado');
const loadingCepDiv = document.getElementById('loading-cep');

cepInput.addEventListener('blur', function(e) {
    const cep = this.value.replace(/\D/g, '');

    if (cep != "") {
        const validacep = /^[0-9]{8}$/;

        if(validacep.test(cep)) {
            loadingCepDiv.textContent = "Buscando endereço...";

            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        ruaInput.value = data.logradouro;
                        bairroInput.value = data.bairro;
                        cidadeInput.value = data.localidade;
                        estadoInput.value = data.uf;
                        loadingCepDiv.textContent = "";
                    } else {
                        limpa_formulário_cep();
                        loadingCepDiv.textContent = "CEP não encontrado.";
                    }
                })
                .catch(() => {
                    limpa_formulário_cep();
                    loadingCepDiv.textContent = "Erro ao buscar CEP.";
                });
        } else {
            limpa_formulário_cep();
            loadingCepDiv.textContent = "Formato de CEP inválido.";
        }
    } else {
        limpa_formulário_cep();
    }
});

function limpa_formulário_cep() {
    ruaInput.value = "";
    bairroInput.value = "";
    cidadeInput.value = "";
    estadoInput.value = "";
}