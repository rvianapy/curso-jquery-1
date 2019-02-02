$("#botao-placar").click(mostraPlacar);

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Rodrigo";
    var numPalavras = $("#contador-palavras").text();
    var linha = novaLinha(usuario, numPalavras);
    var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>";
    linha.find(".botao-remover").click(removeLinha);
    corpoTabela.prepend(linha);

    $(".placar").slideDown(700);
    scrollPlacar();
}

function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;
    $("body").animate(
        {
            scrollTop: posicaoPlacar + "px"
        },1000);
    
}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");
    var link = $("<a>").addClass("botao-remover").attr("href","#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);
    colunaRemover.append(link);
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {
    event.preventDefault();
    linha = $(this).parent().parent();
    linha.fadeOut(700);
    setTimeout(function() {
        linha.remove();
    },700);
}

function mostraPlacar() {
    /* A função stop() é usada para terminar uma
     * animação antes de começar a próxima
     */
    $(".placar").stop().slideToggle(700);
}