document.addEventListener('DOMContentLoaded', function () {
  const tamanhoInput = document.getElementById('tamanho');
  const valorTamanho = document.getElementById('valor-tamanho');
  const displaySenha = document.getElementById('display-senha');
  const incluirMaiusculas = document.getElementById('incluir-maiusculas');
  const incluirMinusculas = document.getElementById('incluir-minusculas');
  const incluirNumeros = document.getElementById('incluir-numeros');
  const incluirEspeciais = document.getElementById('incluir-especiais');
  const botaoGerarSenha = document.getElementById('botao-gerar-senha');
  const botaoCopiarSenha = document.getElementById('botao-copiar-senha');
  const botaoApagarSenha = document.getElementById('botao-apagar-senha');

  // Função para atualizar o fundo com cores aleatórias
  function mudarCorDeFundo() {
    const corAleatoria = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`; // Cor aleatória em HSL
    document.body.style.backgroundColor = corAleatoria;
  }

  // Inicia a troca de cores automaticamente
  setInterval(mudarCorDeFundo, 2000); // Muda a cor a cada 2 segundos

  // Atualiza o valor do tamanho da senha no slider
  tamanhoInput.oninput = function () {
    valorTamanho.textContent = this.value;
    gerarSenha();
  };

  // Atualiza a senha quando qualquer checkbox é alterado
  [incluirMaiusculas, incluirMinusculas, incluirNumeros, incluirEspeciais].forEach(function (checkbox) {
    checkbox.onchange = gerarSenha;
  });

  // Gera uma nova senha ao clicar no botão
  botaoGerarSenha.onclick = function () {
    gerarSenha();
  };

  // Copia a senha gerada ao clicar no botão copiar
  botaoCopiarSenha.onclick = function () {
    copiarSenha();
  };

  // Apaga o campo de senha ao clicar no botão apagar
  botaoApagarSenha.onclick = function () {
    displaySenha.value = '';
  };

  // Função para gerar a senha
  function gerarSenha() {
    const tamanho = parseInt(tamanhoInput.value);

    const maiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const minusculas = 'abcdefghijklmnopqrstuvwxyz';
    const numeros = '0123456789';
    const especiais = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let caracteres = '';

    if (incluirMaiusculas.checked) caracteres += maiusculas;
    if (incluirMinusculas.checked) caracteres += minusculas;
    if (incluirNumeros.checked) caracteres += numeros;
    if (incluirEspeciais.checked) caracteres += especiais;

    if (caracteres === '') {
      displaySenha.value = '';
      return;
    }

    let senha = '';
    for (let i = 0; i < tamanho; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      senha += caracteres.charAt(indiceAleatorio);
    }

    displaySenha.value = senha;
  }

  // Função para copiar a senha
  function copiarSenha() {
    if (displaySenha.value) {
      displaySenha.select();
      document.execCommand('copy');
      alert('Senha copiada para a área de transferência!');
    } else {
      alert('Nenhuma senha para copiar!');
    }
  }

  // Gera uma senha automaticamente ao carregar a página
  gerarSenha();
});
