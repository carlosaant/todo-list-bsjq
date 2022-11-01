'use strict';

let _tarefas = [];
const _tarefa = {
  descricao: '',
  id_categoria: ''
};

document.addEventListener('DOMContentLoaded', function (event) {
  $('#button-add-tarefa').click(() => {
    let texto_tarefa = $('#inp_text_tarefa').val().trim();
    let value_categoria = $('#inp_sel_categoria').val().trim();
    _tarefa.descricao = texto_tarefa;
    _tarefa.id_categoria = value_categoria;
    _tarefas.unshift(_tarefa);

    console.log(_tarefas);
  });
});

function setLocalSt(arrTarefas) {
  localStorage.setItem('tarefas-todo', JSON.stringify(arrTarefas));
}
