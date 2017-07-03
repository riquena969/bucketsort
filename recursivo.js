function bucketsort(array) {
    var menor = array[0];
    var maior = array[0];
    for (var i = 1; i < array.length; i++) {
        menor = array[i] < menor ? array[i] : menor;
        maior = array[i] > maior ? array[i] : maior;
    }

    console.log(menor);
    console.log(maior);
}

/* Funções da tela */
$(document).ready(adicionarElemento);

function adicionarElemento() {
    $('.itens').append('\
        <div class="col-xs-2">\n\
            <div class="form-group">\n\
                <input type="number" class="form-control pontuacao" placeholder="Número" value="' + Math.floor(Math.random() * 21) + '">\n\
            </div>\n\
        </div>');
}

function ordenarElementos() {
    if ($('.itens .col-xs-2').length == 0) {
        alert('Você não tem elementos para ordenar!');
    }

    itens = [];
    $('.itens input[type=number]').each(function(key, item) {
        itens.push(parseFloat($(item).val()));
    });

    bucketsort(itens);
}

$('.itens').on('dblclick', 'input[type=number]', function() {
    $(this).closest('.col-xs-2').fadeOut(500, function() {
        $(this).remove();
    });
});