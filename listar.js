// URL para o endpoint do servidor (ou GitHub Pages) onde os dados estão hospedados
const serverURL = 'https://seunome.github.io'; // Substitua com o URL do seu GitHub Pages ou URL do servidor

// Função para carregar e exibir dados na tabela
function carregarDados() {
    // Use AJAX para buscar dados do servidor (ou GitHub Pages)
    fetch(`${serverURL}/api/obterDados`)
        .then(response => response.json())
        .then(data => {
            // Preencha a tabela com os dados recebidos
            const tabela = document.querySelector('table tbody');
            tabela.innerHTML = ''; // Limpe o corpo da tabela
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.id}</td>
                    <td>${row.nome}</td>
                    <td>${row.data_inicio}</td>
                    <td>${row.data_termino}</td>
                `;
                tabela.appendChild(tr);
            });
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
}

// Carregue dados quando a página for carregada
document.addEventListener("DOMContentLoaded", carregarDados);
