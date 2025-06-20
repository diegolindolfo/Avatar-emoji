document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generateBtn");
    const randomBtn = document.getElementById("randomBtn");
    const downloadBtn = document.getElementById("downloadBtn");
    const outputDiv = document.getElementById("output");
    const selects = document.querySelectorAll("select");

    // Função para gerar imagem (agora mais completa)
    function gerarImagem() {
        generateBtn.disabled = true;
        randomBtn.disabled = true;
        downloadBtn.style.display = 'none';
        outputDiv.innerHTML = '<div class="loader"></div>';

        const emocao = document.getElementById("emocao").value;
        const personagem = document.getElementById("personagem").value;
        const objeto = document.getElementById("objeto").value;

        const prompt = `Funko Pop style vinyl figure of a ${emocao} ${personagem}, ${objeto}, full body, chibi style, isolated on a plain white background, high detail, studio lighting, 3D render`;
        const description = `Avatar estilo Funko Pop de um ${personagem} ${emocao} ${objeto}`;

        const img = document.createElement("img");

        // Atributo essencial para permitir o download da imagem de outra origem
        img.crossOrigin = "anonymous";

        img.src = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
        img.alt = description;

        img.onload = function() {
            outputDiv.innerHTML = '';
            outputDiv.appendChild(img);
            generateBtn.disabled = false;
            randomBtn.disabled = false;
            downloadBtn.style.display = 'inline-block'; // Mostra o botão de download
        };

        img.onerror = function() {
            outputDiv.innerHTML = '❌ Ops! A API falhou. Tente uma combinação diferente ou aguarde um pouco!';
            generateBtn.disabled = false;
            randomBtn.disabled = false;
        };
    }

    // Função para selecionar opções aleatórias e gerar
    function gerarAleatorio() {
        selects.forEach(select => {
            const options = select.options;
            select.selectedIndex = Math.floor(Math.random() * options.length);
        });
        gerarImagem();
    }

    // Função para baixar a imagem usando um canvas
    function baixarImagem() {
        const imgElement = outputDiv.querySelector('img');
        if (!imgElement) {
            alert("Não há imagem para baixar!");
            return;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Define o tamanho do canvas igual ao da imagem carregada
        canvas.width = imgElement.naturalWidth;
        canvas.height = imgElement.naturalHeight;

        // Desenha a imagem no canvas
        ctx.drawImage(imgElement, 0, 0);

        // Cria um link temporário para o download
        const link = document.createElement('a');
        link.download = `${imgElement.alt.replace(/ /g, '_')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }

    // Atribui as funções aos eventos dos botões
    generateBtn.addEventListener("click", gerarImagem);
    randomBtn.addEventListener("click", gerarAleatorio);
    downloadBtn.addEventListener("click", baixarImagem);

    // Gera uma imagem aleatória assim que a página carrega
    gerarAleatorio();
});
