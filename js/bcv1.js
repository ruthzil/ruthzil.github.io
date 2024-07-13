function buscarDadosPorNome(name) {
    fetch(`http://ruthzil.com.br:5050/base/findByName/${name}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Não foi possível encontrar os dados.');
        }
        return response.json();
      })
      .then(data => {
        // Manipule os dados recebidos aqui, por exemplo, exiba-os na página
        exibirDados(data);
      })
      .catch(error => {
        console.error(error);
        // Manipule erros de maneira apropriada, como exibindo uma mensagem de erro na página.
      });
  }
  
  function exibirDados(data) {
    // Supondo que você tenha um elemento HTML com o id "resultado" onde deseja exibir os dados
    const resultadoElement = document.getElementById("resultado");
  
    // Limpe qualquer conteúdo existente no elemento
    resultadoElement.innerHTML = "";
  
    if (data.length === 0) {
      resultadoElement.textContent = "Nenhum dado encontrado.";
    } else {
      // Crie uma lista não ordenada (ul) para exibir os dados
      const ul = document.createElement("ul");
  
      data.forEach(item => {
        // Crie um item de lista (li) para cada objeto BaseDeConhecimento
        const li = document.createElement("li");
        li.textContent = `Nome: ${item.nome}, Disponibilidade: ${item.disponibilidade}`;
        ul.appendChild(li);
      });
  
      // Adicione a lista ao elemento "resultado"
      resultadoElement.appendChild(ul);
    }
  }
  
  // Para chamar a função e buscar os dados por um nome específico, você pode fazer o seguinte:
  const nomeBuscado = "NomeDesejado";
  buscarDadosPorNome(nomeBuscado);
  