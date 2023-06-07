let pessoas = [];
let itens = [];

function adicionaPessoa() {
  const nome = document.getElementById('nome').value.trim();
  if (nome === '') {
    mostrarAviso('avisoPessoa', 'Nome vazio');
  } else {
    const pessoa = {
      nome: nome,
      conta: 0,
    };
    pessoas.push(pessoa);
    listaNomesDiv();
    listaNomesGorjeta();
    mostrarAviso('avisoPessoa', `${pessoa.nome} adicionado com sucesso!`, 'sucesso');
  }
}

function adicionarItem() {
  const item = document.getElementById('item').value.trim();
  const preco = parseFloat(document.getElementById('preco').value);
  if (item === '') {
    mostrarAviso('avisoItem', 'Item vazio');
  } else if (isNaN(preco)) {
    mostrarAviso('avisoItem', 'Consumo sem preço');
  } else {
    const nomes = [];
    const checkboxes = document.querySelectorAll('.nomesItens');
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        nomes.push(checkbox.value);
      }
    });
    if (nomes.length === 0) {
      mostrarAviso('avisoItem', 'Ninguém vai pagar?');
    } else {
      const valorIndividual = preco / nomes.length;
      nomes.forEach(nome => {
        const pessoa = pessoas.find(p => p.nome === nome);
        if (pessoa) {
          pessoa.conta += valorIndividual;
        }
      });
      itens.push({ item: item, valor: preco });
      mostrarAviso('avisoItem', `${item} adicionado com sucesso!`, 'sucesso');
    }
  }
}

function listaNomesDiv() {
  const div = document.querySelector('.nomes');
  div.innerHTML = '';

  pessoas.forEach(pessoa => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'nome';
    checkbox.value = pessoa.nome;
    checkbox.classList.add('nomesItens');

    const label = document.createElement('label');
    label.htmlFor = pessoa.nome;
    label.textContent = pessoa.nome;

    const br = document.createElement('br');

    div.appendChild(checkbox);
    div.appendChild(label);
    div.appendChild(br);
  });
}

function listaNomesGorjeta() {
  const div = document.getElementById('nomesParaGorjeta');
  div.innerHTML = '';

  pessoas.forEach(pessoa => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'nome';
    checkbox.value = pessoa.nome;
    checkbox.classList.add('gorjeta');

    const label = document.createElement('label');
    label.htmlFor = pessoa.nome;
    label.textContent = pessoa.nome;

    const br = document.createElement('br');

    div.appendChild(checkbox);
    div.appendChild(label);
    div.appendChild(br);
  });
}

function limpaCampoNome() {
  document.getElementById('nome').value = '';
}

function limpaCampoItem() {
  document.getElementById('item').value = '';
  document.getElementById('preco').value = '';
  const checkboxes = document.querySelectorAll('.nomesItens');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
}

function mostrarAviso(elementId, message, className = 'aviso') {
  const div = document.getElementById(elementId);
  div.innerHTML = '';
  div.setAttribute('class', className);

  const p = document.createElement('p');
  p.innerHTML = message;

  div.appendChild(p);
}

function adicionaGorjeta() {
  const checkboxes = document.querySelectorAll('.gorjeta');
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      const pessoa = pessoas.find(p => p.nome === checkbox.value);
      if (pessoa) {
        pessoa.conta *= 1.1;
      }
    }
  });
}

function divisorConta() {
  adicionaGorjeta();
  const divResultados = document.getElementById('resultados');
  divResultados.innerHTML = '';

  pessoas.forEach(pessoa => {
    const nomeDiv = document.createElement('div');
    nomeDiv.classList.add('nomeConta');
    nomeDiv.textContent = pessoa.nome;

    const contaDiv = document.createElement('div');
    contaDiv.classList.add('valorConta');
    contaDiv.textContent = `: R$ ${pessoa.conta.toFixed(2)}`;

    const br = document.createElement('br');

    divResultados.appendChild(nomeDiv);
    divResultados.appendChild(contaDiv);
    divResultados.appendChild(br);
  });
}
