let tarefas = [];
let proximoId = 1;

const form = document.querySelector("#form");
const tarefa = document.querySelector("#tarefa");
const mensagem = document.querySelector("#mensagem");
const lista = document.querySelector("#lista");
const vazia = document.querySelector("#vazia");

const criarTarefa = (tarefa, posicao) => {
  const item = document.createElement("li");
  item.classList.add("tarefa");

  const numero = document.createElement("span");
  numero.classList.add("numero");
  numero.textContent = posicao;

  const texto = document.createElement("span");
  texto.classList.add("texto");
  texto.textContent = tarefa.descricao;

  const excluir = document.createElement("button");
  excluir.classList.add("excluir");
  excluir.textContent = "Excluir";

  excluir.addEventListener("click", () => {
    if (confirm("Excluir " + tarefa.descricao + " ?")) {
      tarefas = tarefas.filter((t) => t.id !== tarefa.id);
      atualizar();
    }
  });

  item.append(numero, texto, excluir);
  return item;
};

const atualizar = () => {
  lista.textContent = "";

  tarefas.forEach((tarefa, indice) => {
    lista.append(criarTarefa(tarefa, indice + 1));
  });

  vazia.hidden = tarefas.length > 0;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const descricao = tarefa.value.trim();

  if (descricao === "") {
    mensagem.textContent = "Digite uma tarefa antes de adicionar";
    mensagem.hidden = false;
    tarefa.focus();
    return;
  }

  tarefas.push({
    id: proximoId,
    descricao: descricao,
  });
  proximoId++;

  mensagem.hidden = true;
  form.reset();
  tarefa.focus();
  atualizar();
});

atualizar();