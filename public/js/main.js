var campo = $(".campo-digitacao");
var tempoInicial = $("#tempo-digitacao").text();

$(function() {
    /* Um atalho para $(document).ready(function(){})
     * é $(function(){})
     */
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    /* Como atalho para .on("click", function() {})
     * podemos usar .click(function() {})
     */
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
    /*  '$' é um atalho para a função seletora do jQuery, que leva
    *  o mesmo nome do framework.
    *  Assim, poderia ter sido usado tanto jQuery(".frase")
    *  quanto $(".frase")
    *  $(".frase") seleciona no HTML a tag que possui classe
    *  "frase" e através do metodo text() extrai o seu conteúdo
    *  gravando-o na variável "frase".
    */
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);    
}

function inicializaContadores() {
    campo.on("input", function() {
    
        // Pega o texto digitado no campo e salva em 'conteudo'
        var conteudo = campo.val();
    
        /* Retira os espaços da string
         * \s --> seleciona os espaços em branco
         * + --> metachar que seleciona um ou mais
         * g --> faz a busca global, ou seja em todo o texto
         * '' --> substitui os espaços em branco por nenhum caracter 
         */
        var conteudoSemEspaco = conteudo.replace(/\s+/g,'');
    
        /* Conta a quantidade de palavras digitadas
         * por meio da função 'split()' usando como
         * delimitador um espaço em branco 'split(" ")'
         * Em JavaScript as RegExp precisam ser declaradas
         * entre duas "/", dessa forma, a expressão 
         * para selecionar todo tipo de caractere exceto
         *  espaços em branco é '\S'.
         * A expressão completa fica assim: /\S+/
         */ 
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        var qtdCaracteres = conteudoSemEspaco.length;
        
        /* Substitui a tag com id 'contador-palavras'
         * com o conteúdo da variável 'qtdPalavras'
         */
        $("#contador-palavras").text(qtdPalavras);
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();

    /* campo.on() --> a função executa cada vez que o 
    * campo de texto for selecionado pelo usuário
    * campo.one() --> a função executa uma vez apenas
    */
    campo.one("focus", function() {
        $("#botao-reiniciar").attr("disabled",true);
        var cronometroID = setInterval(function() {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                //$("#botao-reiniciar").attr("disabled",false);
                finalizaJogo();
                
            }
        },1000);
    });
}

function finalizaJogo() {
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function inicializaMarcadores() {
    var frase = $(".frase").text();
    campo.on("input", function() {
        var digitado = campo.val();
        var comparavel = frase.substr(0,digitado.length);
        
        if (digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        }else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}

function reiniciaJogo() {
    /* A ação de adicionar e remover classes é tão comum
     * que existe no jQuery uma função específica para isso:
     * 'toggleClass'. Funciona assim: se no momento que a
     * função for chamada, o elemento possuir a classe, ela
     * será removida. Mas se o elemento não possuir a classe,
     * ela será adicionada.
     * É utilizada no lugar de 'addClass' e 'removeClass'.
     */
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}