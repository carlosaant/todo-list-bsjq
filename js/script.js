'use strict';

let _tarefas = [];
const categorias = ['todos', 'Trabalho', 'Lazer', 'Educação'];

$(document).ready(function () {
  if (localStorage.getItem('tarefas-todobjq') != null) {
    carregarTarefas();
    renderizarTarefasRecuperadas();
  } else {
    verificarTarefas(_tarefas);
  }

  $('#formTarefas').submit(event => {
    event.preventDefault();
  });
  $('#button-add-tarefa').click(() => {
    $('#formTarefas').addClass('was-validated');
    if ($('#inp_text_tarefa').val().trim() === '') {
      $('#inp_text_tarefa').empty().focus();
    } else if ($('#inp_sel_categoria').val() == null) {
      $('#inp_sel_categoria').focus();
    } else {
      const texto_tarefa = $('#inp_text_tarefa').val().trim();
      const value_categoria = $('#inp_sel_categoria').val();
      $('#inp_text_tarefa').val('');
      $('#inp_sel_categoria').prop('selectedIndex', 0);
      $('#formTarefas').removeClass('was-validated');
      adicionarNovaTarefa(texto_tarefa, value_categoria);
    }
  });

  $('#button-filter-tarefa').click(() => {
    if (_tarefas.length != 0) {
      let id_categoria = $('#inp_sel_filter_categoria').val();
      filterTarefas(id_categoria);
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
  setLocalSt(_tarefas);
  verificarTarefas(_tarefas);
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
              text: categorias[tarefa.categoria_id]
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
  if (tarefa.checked) {
    $('#' + tarefa.id).addClass('border border-danger');
  }
}

function checkTarefa(id_tarefa) {
  _tarefas.find(tarefa => tarefa.id === id_tarefa).checked = this.checked;
  setLocalSt(_tarefas);
  $('#' + id_tarefa).toggleClass('border border-danger');
}

function apagarTarefa(id_tarefa) {
  //adicionar confimaçao de exclusão
  _tarefas = _tarefas.filter(item => item.id != id_tarefa);
  $('#' + id_tarefa).remove();
  verificarTarefas(_tarefas);
  setLocalSt(_tarefas);
}

function verificarTarefas(arrayTarefas) {
  if (arrayTarefas.length === 0) {
    $('#listaTarefas').append(tarefasVazias());
  } else if ($('#telaTarefasVazias')) {
    $('#telaTarefasVazias').remove();
  }
}

function tarefasVazias() {
  return $('<li/>', {
    class:
      'list-group-item d-flex justify-content-between align-items-center gap-2',
    id: 'telaTarefasVazias'
  }).append(
    $('<div/>', {
      class: 'ms-2 me-auto py-3',
      text: 'Nenhuma Tarefa cadastrada!'
    })
  );
}

function renderizarTarefasRecuperadas() {
  verificarTarefas(_tarefas);
  _tarefas.forEach(tarefa => criarElementoLi(tarefa));
}

function filterTarefas(id_categoria) {
  if (id_categoria != 0) {
    let _filter_tarefas = _tarefas.filter(
      tarefa => tarefa.categoria_id == id_categoria
    );
    if (_filter_tarefas.length != 0) {
      $('#listaTarefas').empty();
      _filter_tarefas.forEach(tarefa => criarElementoLi(tarefa));
    } else {
      $('#listaTarefas').empty();
      verificarTarefas(_filter_tarefas);
    }
  } else {
    $('#listaTarefas').empty();
    _tarefas.forEach(tarefa => criarElementoLi(tarefa));
  }
}

function setLocalSt(arrTarefas) {
  localStorage.setItem('tarefas-todobjq', JSON.stringify(arrTarefas));
}
function carregarTarefas() {
  _tarefas = JSON.parse(localStorage.getItem('tarefas-todobjq'));
}
