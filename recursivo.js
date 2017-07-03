function bucketsort(array, quantidadeBaldes) {
    var menor = array[0];
    var maior = array[0];
    for (var i = 1; i < array.length; i++) {
        menor = array[i] < menor ? array[i] : menor;
        maior = array[i] > maior ? array[i] : maior;
    }

    abrangencia = (maior - menor - 0.1) / quantidadeBaldes;

    var buckets = [];
    for (var i = 0; i < quantidadeBaldes; i++) {
        buckets[i] = [];
    }

    for (var i = 0; i < array.length; i++) {
        buckets[Math.floor(array[i] / quantidadeBaldes)].push(array[i]);
    }

    console.log(buckets);
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

    bucketsort(itens, 5);
}

$('.itens').on('dblclick', 'input[type=number]', function() {
    $(this).closest('.col-xs-2').fadeOut(500, function() {
        $(this).remove();
    });
});