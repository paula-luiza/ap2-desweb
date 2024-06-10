const alvo = '02a3e1fc659a693124e09cc25a8b49249e126cbfa0dddf8f45d4dee4895bf81e';
const sal = '2';

document.getElementById('btn_login').onclick = () => {
    const entrada = document.getElementById('senha').value;
    const mensagem = document.getElementById('mensagem');
    if (hex_sha256(entrada + sal) === alvo){
        mensagem.innerHTML = "<h2>Senha correta.</h2>";
        sessionStorage.setItem('logado', 1);
        window.location.href = 'home.html';
    } else {
        mensagem.innerHTML = "<h2>Senha errada!!!</h2>";
    }
}