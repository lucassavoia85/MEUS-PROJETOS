document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastro-form');
    const nameInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const clientList = document.getElementById('client-list');
    const submitButton = document.getElementById('submit-button');
    
    const apiUrl = 'https://crudcrud.com/api/44fe6b1c62fa4de6ad1dafa17fc2e63f';

   
    async function fetchAndDisplayClients() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
            const clients = await response.json();
            displayClients(clients);
        } catch (error) {
            console.error('Falha ao buscar clientes:', error);
            clientList.innerHTML = '<p>Não foi possível carregar a lista de clientes. Verifique a URL da API.</p>';
        }
    }
    function displayClients(clients) {
        clientList.innerHTML = '<h2>Clientes Cadastrados</h2>';
        if (clients.length === 0) {
            clientList.innerHTML += '<p>Nenhum cliente cadastrado.</p>';
            return;
        }

        clients.forEach(client => {
            const clientDiv = document.createElement('div');
            clientDiv.className = 'client-item';
            clientDiv.setAttribute('data-id', client._id);
            clientDiv.innerHTML = `
                <div class="client-info">
                    <strong>${client.name}</strong>
                    <span>${client.email}</span>
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

        const newClient = {
            name: nameInput.value,
            email: emailInput.value,
        };

        submitButton.disabled = true;
        submitButton.textContent = 'Salvando...';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newClient),
            });

            if (!response.ok) {
                throw new Error('Falha ao cadastrar cliente.');
            }
            
            form.reset();
            await fetchAndDisplayClients();

        } catch (error) {
            console.error(error.message);
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
            const response = await fetch(`${apiUrl}/${clientId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Falha ao excluir cliente.');
            }
            
            clientItem.remove();

        } catch (error) {
            console.error(error.message);
        }
    }

    form.addEventListener('submit', handleRegisterClient);
    clientList.addEventListener('click', handleDeleteClient);
    fetchAndDisplayClients();
});