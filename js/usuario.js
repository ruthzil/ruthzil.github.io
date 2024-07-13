function efetuarLogin(){
    
    var url = "http://localhost:8080/login";

    var usuario = {
        "email": txtEmail.value,
        "senha": txtSenha.value
    };

    var envelope = {
        method: "POST",
        body: JSON.stringify(usuario),
        headers: {
            "Content-type": "application/json"
        }
    };

    fetch(url,envelope)
        .then(res => res.json())
        .then( res => {
                localStorage.setItem("usuarioLogado", JSON.stringify(res));
                window.location = "dash.html";
            }
        )
        .catch(err => {
            alert("Usuário ou senha inválido");
        });

}

function carregarTelaUsuario(){
    var usuarioLogado = localStorage.getItem("usuarioLogado");

    if(usuarioLogado == null){
        window.location = "login.html";
    }
    else{
        var usuario = JSON.parse(usuarioLogado);
        carregarUsuario(usuario.id);
    }
}

function carregarUsuario(id){
    var url = "http://localhost/usuario/" + id;

    fetch(url)
        .then(res => res.json())
        .then( res => {
                var usuario = res;   
                divFoto.innerHTML =
                    "<img width='40%' height='100%' src=" + usuario.foto + ">";

                divDados.innerHTML =
                    "<h3>" + usuario.nome + "<br>" + 
                            usuario.email + "<br>" +
                            "ID: " + usuario.id + "</h3>";

            }
        )
        .catch(err => {
            alert("Erro ao carregar dados do usuário");
            console.log(err);
        });

}

function criarUsuario(){

    var url = "http://localhost:8080/usuario";

    var usuario = {
        "email": txtEmail.value,
        "senha": txtSenha.value,
        "nome": txtNome.value
    };

    var envelope = {
        method: "POST",
        body: JSON.stringify(usuario),
        headers: {
            "Content-type": "application/json"
        }
    };

    fetch(url,envelope)
        .then(res => res.json())
        .then( res => {
                var usuarioCriado = res;
                alert("Usuário criado com sucesso. ID gerado = " + usuarioCriado.id);
                window.location = "dash.html";
            }
        )
        .catch(err => {
            alert("Erro ao criar usuário");
            console.log(err);
        });
    
}

function carregarListaUsuario(){
    var url = "http://localhost:8080/usuario";

    

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

function montarGrid(listaUsuarios){

    var tabela = 
        "<table class='table table-striped'>"+
            "<thead>" +
                "<tr>" +
                    "<th scope='col'>ID</th>" +
                    "<th scope='col'>Nome</th>" +
                    "<th scope='col'>Email</th>" +
                    "<th scope='col'>Foto</th>" +
                "</tr>" +
            "</thead>" + 
            "<tbody>";
    
    for(cont = 0; cont < listaUsuarios.length; cont++){
        var usuario = listaUsuarios[cont];
        console.log(usuario)
        tabela += 
            "<tr>" +
                "<td>" + usuario.id + "</td>" +
                "<td>" + usuario.nome + "</td>" +
                "<td>" + usuario.email + "</td>" +
                "<td>" + usuario.foto + "</td>" +
            "</tr>";
    }

    tabela += "</tbody></table>";

    divDados.innerHTML = tabela;

}