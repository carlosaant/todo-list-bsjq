'use strict';

document.addEventListener('DOMContentLoaded', function (event) {
  $('#button-add-tarefa').click(() => {
    let texto_tarefa = $('#inp_text_tarefa').val();
    let value_categoria = $('#inp_sel_categoria').val();
    console.log(texto_tarefa, value_categoria);
    // alert('Clicou!');
  });
});
