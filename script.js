// Declaração das variáveis
let agenda = [];
const form = document.querySelector('form');
const listaCompromissos = document.getElementById('lista-compromissos');

// Função para adicionar compromisso na agenda
const adicionarCompromisso = (event) => {
  event.preventDefault();
  const compromisso = document.getElementById('compromisso').value;
  const data = document.getElementById('data').value;
  const hora = document.getElementById('hora').value;
  agenda.push({ compromisso, data, hora });
  atualizarListaCompromissos();
  salvarAgendaNoLocalStorage();
  form.reset();
};

// Função para atualizar a lista de compromissos no HTML
const atualizarListaCompromissos = () => {
    listaCompromissos.innerHTML = '';
    agenda.forEach(({ compromisso, data, hora }, index) => {
      const li = document.createElement('li');
      li.textContent = `${compromisso} - ${data} - ${hora}`;
  
      const botaoExcluir = document.createElement('button');
      botaoExcluir.innerHTML = '<i class="fas fa-trash-alt"></i>';
      botaoExcluir.addEventListener('click', () => {
        excluirCompromisso(index);
      });
      li.appendChild(botaoExcluir);
  
      listaCompromissos.appendChild(li);
    });
  };
// Função para salvar a agenda no armazenamento local
const salvarAgendaNoLocalStorage = () => {
  localStorage.setItem('agenda', JSON.stringify(agenda));
};

// Função para carregar a agenda do armazenamento local
const carregarAgendaDoLocalStorage = () => {
  const agendaSalva = localStorage.getItem('agenda');
  if (agendaSalva) {
    agenda = JSON.parse(agendaSalva);
    atualizarListaCompromissos();
  }
};

// Função para excluir um compromisso da agenda
const excluirCompromisso = (index) => {
    agenda.splice(index, 1);
    atualizarListaCompromissos();
    salvarAgendaNoLocalStorage();
  };
  
// Adiciona o evento de submit ao formulário para chamar a função adicionarCompromisso
form.addEventListener('submit', adicionarCompromisso);

// Carrega a agenda do armazenamento local ao carregar a página
carregarAgendaDoLocalStorage();
