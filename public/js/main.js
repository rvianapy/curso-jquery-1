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

var campo = $(".campo-digitacao");
campo.on("click", function() {
    
    // Pega o texto digitado no campo e salva em 'conteudo'
    var conteudo = campo.val();
    /* Conta a quantidade de palavras digitadas
     * por meio da função 'split()' usando como
     * delimitador um espaço em branco 'split(" ")'
     */ 
    var qtdPalavras = conteudo.split(" ").length;
    console.log(qtdPalavras);

    /* Substitui a tag com id 'contador-palavras'
     * com o conteúdo da variável 'qtdPalavras'
     */
    $("#contador-palavras").text(qtdPalavras);
});

