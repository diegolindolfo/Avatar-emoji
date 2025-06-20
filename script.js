document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generateBtn");
    const randomBtn = document.getElementById("randomBtn");
    const downloadBtn = document.getElementById("downloadBtn");
    const outputDiv = document.getElementById("output");
    const selects = document.querySelectorAll("select");

    // Função para gerar imagem (com prompt de EMOJI)
    function gerarImagem() {
        generateBtn.disabled = true;
        randomBtn.disabled = true;
        downloadBtn.style.display = 'none';
        outputDiv.innerHTML = '<div class="loader"></div>';

        // Pegando os valores das novas categorias
        const conceito = document.getElementById("conceito").value;
        const expressao = document.getElementById("expressao").value;
        const estilo = document.getElementById("estilo").value;

        // O NOVO PROMPT: focado em criar um emoji de alta qualidade
        const prompt = `A single iOS emoji of a ${conceito} that is ${expressao}, ${estilo}, high detail, vibrant colors, simple clean vector art, isolated on a plain white background`;
        
        const description = `Emoji de um ${conceito} ${expressao} no estilo ${estilo}`;

        const img = document.createElement("img");
        
        img.crossOrigin = "anonymous";
        img.src = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
        img.alt = description;

        img.onload = function() {
            outputDiv.innerHTML = '';
            outputDiv.appendChild(img);
            generateBtn.disabled = false;
            randomBtn.disabled = false;
            downloadBtn.style.display = 'inline-block';
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

    // Função para baixar a imagem (continua a mesma)
    function baixarImagem() {
        const imgElement = outputDiv.querySelector('img');
        if (!imgElement) {
            alert("Não há imagem para baixar!");
            return;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = imgElement.naturalWidth;
        canvas.height = imgElement.naturalHeight;

        ctx.drawImage(imgElement, 0, 0);

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
