document.getElementById("btn-buscar").addEventListener("click", async () => {
  const cepInput = document.getElementById("cep");
  const cep = cepInput.value.replace(/\D/g, "");
  const erroDiv = document.getElementById("erro");
  const resultadoDiv = document.getElementById("resultado");

  erroDiv.innerText = "";
  resultadoDiv.style.display = "none";

  if (cep.length !== 8) {
    erroDiv.innerText = "Digite um CEP válido com 8 números.";
    return;
  }

  // Feedback visual de carregamento
  const btn = document.getElementById("btn-buscar");
  btn.innerText = "...";
  btn.disabled = true;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      erroDiv.innerText = "CEP não encontrado.";
    } else {
      document.getElementById("logradouro").innerText = data.logradouro || "-";
      document.getElementById("bairro").innerText = data.bairro || "-";
      document.getElementById("localidade").innerText = data.localidade;
      document.getElementById("uf").innerText = data.uf;
      resultadoDiv.style.display = "block";
    }
  } catch (error) {
    erroDiv.innerText = "Erro ao consultar serviço.";
  } finally {
    btn.innerText = "Pesquisar";
    btn.disabled = false;
  }
});
