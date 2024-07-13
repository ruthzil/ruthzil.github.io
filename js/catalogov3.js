function criarCatalogo() {

    var url = "http://www.ruthzil.com.br:5050/catalogo";

    var catalogo = {
        'nomecat': txtNome.value,
        'marca': txtMarca.value,
        'modelo': txtModelo.value,
        'path': file.value
    };

    var envelope = {
        method: "POST",
        body: JSON.stringify(catalogo),
        headers: {
            "Content-type": "application/json"
        }
    };

    fetch(url, envelope)
        .then(res => res.json())
        .then(res => {
            var catalogoCriado = res;
            alert("Catalogo criado com sucesso. ID gerado = " + catalogoCriado.id);
            window.location = "novocatalogo.html";
        }
        )
        .catch(err => {
            alert("Erro ao criar Catalogo");
            console.log(err);
        });

}

function carregarTelaCatalogo(){
    var usuarioLogado = localStorage.getItem("usuarioLogado");
}

function carregarCatalogo(id){
    var url = "http://www.ruthzil.com.br:5050/catalogo/" + id;

    fetch(url)
        .then(res => res.json())
        .then( res => {
                var catalogo = res;   
                divFoto.innerHTML =
                    "<img width='40%' height='100%' src=" + usuario.foto + ">";

                divDados.innerHTML =
                    "<h3>" + catalogo.nome + "<br>" + 
                catalogo.email + "<br>" +
                            "ID: " + usuario.id + "</h3>";

            }
        )
        .catch(err => {
            alert("Erro ao carregar dados do usuário");
            console.log(err);
        });

}

function carregarListaCatalogo() {

    var url = "http://ruthzil.com.br:5050/catalogo";
   
    fetch(url)
        .then(res => res.json())
        .then(res => {
            montarGrid(res);
        }
        )
        .catch(err => {
            alert("Erro ao carregar listagem de catalogos");
            console.log(err);
        });

}

function montarGrid(listaCatalogos) {

    var tabela =
        "<table class='table table-striped'>" +
        "<thead>" +
        "<tr>" +
        "<th scope='col'>Nome do Catálogo</th>" +
        "<th scope='col'>Marca</th>" +
	    "<th scope='col'>Modelo</th>" +
        "<th scope='col'>Arquivo</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody>";

    for (cont = 0; cont < listaCatalogos.content.length; cont++) {
        const catalogo = listaCatalogos.content[cont];
        tabela +=
            "<tr>" +
            "<td>" + catalogo.nomecat + "</td>" +
            "<td>" + catalogo.marca + "</td>" +
	        "<td>" + catalogo.modelo + "</td>" +
            "<td><a href='http://ruthzil.com.br/catalogo/" + catalogo.path + "'>Download</a></td>" +
            "</tr>";
    }
    
    tabela += "</tbody></table>";
    divDados.innerHTML = tabela;

}
