var campo = $(".campo-digitacao");

/* Um atalho para $(document).ready(function(){})
 * é $(function(){})
 */
$(function() {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
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
        var cronometroID = setInterval(function() {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                campo.attr("disabled", true);
                clearInterval(cronometroID);
            }
        },1000);
    });
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text("5");
    inicializaCronometro();
}
