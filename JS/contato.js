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
botaoBuscar.addEventListener("click", async function (event){
    event.preventDefault();
    
    let cep; // undefined

    /* Verificando se o cep tem 8 digitos 
    O operador !== significa "Diferente de". */
    if(campoCep.value.length !== 8){
        // Alerta o usuário sobre o erro de digitação
        mensagem.textContent = "Digite um CEP válido!";
        mensagem.style.color = "purple";

        // Pare a execução
        return;
    } else {
        // Caso o contrario (ou seja, tem 8 dígitos), guarde o valor
        cep = campoCep.value;
    }

    /* Tecnica de comunicação assíncrona para
    acessar uma API (www.viacep.com.br) */

    // Etapa 1: preparar a URL da API com o CEP digitado
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    // Etapa 2: acessar a API (com a URL) e aguardar o retorno dela
    const resposta = await fetch(url);

    

    // Etapa 3: extrair os dados da resposta em formato JSON
    const dados = await resposta.json();

    // Etapa 4: lidar com os dados de resposta (em casi de erro ou sucesso)
    if("erro" in dados){
        mensagem.textContent = "CEP inexistente!";
        mensagem.style.color = "red";
    } else {
        mensagem.textContent = "CEP encotrado!";
        mensagem.style.color = "blue";

        campoEndereco.value = dados.logradouro;
        campoBairro.value = dados.bairro;
        campoCidade.value = dados.localidade;
        campoEstado.value = dados.uf;
        
    }


});