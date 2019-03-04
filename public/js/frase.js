$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria() {
    
    $("#spinner").toggle(); // mostrando o spinner

    $.get("http://localhost:3000/frases",trocaFraseAleatoria)
    .fail(function() {
        $("#erro").toggle();
        setTimeout(function() {
            $("#erro").toggle();
        },1500);
    })
    .always(function() {
        $("#spinner").toggle();
    });
}

function trocaFraseAleatoria(data) {
    var frase = $(".frase");
    var numAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numAleatorio].tempo);
}

function buscaFrase() {
    
    $("#spinner").toggle();

    var fraseId = $("#frase-id").val();
    var dados = {id: fraseId}; // criacao do objeto JS que guarda a id

    // passando objeto como segundo parametro
    $.get("http://localhost:3000/frases",dados, trocaFrase)
    .fail(function() {
        $("#erro").toggle();
        setTimeout(function() {
            $("#erro").toggle();
        },2000);
    })
    .always(function() {
        $("#spinner").toggle();
    });
}

function trocaFrase(data) {
    var frase = $(".frase");
    frase.text(data.texto) // cuidado, texto com "o" no final
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}