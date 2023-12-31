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

// Seleção do campo telefone usando JS PURO
const campoTelefone = formulario.querySelector("#telefone");

// Seleção do campo telefone usando JQuery
// const campoTelefone = $("#telefone");

// Ativando a máscara para o telefone
$(campoTelefone).mask("(00) 0000-0000"); // exemplo: (11) 4002-8922
$(campoCep).mask("00000-000");

// Detectando o evento de click no botão buscar
botaoBuscar.addEventListener("click", async function (event){
    event.preventDefault();
    
    let cep; // undefined

    /* Verificando se o cep tem 8 digitos 
    O operador !== significa "Diferente de". */
    if(campoCep.value.length !== 9){
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

        // const exemplos = document.querySelector(".exemplo");
        // for(const exemplo of exemplos){
        //     exemplo.classList.remove("exemplo");
        // }

        campoEndereco.value = dados.logradouro;
        campoBairro.value = dados.bairro;
        campoCidade.value = dados.localidade;
        campoEstado.value = dados.uf;
        
    }


});




/* Programação do Formspree */


    
async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: formulario.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Seus dados foram enviados! Aguarde retorno.";
      formulario.reset()
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
          status.innerHTML = "Deu ruim! algo de errado não está certo!"
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "Oops! There was a problem submitting your form"
  });
}
formulario.addEventListener("submit", handleSubmit)