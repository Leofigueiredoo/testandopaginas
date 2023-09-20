// URL para o endpoint do servidor (ou GitHub Pages) onde você lida com as solicitações AJAX
const serverURL = 'https://seunome.github.io'; // Substitua com o URL do seu GitHub Pages ou URL do servidor

// Função para carregar e exibir dados da tabela
function carregarDados() {
    // Use AJAX para buscar dados do servidor (ou GitHub Pages)
    fetch(`${serverURL}/api/obterDados`)
        .then(response => response.json())
        .then(data => {
            // Preencha a tabela com os dados recebidos
            const tabela = document.getElementById('tabelaDados');
            const tbody = tabela.querySelector('tbody');
            tbody.innerHTML = ''; // Limpe o corpo da tabela
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.id}</td>
                    <td>${row.nome}</td>
                    <td>${row.data_inicio}</td>
                    <td>${row.data_termino}</td>
                    <td>
                        <button class="editar" data-id="${row.id}">Editar</button>
                        <button class="excluir" data-id="${row.id}">Excluir</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
}

// Carregue dados quando a página for carregada
document.addEventListener("DOMContentLoaded", carregarDados);

// Lidar com envio de formulário para adicionar registros
const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const data_inicio = document.getElementById('data_inicio').value;
    const data_termino = document.getElementById('data_termino').value;

    // Use AJAX para inserir dados no servidor (ou GitHub Pages)
    fetch(`${serverURL}/api/inserirDados`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, data_inicio, data_termino })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Registro inserido com sucesso:', data);
            // Recarregue a tabela para mostrar o novo registro
            carregarDados();
            // Limpe o formulário após a inserção
            formulario.reset();
        })
        .catch(error => console.error('Erro ao inserir registro:', error));
});

// Lidar com eventos de edição e exclusão
const tabela = document.getElementById('tabelaDados');
tabela.addEventListener('click', function (e) {
    if (e.target.classList.contains('editar')) {
        const id = e.target.getAttribute('data-id');
        // Implemente a lógica de edição aqui (enviar uma solicitação AJAX para edição)
        console.log('Editar registro com ID', id);
    } else if (e.target.classList.contains('excluir')) {
        const id = e.target.getAttribute('data-id');
        // Implemente a lógica de exclusão aqui (enviar uma solicitação AJAX para exclusão)
        console.log('Excluir registro com ID', id);
    }
});
