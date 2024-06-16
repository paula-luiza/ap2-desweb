let dados;

const divPesquisa = document.createElement('div');
divPesquisa.className = 'div_pesquisa'

const inputPesquisa = document.createElement('input');
inputPesquisa.className = 'pesquisa_input'
inputPesquisa.type = 'text';
inputPesquisa.name = 'pesquisa';

divPesquisa.appendChild(inputPesquisa);

document.body.appendChild(divPesquisa);


const conteudo = document.createElement('div');
conteudo.className = 'conteudo';
//conteudo.innerHTML = 'carregando...';

document.body.appendChild(conteudo);

const botaoElencoFem = document.getElementById('btn_fem','btn_fem2');
const botaoElencoMasc = document.getElementById('btn_masc');
const botaoElencoAll = document.getElementById('btn_all');

const select = document.getElementById('dropdown_btn')


const montaCard = (entrada) => {
    const card = document.createElement('div');
    card.className = 'card';

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
    imgContainer.className = 'img_container';

    const imagem = document.createElement('img');
    imagem.className = 'img_atleta'
    imagem.src = entrada.imagem;
    imagem.alt = `Foto de ${entrada.nome}`;

    const posicao = document.createElement('p');
    posicao.className = 'posicao'
    posicao.innerHTML = entrada.posicao;

    const nome = document.createElement('p');
    nome.className = 'nome_atleta'
    nome.innerHTML = entrada.nome;

    const detalhes = document.createElement('p');
    detalhes.className = 'detalhes_atleta'
    detalhes.innerHTML = entrada.detalhes;

    const nascimento = document.createElement('p');
    nascimento.className = 'nascimento_atleta'
    nascimento.innerHTML = entrada.nascimento;

    card.appendChild(imgContainer);
    imgContainer.appendChild(imagem);
    card.appendChild(posicao);
    card.appendChild(nome);
    card.appendChild(detalhes);
    card.appendChild(nascimento);

    card.onclick = handleClick;

    return card;
}


inputPesquisa.onkeyup = (ev) => {
    console.log(ev.target.value);
    
    if (ev.target.value.length > 3 || ev.target.value.length == 0){
        const filtrado = dados.filter(
            (elemento) => {
                const estaNoNome = elemento.nome.toLowerCase().includes(ev.target.value.toLowerCase());
                const estaNaPosicao = elemento.posicao.toLowerCase().includes(ev.target.value.toLowerCase());
                return estaNoNome || estaNaPosicao;
            }
        )
    
        conteudo.innerHTML = '';
    
        filtrado.forEach(
            (atleta) => {
                conteudo.appendChild(montaCard(atleta));
            }
        )
    }

    
}

const handleClick = ( evento ) => {
    const card = evento.target.closest('div'); 
    for (const propriedade in card.dataset){
        
        //cookies
        document.cookie = `${propriedade}=${card.dataset[propriedade]}`;

        //localStorage item por item
        //localStorage.setItem(propriedade, card.dataset[propriedade]);

    }


    localStorage.setItem('atleta', JSON.stringify(card.dataset))

    window.location.href = `detalhes.html?id=${card.dataset.id}`;
}

const acha_cookie = ( chave ) => {
    const array_cookies = document.cookie.split("; ");
    const procurado = array_cookies.find(
        ( e ) => e.startsWith(`${chave}=`))
    return procurado?.split('=')[1];
}


const pegaDados = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json()
    return dados;
}

const carregaDados = async (url) => {
    pegaDados(url).then(
        (entrada) => {
            dados = entrada;
            conteudo.innerHTML = '';
            dados.forEach(
                (atleta) => {
                    conteudo.appendChild(montaCard(atleta));
                }
            )
        });
    
}


if (sessionStorage.getItem('logado')){
    
    botaoElencoFem.onclick = (ev) => {
        carregaDados('https://botafogo-atletas.mange.li/2024-1/feminino')
    }
    
    botaoElencoMasc.onclick = (ev) => {
        carregaDados('https://botafogo-atletas.mange.li/2024-1/masculino')
    }
    
    botaoElencoAll.onclick = (ev) => {
        carregaDados('https://botafogo-atletas.mange.li/2024-1/all')
    }

    document.getElementById('logout').onclick = () => {
        sessionStorage.removeItem('logado');
        window.location.href = 'index.html';
    };

    select.onchange = (e) => {

        const valor = e.target.value;

        if (valor === 'feminino'){
            carregaDados('https://botafogo-atletas.mange.li/2024-1/feminino');
        } else if (valor === 'masculino'){
            carregaDados('https://botafogo-atletas.mange.li/2024-1/masculino');
        } else if (valor === 'all'){
            carregaDados('https://botafogo-atletas.mange.li/2024-1/all');
        }
    }

}

console.log('síncrono')