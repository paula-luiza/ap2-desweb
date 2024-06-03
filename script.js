let dados;

const divPesquisa = document.createElement('div');
divPesquisa.style.textAlign = 'center';
divPesquisa.style.padding = '5px';

const inputPesquisa = document.createElement('input');
inputPesquisa.type = 'text';
inputPesquisa.name = 'pesquisa';

divPesquisa.appendChild(inputPesquisa);

document.body.appendChild(divPesquisa);

const conteudo = document.createElement('div');


document.body.appendChild(conteudo);

const montaCard = (entrada) => {
    const card = document.createElement('div');

    const imgContainer = document.createElement('div');
    
    const imagem = document.createElement('img');
    imagem.src = entrada.imagem;

    const posicao = document.createElement('p');
    posicao.innerHTML = entrada.posicao;

    const nome = document.createElement('p');
    nome.innerHTML = entrada.nome;

    const detalhes = document.createElement('p');
    detalhes.innerHTML = entrada.detalhes;
    
    const nascimento = document.createElement('p');
    nascimento.innerHTML = entrada.nascimento;

    card.appendChild(imgContainer);
    imgContainer.appendChild(imagem);
    card.appendChild(posicao);
    card.appendChild(nome);
    card.appendChild(detalhes);
    card.appendChild(nascimento);

    return card;
}


const pegaDados = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json()
    return dados;
}


pegaDados("https://botafogo-atletas.mange.li/2024-1/feminino").then(
    (entrada) => {
        dados = entrada;
        dados.forEach(
            (atleta) => {
                conteudo.appendChild(montaCard(atleta));
            }
        )
    });
