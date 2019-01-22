/*  $ é um atalho para a função seletora do jQuery, que leva
    o mesmo nome do framework.
    Assim, poderia ter sido usado tanto jQuery(".frase")
    quanto $(".frase")
    $(".frase") seleciona no HTML a tag que possui classe
    "frase" e através do metodo text() extrai o seu conteúdo
    gravando-o na variável "frase".
*/
var frase = $(".frase").text();

var numPalavras = frase.split(" ").length;
var tamanhoFrase = $("#tamanho-frase");

tamanhoFrase.text(numPalavras);