// Lista de pedidos
let pedidos = [];


// Produtos disponíveis
const bebidas = [
    { nome: "Café", preco: 5 },
    { nome: "Suco de laranja", preco: 7 },
    { nome: "Refrigerante", preco: 6 },
    { nome: "Chocolate quente", preco: 8 },
    { nome: "Água", preco: 3 }
];

const comidas = [
    { nome: "Bolo de chocolate", preco: 8 },
    { nome: "Torrada", preco: 6 },
    { nome: "Salgados sortidos", preco: 7 },
    { nome: "Torta de limão", preco: 9 },
    { nome: "Bolo de cenoura", preco: 8 }
];


// Mostra as bebidas
function mostrarBebidas() {
    mostrarProdutos("Bebidas", bebidas);
}


// Mostra as comidas
function mostrarComidas() {
    mostrarProdutos("Comidas", comidas);
}


// Mostra os produtos
function mostrarProdutos(titulo, produtos) {

    document.getElementById("telaInicio")
        .classList.add("escondido");

    document.getElementById("telaPedido")
        .classList.add("escondido");

    document.getElementById("telaProdutos")
        .classList.remove("escondido");

    document.getElementById("tituloProdutos")
        .textContent = titulo;

    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach(function (produto) {

        let item = document.createElement("div");

        item.classList.add("produto");

        item.innerHTML = `
            <h3>${produto.nome}</h3>

            <p class="preco">
                R$ ${produto.preco.toFixed(2).replace(".", ",")}
            </p>

            <button onclick="adicionarPedido('${produto.nome}', ${produto.preco})">
                Adicionar ao pedido
            </button>
        `;

        lista.appendChild(item);
    });
}


// Adiciona produto ao pedido
function adicionarPedido(nome, preco) {

    pedidos.push({
        nome: nome,
        preco: preco
    });

    alert(nome + " foi adicionado ao pedido!");
}


// Mostra o pedido
function mostrarPedido() {

    document.getElementById("telaProdutos")
        .classList.add("escondido");

    document.getElementById("telaInicio")
        .classList.add("escondido");

    document.getElementById("telaPedido")
        .classList.remove("escondido");

    atualizarPedido();
}


// Atualiza o pedido
function atualizarPedido() {

    let listaPedido = document.getElementById("listaPedido");

    listaPedido.innerHTML = "";

    if (pedidos.length === 0) {

        listaPedido.innerHTML = `
            <p class="pedido-vazio">
                Seu pedido está vazio.
            </p>
        `;

        document.getElementById("valorTotal")
            .textContent = "R$ 0,00";

        return;
    }

    let total = 0;

    pedidos.forEach(function (pedido, indice) {

        total += pedido.preco;

        let item = document.createElement("div");

        item.classList.add("item-pedido");

        item.innerHTML = `
            <span>${pedido.nome}</span>

            <span>
                R$ ${pedido.preco.toFixed(2).replace(".", ",")}

                <button onclick="removerPedido(${indice})">
                    Remover
                </button>
            </span>
        `;

        listaPedido.appendChild(item);
    });

    document.getElementById("valorTotal")
        .textContent =
        "R$ " + total.toFixed(2).replace(".", ",");
}


// Remove um produto
function removerPedido(indice) {

    pedidos.splice(indice, 1);

    atualizarPedido();
}


// Volta para o início
function voltarInicio() {

    document.getElementById("telaProdutos")
        .classList.add("escondido");

    document.getElementById("telaPedido")
        .classList.add("escondido");

    document.getElementById("telaInicio")
        .classList.remove("escondido");
}


// Volta para os produtos
function voltarProdutos() {

    document.getElementById("telaPedido")
        .classList.add("escondido");

    document.getElementById("telaProdutos")
        .classList.remove("escondido");
}


// Finaliza o pedido
function finalizarPedido() {

    if (pedidos.length === 0) {
        alert("Seu pedido está vazio!");
        return;
    }

    let numero = prompt(
        "Pedido encerrado!\n\nInforme seu número para receber as informações pelo WhatsApp: (51)"
    );

    if (numero === null) {
        return;
    }

    while (numero.length !== 9 || isNaN(numero)) {

        alert("Número inválido!");

        numero = prompt(
            "Digite novamente seu número:"
        );

        if (numero === null) {
            return;
        }
    }

    alert(
        "Obrigada!\n\nMensagem enviada, verifique seu WhatsApp!"
    );

    pedidos = [];

    atualizarPedido();

    voltarInicio();
}