const form = document.getElementById('form-atividade');

// Imagens de status
const imgAprovado = '<img src="./imagens/aprovado.png" alt="Emoji celebrando" />';
const imgReprovado = '<img src="./imagens/reprovado.png" alt="Emoji decepcionado" />';

// Arrays globais para armazenar atividades e notas
const atividade = [];
const notas = [];

// Spans para resultado final
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';

// Solicita ao usuário a nota mínima para aprovação
const notaMinima = parseFloat(prompt("Digite a nota mínima para aprovação:"));

// Adiciona o evento de submit ao formulário
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    const linha = adicionaLinha(); // Adiciona a linha da tabela
    if (linha) {
        atualizaTabela(linha); // Atualiza a tabela
        atualizaMediaFinal(); // Atualiza a média final
    }
});

function adicionaLinha() {
    // Captura os campos
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    // Validação básica
    if (!inputNomeAtividade.value || !inputNotaAtividade.value) {
        alert("Por favor, preencha todos os campos.");
        return null;
    }

    if (isNaN(inputNotaAtividade.value) || inputNotaAtividade.value < 0 || inputNotaAtividade.value > 10) {
        alert("Por favor, insira uma nota válida (entre 0 e 10).");
        return null;
    }

    // Validação de duplicidade
    if (atividade.includes(inputNomeAtividade.value)) {
        alert(`A atividade "${inputNomeAtividade.value}" já foi inserida.`);
        return null;
    }

    // Adiciona os valores aos arrays
    atividade.push(inputNomeAtividade.value);
    notas.push(parseFloat(inputNotaAtividade.value));

    // Define o status com base na nota mínima
    const nota = parseFloat(inputNotaAtividade.value);
    const status = nota >= notaMinima ? imgAprovado : imgReprovado;

    // Cria uma linha da tabela
    let linha = '<tr>';
    linha += `<td>${inputNomeAtividade.value}</td>`;
    linha += `<td>${nota}</td>`;
    linha += `<td>${status}</td>`;
    linha += '</tr>';

    // Limpa os campos após a submissão
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';

    return linha; // Retorna a linha criada
}

function atualizaTabela(linha) {
    // Adiciona a linha ao corpo da tabela
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML += linha;
}

function atualizaMediaFinal() {
    // Evita divisão por zero
    if (notas.length === 0) {
        return;
    }

    // Calcula a média final
    const somaNotas = notas.reduce((soma, nota) => soma + nota, 0);
    const mediaFinal = somaNotas / notas.length;

    // Atualiza os elementos na tela
    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2);
    document.getElementById('media-final-resultado').innerHTML =
        mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}
