const cep = document.querySelector('#cep');
const address = document.querySelector('#address');
const neighborhood = document.querySelector('#neighborhood');
const city = document.querySelector('#city');
const message = document.querySelector('#message');

cep.addEventListener('focusout', async () => {
    try {
        // Validar o CEP: deve ter exatamente 8 dígitos
        const onlyNumbers = /^[0-9]{8}$/;
        if (!onlyNumbers.test(cep.value)) {
            throw { cep_error: 'CEP inválido. Deve conter exatamente 8 dígitos.' };
        }

        // Fazer a requisição para a API com o CEP informado
        const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);
        
        if (!response.ok) {
            throw new Error('Não foi possível buscar o CEP.');
        }

        const responseCep = await response.json();
        
        if (responseCep.erro) {
            throw { cep_error: 'CEP não encontrado.' };
        }

        // Atualizar os campos com os dados retornados
        address.value = responseCep.logradouro;
        neighborhood.value = responseCep.bairro;
        city.value = responseCep.localidade;

    } catch (error) {
        if (error?.cep_error) {
            message.textContent = error.cep_error;
            setTimeout(() => {
                message.textContent = '';
            }, 5000);
        } else {
            console.error('Erro desconhecido:', error);
        }
    }
});
