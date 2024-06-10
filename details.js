const montaCard = (entrada) => {
    const card = document.createElement('article');
    card.style.display = 'grid';
    card.style.gridTemplateColumns = '1fr 2fr';
    card.style.gridTemplateAreas = `
    "a1 a2"
    "a1 a3"
    "a4 a4"
    "a5 a5"
    `;
    card.style.width = '30rem';
    card.style.border = 'solid';
    card.style.padding = '.3rem';

    card.dataset.id = entrada.id;
    card.dataset.elenco = entrada.elenco;
    card.dataset.nome = entrada.nome;
    card.dataset.posicao = entrada.posicao;
    card.dataset.imagem = entrada.imagem;
    card.dataset.detalhes = entrada.detalhes;
    card.dataset.nomeCompleto = entrada.nome_completo;
    card.dataset.nascimento = entrada.nascimento;
    card.dataset.altura = entrada.altura;

   
    const imgContainer = document.createElement('div');
    imgContainer.style.gridArea = 'a1';
    imgContainer.style.display = 'flex';
    imgContainer.style.alignItems = 'center';
    imgContainer.style.justifyContent = 'center';

    const imagem = document.createElement('img');
    imagem.src = entrada.imagem;
    imagem.alt = `Foto de ${entrada.nome}`;
    imagem.style.width = '7rem';
    imagem.style.height = '7rem';
    imagem.style.borderRadius = '50%';
    imagem.style.objectFit = 'cover';
    imagem.style.objectPosition = 'top';

    const posicao = document.createElement('p');
    posicao.innerHTML = `Posição: ${entrada.posicao}`;
    posicao.style.cssText = `
        grid-area: a2;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;
    `;
    /*posicao.style.gridArea = 'a2';
    posicao.style.display = 'flex';
    posicao.style.alignItems = 'center';
    posicao.style.justifyContent = 'center';
    posicao.style.textTransform=  'uppercase';*/

    const nome = document.createElement('p');
    nome.innerHTML = `Nome: ${entrada.nome}`;
    /*nome.className = 'nome';*/
    nome.style.gridArea = 'a3';
    nome.style.display = 'flex';
    nome.style.alignItems = 'center';
    nome.style.justifyContent = 'center';
    nome.style.fontWeight = 'bold';

    const detalhes = document.createElement('p');
    detalhes.innerHTML = entrada.detalhes;
    detalhes.style.gridArea = 'a4';
    

    const nascimento = document.createElement('p');
    nascimento.innerHTML = `${entrada.nascimento} | Elenco: ${entrada.elencoPelaUrl} | Altura: ${entrada.alturaPelaUrl}`;
    nascimento.style.gridArea = 'a5';

    card.appendChild(imgContainer);
    imgContainer.appendChild(imagem);
    card.appendChild(posicao);
    card.appendChild(nome);
    card.appendChild(detalhes);
    card.appendChild(nascimento);

    return card;
}


if (sessionStorage.getItem('logado')){
    
    let obj = {}

    obj = JSON.parse(localStorage.getItem('atleta'));

    const parametros = new URLSearchParams(window.location.search);
    obj.alturaPelaUrl = parametros.get('altura');
    obj.elencoPelaUrl = parametros.get('elenco');

    document.body.appendChild(montaCard(obj));

    document.getElementById('logout').onclick = () => {
        sessionStorage.removeItem('logado');
        window.location.href = 'index.html';
    };
}



