"use strict";

// Selecionando o elemento (atraves de decendencia) que acionara o menu
const botaoMenu = document.querySelector("nav h2");
//console.log(botaoMenu);

// selecionando a lista/menu atraves da classe
const menu = document.querySelector(".menu");
//console.log(menu);

// selecionando o link que esta dentro do nav h2
const textBotao = botaoMenu.querySelector("a");
//console.log(textBotao);

botaoMenu.addEventListener("click", function(event){
    
    /* Anular/prevenir o comportamneot do link*/
    event.preventDefault();
    menu.classList.toggle("aberto"); 

    if (menu.classList.contains("aberto")){
        textBotao.innerHTML = "Fechar &times;";

    } else {
        textBotao.innerHTML = "Menu &equiv;";
    }
 });