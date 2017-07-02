function bucketsort(array, orderBy) {
    // Descobrindo o maior item do array
    var maior = 0;
    for (var i = 1 ; i < array.length ; i++) {
        maior = (array[maior][orderBy] < array[i][orderBy]) ? i : maior;
    }
    
    // Criando 'baldes' para armazenar os valores
    var buckets = [];
    for (var i = 0 ; i <= array[maior][orderBy] ; i++) {
        buckets[i] = [];
    }

    // Jogando valores nos baldes
    for (var i = 0 ; i < array.length ; i++) {
        buckets[array[i][orderBy]].push(array[i]);
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

function ordenarElementos() {
    // Montando array com os itens que o usuário preencheu
    minhaArray = [];
    $('.itens .panel').each(function(key, element) {
        minhaArray.push({'pontuacao' : $(element).find('.pontuacao').val(), 'nome': $(element).find('.nome').val()});
    });

    // Chamando a função de ordenação
    arrayOrdenada = bucketsort(minhaArray, 'pontuacao');

    // Escrevendo array ordenada na tela
    $('#ordenados').html('');
    for (var i = 0 ; i < arrayOrdenada.length ; i++) {
        $('#ordenados').append('<li class="list-group-item">' + arrayOrdenada[i].pontuacao + ' - ' + arrayOrdenada[i].nome + '</li>');
    }
}

/* Funções da tela */
function adicionarElemento() {
    $('.itens').append('\
        <div class="panel panel-default">\n\
            <div class="panel-body">\n\
                <div class="btn-group btn-group-justified" role="group">\n\
                    <div class="btn-group">\n\
                        <input type="number" class="form-control pontuacao" placeholder="Número">\n\
                    </div>\n\
                    <div class="btn-group">\n\
                        <input type="text" class="form-control nome" placeholder="Algum texto">\n\
                    </div>\n\
                </div>\n\
            </div>\n\
        </div>');
};