const RESOURCE = "clientes"; // Nome do recurso para a API
const Resource_API = "https://crudcrud.com/api/44fe6b1c62fa4de6ad1dafa17fc2e63f";

async function fetchAPI(endpoint = '', options = {}) {
    try {
        const url = `${Resource_API}/${RESOURCE}${endpoint}`;
        const response = await fetch(url, options);
        if (!response.ok) {
            if(options.method === 'DELETE' && response.status === 404) { return null; }
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }
        return null;
    }

    catch (error) { 
        console.error('Falha na requisição:', error);
        throw error; 
    }
}
export const ListarClientes = async () => {
    return await fetchAPI('');
};

export const CadastrarCliente = async (cliente) => {
    return await fetchAPI('', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente),
    });
}
export const DeletarCliente = async (id) => {
    return await fetchAPI(`/${id}`, {
        method: 'DELETE',
    });
}