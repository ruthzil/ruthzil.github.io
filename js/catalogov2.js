
function fetchCatalogData(page, pageSize) {

    var url = "http://ruthzil.com.br:5050/catalogo?page=" + page + "&linesPerPage=" + pageSize + "";
  
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

function fetchBaseBrand(page, pageSize, brand) {

    var url = "http://ruthzil.com.br:5050/catalogo?page=" + page + "&linesPerPage=" + pageSize + "";

    if (brand) {
        url += "&brand=" + brand;
    }

    fetch(url)
        .then(res => res.json())
        .then(res => {
            montarGrid(res);
        })
        .catch(err => {
            alert("Erro ao carregar listagem de catálogos");
            console.log(err);
        });

}

  function montarGrid(listaCatalogos, page, pageSize) {

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

     // Gere os botões de paginação
     var paginacao = document.getElementById("paginacao");
     if (paginacao) {
         paginacao.innerHTML = ""; // Limpa qualquer conteúdo anterior
 
         for (var i = 1; i <= listaCatalogos.totalPages; i++) {
             var button = document.createElement("button");
             button.textContent = i;
             button.className = "col-12";
             button.onclick = function () {
                 fetchCatalogData(i, pageSize);
             };
             paginacao.appendChild(button);
         }
     } else {
         console.error("Elemento 'paginacao' não encontrado.");
     }
 }