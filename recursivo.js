function bucketsort(array, quantidadeBaldes) {
    console.log(array.join());
    // Escrevendo na tela os elementos que chegaram para serem ordenados
    $('#ordenados').append('<li class="list-group-item">Array que chegou -> ' + array.join(', ') + '</li>');

    // Descobrindo o menor e maior elementos
    var menor = array[0];
    var maior = array[0];
    for (var i = 1; i < array.length; i++) {
        menor = array[i] < menor ? array[i] : menor;
        maior = array[i] > maior ? array[i] : maior;
    }

    // Descobrindo abrangência do balde. (De onde até onde ele vai)
    abrangencia = (maior - menor) / quantidadeBaldes;

    // Criando baldes
    var buckets = [];
    for (var i = 0; i < quantidadeBaldes; i++) {
        buckets[i] = [];
    }

    // Adicionando itens nos baldes
    for (var i = 0; i < array.length; i++) {
        indiceDestino = Math.floor((array[i] - menor) / abrangencia);

        buckets[(indiceDestino >= quantidadeBaldes ? (quantidadeBaldes - 1) : indiceDestino)].push(array[i]);
    }

    // Exibindo baldes criados
    $('#ordenados').append('<li class="list-group-item">Baldes Gerados:<br></li>');
    for (var i = 0; i < buckets.length; i++) {
        $('#ordenados li').last().append('Balde ' + (i + 1) + ' (' + Math.round((menor + (i * abrangencia)) * 100)/100 + ' - ' + Math.round((menor + ((i + 1) * abrangencia)) * 100)/100 + ') - ' + buckets[i].join(', ') + '<br>');
    }

    // Verifica se os baldes precisam ser ordenados antes de retornar..
    for (var i = 0; i < buckets.length; i++) {
        elementos = buckets[i];
        ordenar = false;
        for (var j = 1; j < elementos.length; j++) {
            ordenar = elementos[j-1] > elementos[j] ? true : ordenar;
        }
        if (ordenar) {
            buckets[i] = bucketsort(elementos, quantidadeBaldes);
        }
    }

    // Voltando valores para a array original
    atual = 0;
    for (var i = 0 ; i < buckets.length ; i++) {
        for(var j = 0 ; j < buckets[i].length ; j++) {
            array[atual] = buckets[i][j];
            atual++;
        }
    }

    // Retornando a array ordenada
    return array;
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
    $('#ordenados').html('');

    if ($('.itens .col-xs-2').length == 0) {
        alert('Você não tem elementos para ordenar!');
    }

    itens = [];
    $('.itens input[type=number]').each(function(key, item) {
        itens.push(parseFloat($(item).val()));
    });

    console.log(bucketsort(itens, 5));
}

$('.itens').on('dblclick', 'input[type=number]', function() {
    $(this).closest('.col-xs-2').fadeOut(500, function() {
        $(this).remove();
    });
});