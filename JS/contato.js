"use strict";

/*  Selecionando os elementos que serão manipulados */
const formulario = document.querySelector("form");
const campoCep = formulario.querySelector("#cep");
const campoEndereco = formulario.querySelector("#endereco");
const campoBairro = formulario.querySelector("#bairro");
const campoCidade = formulario.querySelector("#cidade");
const campoEstado = formulario.querySelector("#estado");
const botaoBuscar = formulario.querySelector("#buscar");
const mensagem = formulario.querySelector("#status");

// Detectando o evento de click no botão buscar
botaoBuscar.addEventListener("click", function (event){
    event.preventDefault();
    
    let cep; // undefined

    /* Verificando se o cep tem 8 digitos 
    O operador !== significa "Diferente de". */
    if(campoCep.value.length !== 8){
        // Alerta o usuário sobre o erro de digitação
        mensagem.textContent = "Digite um CEP válido!";
        mensagem.style.color = "purple";
        mensagem.style.fontSize = "12px";
    } else {
        // Caso o contrario (ou seja, tem 8 dígitos), guarde o valor
        cep = campoCep.value;
    }

});