import { Cliente } from './classes.js';
import { ListarClientes, CadastrarCliente, DeletarCliente } from './ultils.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastro-form');
    const nameInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const clientList = document.getElementById('client-list');
    const submitButton = document.getElementById('submit-button');

    async function fetchAndDisplayClients() {
        try {
            const clients = await ListarClientes();
            displayClients(clients);
        } catch (error) {
            console.error('Falha ao buscar clientes:', error);
            clientList.innerHTML = '<p>Não foi possível carregar a lista de clientes.</p>';
        }
    }

    function displayClients(clients) {
        clientList.innerHTML = '<h2>Clientes Cadastrados</h2>';
        if (clients.length === 0) {
            clientList.innerHTML += '<p>Nenhum cliente cadastrado.</p>';
            return;
        }

        clients.forEach(client => {
            const clientInstance = new Cliente(client.nome, client.email, client._id);
            const clientDiv = document.createElement('div');
            clientDiv.className = 'client-item';
            clientDiv.setAttribute('data-id', clientInstance._id);
            clientDiv.innerHTML = `
                <div class="client-info">
                    <strong>${clientInstance.nome}</strong>
                    <span>${clientInstance.email}</span>
                </div>
                <button class="delete-btn">Excluir</button>
            `;
            clientList.appendChild(clientDiv);
        });
    }

    /**
     * @param {Event} event
     */
    async function handleRegisterClient(event) {
        event.preventDefault();

        const newClient = new Cliente(nameInput.value, emailInput.value);

        submitButton.disabled = true;
        submitButton.textContent = 'Salvando...';

        try {
            await CadastrarCliente(newClient);
            form.reset();
            await fetchAndDisplayClients();
        } catch (error) {
            console.error('Falha ao cadastrar cliente.', error);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Cadastrar';
        }
    }

    /**
     * @param {Event} event - O evento de clique.
     */
    async function handleDeleteClient(event) {
        if (!event.target.classList.contains('delete-btn')) {
            return;
        }

        const clientItem = event.target.closest('.client-item');
        const clientId = clientItem.getAttribute('data-id');

        try {
            await DeletarCliente(clientId);
            clientItem.remove();

        } catch (error) {
            console.error('Falha ao excluir cliente.', error);
        }
    }

    form.addEventListener('submit', handleRegisterClient);
    clientList.addEventListener('click', handleDeleteClient);
    fetchAndDisplayClients();
});