

function getCat(){

const selectElem = document.getElementById("txtCat");
const pElem = document.getElementById("select");


// When a new <option> is selected
selectElem.addEventListener("change", () => {
  const index = selectElem.selectedIndex;
  // Add that data to the <p>
  pElem.textContent = `selectedIndex: ${index}`;
});

}

function criarProduto(){

    var url = "http://localhost:5050/produto";   

    var produto = {
        "prod_codigo": txtProdCodigo.value,
        "prod_codigo_ori": txtProdCodigoOri.value,
        "nome_prod": txtNomeProd.value,
        "prod_descricao": txtDescricao.value,
        "prod_linha_fabricacao": txtProdLinhaFabricacao.value,
        "prod_pc_jg": txtProdPcJg.value,
        "prod_peso": txtPeso.value,
        "prod_preco": intPreco.value,
        "prod_classificacao": txtClassificacao.value,
        "prod_aplicacao_modelo": txtAplicacao.value,
        "prod_observacao_1": txtObs1.value,
        "prod_observacao_2": txtObs2.value,
        "prod_observacao_3": txtObs3.value,
        "prod_observacao_4": txtObs4.value,
        "prod_observacao_5": txtObs5.value,
        "prod_observacao_6": txtObs6.value,
        "prod_observacao_7": txtObs7.value,
        "prod_quant_em_estoque": txtQtdEstoque.value,
        "prod_ncm": intNcm.value,
        "prod_marca": txtMarca.value,
        "prod_modelo": txtModelo.value,
        "prod_categoria": txtCat.value
    };


    var envelope = {
        method: "POST",
        body: JSON.stringify(produto),
        headers: {
            "Content-type": "application/json"
        }
    };

    fetch(url,envelope)
        .then(res => res.json())
        .then( res => {
                var produtoCriado = res;
                alert("Produto criado com sucesso. ID gerado = " + produtoCriado.id);
                window.location = "listaproduto.html";
            }
        )
        .catch(err => {
            alert("Erro ao criar produto");
            console.log(err);
        });
    
}

function carregarListaProduto(){
    var url = "http://localhost:5050/produto";

    fetch(url)
        .then(res => res.json())
        .then( res => {
                montarGrid(res);
            }
        )
        .catch(err => {
            alert("Erro ao carregar listagem de usuários");
            console.log(err);
        });

}

function montarGrid(listaprodutos){

    var tabela = 
        "<table class='table table-striped'>" +
            "<thead>" +
                "<tr>" +
                "<th scope='col'>Cód Prod</th>" +
                "<th scope='col'>Cód Prod Ori</th>" +
                "<th scope='col'>Descrição</th>" +
                "<th scope='col'>Linha Fabricação</th>" +
                "<th scope='col'>Tipo de Produto</th>" +
                "<th scope='col'>Peso</th>" +
                "<th scope='col'>Preço</th>" +
                "<th scope='col'>Data de Criação</th>" +
                "<th scope='col'>Data da Última Alteração</th>" +
                "<th scope='col'>Classe</th>" +
                "<th scope='col'>Aplicação</th>" +
                "<th scope='col'>Qtd Máquina</th>" +
                "<th scope='col'>Observação 1</th>" +
                "<th scope='col'>Observação 2</th>" +
                "<th scope='col'>Observação 3</th>" +
                "<th scope='col'>Observação 4</th>" +
                "<th scope='col'>Observação 5</th>" +
                "<th scope='col'>Observação 6</th>" +
                "<th scope='col'>Observação 7</th>" +
                "<th scope='col'>Qtd Estoque</th>" +
                "<th scope='col'>Prod Ncm</th>" +
                "<th scope='col'>Marca</th>" +
                "<th scope='col'>Modelo</th>" +
                "<th scope='col'>NCM</th>" +
                "<th scope='col'>Modelo</th>" +
                "<th scope='col'>Categoria</th>"+
                "</tr>" +
            "</thead>" + 
            "<tbody>";
    
    for(cont = 0; cont < listaprodutos.content.length; cont++){
        var produto = listaprodutos.content[cont];
        tabela += 
            "<tr>" +
                "<td>" + produto.id + "</td>" +
                "<td>" + produto.prod_codigo + "</td>" +
                "<td>" + produto.prod_codigo_ori + "</td>" +
                "<td>" + produto.prod_descricao + "</td>" +
                "<td>" + produto.prod_linha_fabricacao + "</td>" +
                "<td>" + produto.prod_pc_jg + "</td>" +
                "<td>" + produto.prod_peso + "</td>" +
                "<td>" + produto.prod_preco + "</td>" +
                "<td>" + produto.prod_data_de_criacao + "</td>" +
                "<td>" + produto.prod_data_da_alteracao + "</td>" +
                "<td>" + produto.prod_classificacao + "</td>" +
                "<td>" + produto.prod_aplicacao_modelo + "</td>" +
                "<td>" + produto.prod_quant_maquina + "</td>" +
                "<td>" + produto.prod_observacao_1 + "</td>" +
                "<td>" + produto.prod_observacao_2 + "</td>" +
                "<td>" + produto.prod_observacao_3 + "</td>" +
                "<td>" + produto.prod_observacao_4 + "</td>" +
                "<td>" + produto.prod_observacao_5 + "</td>" +
                "<td>" + produto.prod_observacao_6 + "</td>" +
                "<td>" + produto.prod_observacao_7 + "</td>" +
                "<td>" + produto.prod_quant_em_estoque + "</td>" +
                "<td>" + produto.prod_ncm + "</td>" +
                "<td>" + produto.nome_prod + "</td>" +
                "<td>" + produto.prod_ncm + "</td>" +
                "<td>" + produto.prod_marca + "</td>" +
                "<td>" + produto.prod_modelo + "</td>" +
                "<td>" + produto.prod_categoria + "</td>" +
            "</tr>";
    }

    tabela += "</tbody></table>";

    divDados.innerHTML = tabela;

}

function carregarTelaProduto(){
    var produtoLogado = localStorage.getItem("produtoLogado");

    if(produtoLogado == null){
        window.location = "login.html";
    }
    else{
        var produto = JSON.parse(produtoLogado);
        carregarProduto(produto.id);
    }
}

function carregarProduto(id){
    var url = "http://localhost:5050/produto/" + id;

    fetch(url)
        .then(res => res.json())
        .then( res => {
                var produto = res;   
                divFoto.innerHTML =
                    "<img width='40%' height='100%' src="  + produto.foto + ">";

                divDados.innerHTML =
                    "<h3>" + produto.nome + "<br>" + 
                            produto.email + "<br>" +
                            "ID: " + produto.id + "</h3>";

            }
        )
        .catch(err => {
            alert("Erro ao carregar dados do usuário");
            console.log(err);
        });

}
