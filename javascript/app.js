
// CONST USADAS

const menuPrincipal = document.querySelector(".menuPrincipal")
const opcaoMenuPrincipal = document.querySelectorAll(".opcaoMenuPrincipal")
const backgroundMeusPedidos = document.getElementById("backgroundMeusPedidos")
const classBebidas = document.querySelectorAll(".babidasli")
const classHamburguer = document.querySelectorAll(".hamburguerli")
const ulNavegacao = document.querySelector(".ulNavegacao")
const uLmostrarPedidosRodape = document.querySelector(".uLmostrarPedidosRodape")
const uLmostrarPedidos = document.querySelector(".uLmostrarPedidos")
const btnApagarPedidos = document.querySelector(".btnApagarPedidos")
const pedidosLiElements = document.querySelectorAll(".pedidoLi")
const contadordepedidos = document.querySelector(".contadordepedidos")
const contadorRodape = document.querySelector(".contadorRodape")
const btnAdicionar = document.querySelectorAll(".btnAdicionar")
const btnFinalizarPedido = document.querySelector(".btnFinalizarPedido")
const pedidosRodape = document.querySelector(".pedidosRodape")
const avisodePedidovazio = document.querySelector(".avisodePedidovazio")



// ARRAY PARA ARMAZENAR ELEMENTOS
let pegarTodosasbebidas = []
let pegarTodosHamburgueres = []
const dadosDoPedido = []
const botoesClicados = []
const pegarLisAdicionada = []




const PegarItems = () => {
    classHamburguer.forEach((itemsHamburguer) => { pegarTodosHamburgueres.push(itemsHamburguer) })
    classBebidas.forEach((itemsBebidas) => { pegarTodosasbebidas.push(itemsBebidas) })
}


// Iterando por todos os elementos da lista de opções do menu principal
opcaoMenuPrincipal.forEach((itemDoMenuLi) => {
    // Adicionando um evento de clique a cada item
    itemDoMenuLi.addEventListener("click", (event) => {
        // Função para pegar os itens (não está definida no código compartilhado)
        PegarItems();

        // Removendo a classe "liSelecionado" de todos os elementos do menu principal
        opcaoMenuPrincipal.forEach((itemBackground) => {
            itemBackground.classList.remove("liSelecionado");
        })

        // Capturando o elemento clicado
        const checarCliqueLi = event.target;

        // Alternando a classe "liSelecionado" do elemento clicado
        itemDoMenuLi.classList.toggle("liSelecionado");

        // Verificando qual opção do menu foi clicada
        if (checarCliqueLi.classList.contains("pedidos")) {
            // Exibindo ou ocultando algum elemento com a classe "backgroundMeusPedidos"
            if(dadosDoPedido.length == 0){

                    avisodePedidovazio.style.display="flex"

                    setTimeout(() => {
                        avisodePedidovazio.style.display="none"
                       
                    }, 2000);
                
              }else{
                backgroundMeusPedidos.classList.toggle("ocultar")}
                
            
            
        } else if (checarCliqueLi.classList.contains("hamburgueres")) {
            // Exibindo ou ocultando elementos de bebidas e hamburgueres
            pegarTodosasbebidas.forEach((itemBebida) => {
                itemBebida.classList.toggle("ocultar")
            });

            pegarTodosHamburgueres.forEach((itemH) => {
                itemH.classList.remove("ocultar")
            });
        } else if (checarCliqueLi.classList.contains("bebidas")) {
            // Exibindo ou ocultando elementos de hamburgueres e bebidas
            pegarTodosHamburgueres.forEach((itemHamburguer) => {
                itemHamburguer.classList.toggle("ocultar")
            });

            pegarTodosasbebidas.forEach((itemBebida) => {
                itemBebida.classList.remove("ocultar")
            });
        }
    });
});

function fecharMeusPedidos() {
    backgroundMeusPedidos.classList.toggle("ocultar")

}



let idDaLi = 1;
let contatorCarrinho = 0;
ulNavegacao.addEventListener("click", (elementoClicado) => {

    const checarElementoqueFoiClicado = elementoClicado.target;

    if(checarElementoqueFoiClicado.tagName === "BUTTON"){
        botoesClicados.push(checarElementoqueFoiClicado)

        // Atualiza o contador de pedidos
        contadordepedidos.innerHTML = `${dadosDoPedido.length + 1}`;
        contadorRodape.innerHTML = `${dadosDoPedido.length + 1}`;
        // Adiciona uma classe ao botão clicado
        checarElementoqueFoiClicado.classList.add("buttonClicado");

        // Define o conteúdo do botão clicado
        checarElementoqueFoiClicado.innerHTML = `<i class="fa fa-shopping-basket" aria-hidden="true"></i> Adicionado`

        // Obtém o atributo 'data-pedido' do botão clicado
        const pegarAtributo = checarElementoqueFoiClicado.getAttribute("data-pedido");


        // Cria um elemento <li> para representar o pedido
        const construirLiDePedido = document.createElement("li");
        construirLiDePedido.id = `${dadosDoPedido.length}`;
        construirLiDePedido.classList.add("pedidoLi");

        // Define o conteúdo do <li> com o pedido
        const pedidoFInal = construirLiDePedido.textContent = `1x ${pegarAtributo}`;

        // Adiciona o pedido ao array 'dadosDoPedido'
        dadosDoPedido.push(pedidoFInal)

        // Adiciona o <li> ao elemento 'uLmostrarPedidos'
        uLmostrarPedidos.appendChild(construirLiDePedido);

        // const clonarPedidos = construirLiDePedido.cloneNode(true);
        // uLmostrarPedidosRodape.appendChild(clonarPedidos);

        // Exibe os dados do pedido no console
    }


    
})




btnApagarPedidos.addEventListener("click", () => {

    const verificarBotaoClicado = document.querySelectorAll(".btnAdicionar")
    const pedidosLiElements = document.querySelectorAll(".pedidoLi")


    if (botoesClicados.length > 0) {

        dadosDoPedido.pop()

        const ultimoLi = pedidosLiElements[pedidosLiElements.length - 1]
        ultimoLi.remove()
        const quantidade = botoesClicados.length
        const apagarbtn = botoesClicados[quantidade - 1]
        botoesClicados.pop()
        apagarbtn.classList.remove("buttonClicado")
       

        contadordepedidos.innerHTML = `${dadosDoPedido.length}`
        contadorRodape.innerHTML = `${contadordepedidos.textContent}`


    } else {
        backgroundMeusPedidos.classList.toggle("ocultar")


    }

})


btnFinalizarPedido.addEventListener("click", () =>{
    


const mensagemparaWhatsapp = dadosDoPedido.join("%0A")

const encodificacao = encodeURIComponent(mensagemparaWhatsapp)

console.log(encodificacao)

 window.location.href = `https://wa.me/5585996203358/?text=%2AMeu%20Pedido%20%3A%2A%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D
 %0A${mensagemparaWhatsapp}`

    
})



pedidosRodape.addEventListener("click", ()=>{

    if(botoesClicados.length == 0){
        avisodePedidovazio.style.display="flex"

                    setTimeout(() => {
                        avisodePedidovazio.style.display="none"
                       
                    }, 2000);
    }else{
        backgroundMeusPedidos.classList.toggle("ocultar")
    }

   

})

