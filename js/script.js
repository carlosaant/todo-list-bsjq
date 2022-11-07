'use strict';

let _tarefas = [];
const categorias = ['Trabalho', 'Lazer', 'Educação'];

document.addEventListener('DOMContentLoaded', function (event) {
  $('#button-add-tarefa').click(() => {
    if ($('#inp_text_tarefa').val().trim() === '') {
      console.log('Necessario informar uma descriçao');
    } else if ($('#inp_sel_categoria').val() == null) {
      console.log('Necessario informar uma categoria');
    } else {
      const texto_tarefa = $('#inp_text_tarefa').val().trim();
      const value_categoria = $('#inp_sel_categoria').val();
      adicionarNovaTarefa(texto_tarefa, value_categoria);
    }
  });
});

function adicionarNovaTarefa(texto_tarefa, id_categoria) {
  const nova_tarefa = {
    id: Date.now(),
    descricao: texto_tarefa,
    categoria_id: id_categoria,
    checked: false
  };
  _tarefas.unshift(nova_tarefa);

  console.log(_tarefas);
  criarElementoLi(_tarefas[0]);
}

//utilizar foreach apos o append do #listatarefas, quando for carregar as tarefas
function criarElementoLi(tarefa) {
  $('#listaTarefas').prepend(
    $('<li/>', {
      class:
        'list-group-item d-flex justify-content-between align-items-center gap-2',
      id: tarefa.id
    })
      .append(
        $('<div/>', {
          class: 'ms-2 me-auto'
        })
          .append(
            $('<div/>', {
              class: 'fw-bold',
              text: categorias[tarefa.categoria_id - 1]
            })
          )
          .append(tarefa.descricao)
      )
      .append(
        $('<input />', {
          class: 'form-check-input me-2',
          type: 'checkbox',
          checked: tarefa.checked ? true : false,
          click: $.proxy(checkTarefa, this, tarefa.id)
          // click: function () {
          //   checkTarefa(tarefa.id);
          // }
        })
      )
      .append(
        $('<a />', {
          class: 'btn btn-danger',
          text: 'Apagar',
          click: $.proxy(apagarTarefa, this, tarefa.id)
        })
      )
  );
}

function checkTarefa(id_tarefa) {
  console.log(id_tarefa);
}

function apagarTarefa(id_tarefa) {
  $('#' + id_tarefa).remove();
}

function setLocalSt(arrTarefas) {
  localStorage.setItem('tarefas-todo', JSON.stringify(arrTarefas));
}
