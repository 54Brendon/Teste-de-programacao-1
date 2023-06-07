let pessoas = []; // Array para armazenar as informações das pessoas
let itens = []; // Array para armazenar as informações dos itens

function adicionaPessoa() {
  const nome = document.getElementById('nome').value.trim(); // Obtém o nome da pessoa do campo de entrada
  if (nome === '') {
    mostrarAviso('avisoPessoa', 'Nome vazio'); // Mostra um aviso se o nome estiver vazio
  } else {
    const pessoa = {
      nome: nome,
      conta: 0,
    }; // Cria um objeto para representar a pessoa com o nome e a conta zerada
    pessoas.push(pessoa); // Adiciona a pessoa ao array de pessoas
    listaNomesDiv(); // Atualiza a lista de nomes na interface
    listaNomesGorjeta(); // Atualiza a lista de nomes para gorjeta na interface
    mostrarAviso('avisoPessoa', `${pessoa.nome} adicionado com sucesso!`, 'sucesso'); // Mostra um aviso de sucesso
  }
}

function adicionarItem() {
  const item = document.getElementById('item').value.trim(); // Obtém o nome do item do campo de entrada
  const preco = parseFloat(document.getElementById('preco').value); // Obtém o preço do item convertendo para um número float
  if (item === '') {
    mostrarAviso('avisoItem', 'Item vazio'); // Mostra um aviso se o item estiver vazio
  } else if (isNaN(preco)) {
    mostrarAviso('avisoItem', 'Consumo sem preço'); // Mostra um aviso se o preço do item não for um número válido
  } else {
    const nomes = [];
    const checkboxes = document.querySelectorAll('.nomesItens');
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        nomes.push(checkbox.value); // Adiciona os nomes das pessoas que irão pagar pelo item
      }
    });
    if (nomes.length === 0) {
      mostrarAviso('avisoItem', 'Ninguém vai pagar?'); // Mostra um aviso se ninguém for selecionado para pagar pelo item
    } else {
      const valorIndividual = preco / nomes.length; // Calcula o valor individual a ser pago por cada pessoa
      nomes.forEach(nome => {
        const pessoa = pessoas.find(p => p.nome === nome);
        if (pessoa) {
          pessoa.conta += valorIndividual; // Adiciona o valor individual à conta de cada pessoa selecionada
        }
      });
      itens.push({ item: item, valor: preco }); // Adiciona o item ao array de itens
      mostrarAviso('avisoItem', `${item} adicionado com sucesso!`, 'sucesso'); // Mostra um aviso de sucesso
    }
  }
}

function listaNomesDiv() {
  const div = document.querySelector('.nomes'); // Obtém a div onde a lista de nomes será exibida
  div.innerHTML = ''; // Limpa o conteúdo da div

  pessoas.forEach(pessoa => {
    const checkbox = document.createElement('input'); // Cria um elemento input para o checkbox
    checkbox.type = 'checkbox';
    checkbox.name = 'nome';
    checkbox.value = pessoa.nome;
    checkbox.classList.add('nomesItens');

    const label = document.createElement('label'); // Cria um elemento label para o nome da pessoa
    label.htmlFor = pessoa.nome;
    label.textContent = pessoa.nome;

    const br = document.createElement('br'); // Cria uma quebra de linha

    div.appendChild(checkbox); // Adiciona o checkbox à div
    div.appendChild(label); // Adiciona o label à div
    div.appendChild(br); // Adiciona a quebra de linha à div
  });
}

function listaNomesGorjeta() {
  const div = document.getElementById('nomesParaGorjeta'); // Obtém a div onde a lista de nomes para gorjeta será exibida
  div.innerHTML = ''; // Limpa o conteúdo da div

  pessoas.forEach(pessoa => {
    const checkbox = document.createElement('input'); // Cria um elemento input para o checkbox
    checkbox.type = 'checkbox';
    checkbox.name = 'nome';
    checkbox.value = pessoa.nome;
    checkbox.classList.add('gorjeta');

    const label = document.createElement('label'); // Cria um elemento label para o nome da pessoa
    label.htmlFor = pessoa.nome;
    label.textContent = pessoa.nome;

    const br = document.createElement('br'); // Cria uma quebra de linha

    div.appendChild(checkbox); // Adiciona o checkbox à div
    div.appendChild(label); // Adiciona o label à div
    div.appendChild(br); // Adiciona a quebra de linha à div
  });
}

function limpaCampoNome() {
  document.getElementById('nome').value = ''; // Limpa o campo de entrada de nome
}

function limpaCampoItem() {
  document.getElementById('item').value = ''; // Limpa o campo de entrada de item
  document.getElementById('preco').value = ''; // Limpa o campo de entrada de preço
  const checkboxes = document.querySelectorAll('.nomesItens');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false; // Desmarca todos os checkboxes
  });
}

function mostrarAviso(elementId, message, className = 'aviso') {
  const div = document.getElementById(elementId); // Obtém a div onde o aviso será exibido
  div.innerHTML = ''; // Limpa o conteúdo da div
  div.setAttribute('class', className); // Define a classe da div para o estilo do aviso

  const p = document.createElement('p'); // Cria um elemento p para exibir a mensagem do aviso
  p.innerHTML = message;

  div.appendChild(p); // Adiciona o elemento p à div
}

function adicionaGorjeta() {
  const checkboxes = document.querySelectorAll('.gorjeta');
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      const pessoa = pessoas.find(p => p.nome === checkbox.value);
      if (pessoa) {
        pessoa.conta *= 1.1; // Adiciona uma gorjeta de 10% à conta das pessoas selecionadas
      }
    }
  });
}

function divisorConta() {
  adicionaGorjeta(); // Adiciona gorjeta às contas
  const divResultados = document.getElementById('resultados'); // Obtém a div onde os resultados serão exibidos
  divResultados.innerHTML = ''; // Limpa o conteúdo da div

  pessoas.forEach(pessoa => {
    const nomeDiv = document.createElement('div'); // Cria um elemento div para exibir o nome da pessoa
    nomeDiv.classList.add('nomeConta');
    nomeDiv.textContent = pessoa.nome;

    const contaDiv = document.createElement('div'); // Cria um elemento div para exibir o valor da conta da pessoa
    contaDiv.classList.add('valorConta');
    contaDiv.textContent = `: R$ ${pessoa.conta.toFixed(2)}`;

    const br = document.createElement('br'); // Cria uma quebra de linha

    divResultados.appendChild(nomeDiv); // Adiciona o elemento div do nome à div de resultados
    divResultados.appendChild(contaDiv); // Adiciona o elemento div do valor da conta à div de resultados
    divResultados.appendChild(br); // Adiciona a quebra de linha à div de resultados
  });
}
