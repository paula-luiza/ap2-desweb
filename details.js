const montaCard = (entrada) => {
    const card = document.createElement('article');
    card.className = 'article';

    card.dataset.id = entrada.id;
    card.dataset.elenco = entrada.elenco;
    card.dataset.nome = entrada.nome;
    card.dataset.posicao = entrada.posicao;
    card.dataset.imagem = entrada.imagem;
    card.dataset.detalhes = entrada.detalhes;
    card.dataset.nomeCompleto = entrada.nome_completo;
    card.dataset.nascimento = entrada.nascimento;
    card.dataset.altura = entrada.altura;
    card.dataset.n_jogos = entrada.n_jogos;
    card.dataset.naturalidade = entrada.naturalidade;
    card.dataset.no_botafogo_desde = entrada.no_botafogo_desde;

   
    const imgContainer = document.createElement('div');
    imgContainer.className = 'img_container_article';

    const imagem = document.createElement('img');
    imagem.className = 'img_article';
    imagem.src = entrada.imagem;
    imagem.alt = `Foto de ${entrada.nome}`;

    const detContainer = document.createElement('div');
    detContainer.className = 'detail_container';

    const posicao = document.createElement('p');
    posicao.className = 'posicao_article';
    posicao.innerHTML = `${entrada.posicao}`;

    const nome = document.createElement('p');
    nome.className = 'nome_article';
    nome.innerHTML = `${entrada.nome}`;

    const detalhes = document.createElement('p');
    detalhes.className = 'detalhes_article';
    detalhes.innerHTML = entrada.detalhes;  

    const n_jogos = document.createElement('p');
    n_jogos.className = 'jogos_article';
    n_jogos.innerHTML = entrada.n_jogos;  

    const naturalidade = document.createElement('p');
    naturalidade.className = 'naturalidade';
    naturalidade.innerHTML = entrada.naturalidade;  

    const no_bota = document.createElement('p');
    no_bota.className = 'no_botafogo';
    no_bota.innerHTML = entrada.no_botafogo_desde; 

    const nascimento = document.createElement('p');
    nascimento.className = 'nascimento_article';
    nascimento.innerHTML = `${entrada.nascimento} | Elenco: ${entrada.elenco} | Altura: ${entrada.altura}`;

    const voltar = document.createElement('button');
    voltar.className = 'voltar_button';
    voltar.innerHTML = 'Voltar';
    voltar.onclick = () => {
        window.location.href = 'home.html'
    }

    card.appendChild(imgContainer);
    imgContainer.appendChild(imagem);
    card.appendChild(detContainer);
    detContainer.appendChild(nome);
    detContainer.appendChild(posicao);
    detContainer.appendChild(detalhes);
    detContainer.appendChild(n_jogos);
    detContainer.appendChild(naturalidade);
    detContainer.appendChild(no_bota);
    detContainer.appendChild(nascimento);
    detContainer.appendChild(voltar);


    return card;
}

const acha_cookie = ( chave ) => {
    const array_cookies = document.cookie.split("; ");
    const procurado = array_cookies.find(
        ( e ) => e.startsWith(`${chave}=`))
    return procurado?.split('=')[1];
}

async function AtletaPorId(id) {
    const response = await fetch(`https://botafogo-atletas.mange.li/2024-1/${id}`);
    const data = await response.json();
    return data;
}


if (sessionStorage.getItem('logado')){
    
    let obj = {}

    const tamanhoLocalStorage = localStorage.length;

    const array_cookies = document.cookie.split("; ");
    for (const par of array_cookies){
    const partes = par.split('=');
    obj[partes[0]] = partes[1];
    }

    obj = JSON.parse(localStorage.getItem('atleta'));

    const parametros = new URLSearchParams(window.location.search);
    obj.alturaPelaUrl = parametros.get('altura');
    obj.elencoPelaUrl = parametros.get('elenco');

    const url = new URLSearchParams(window.location.search);
    const idAtleta = url.get('id');
    

    if (idAtleta > 60) {
        const erro = document.createElement('h3');
        erro.className = 'msg_erro';
        erro.innerHTML = 'Oops! Atleta não encontrado :(';
        document.body.appendChild(erro);
    } else {
        card = montaCard(obj);
        document.body.appendChild(card);
    }

    document.getElementById('logout').onclick = () => {
        sessionStorage.removeItem('logado');
        window.location.href = 'index.html';
    };
    
    window.onload = () => {

        const novaId = new URLSearchParams(window.location.search).get('id');
        if (novaId !== card.dataset.id) {
            card.remove();
            document.cookie = ''
            AtletaPorId(novaId).then(data => {
                obj = data;
                card = montaCard(obj);
                document.body.appendChild(card);
            });
        }
    };


} else {
    const autorizacao = document.createElement('h3');
    autorizacao.className = 'msg_deslogado'
    autorizacao.innerHTML = 'Você deve estar logado para acessar esta página.';
    document.body.appendChild(autorizacao);

    document.getElementById('logout').onclick = () => {
        sessionStorage.removeItem('logado');
        window.location.href = 'index.html';
    };

}



