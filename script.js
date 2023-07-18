//calculadora
function inserir(num){
    document.querySelector(".display").innerHTML += num
}
function limpar(){
    document.querySelector(".display").innerHTML = ""
}
function limparum(){ //no video original o rapaz usa o termo 'back' e o icone de menor.. não encontrei outro jeito de alterar isso sem mexer no layout
    let tela = document.querySelector('.display').innerHTML
    document.querySelector('.display').innerHTML = tela.substring(0, tela.length - 1)
}
function result(){
    let tela = document.querySelector('.display').innerHTML 
    if(tela){
        document.querySelector('.display').innerHTML = eval(tela)
    }else{
        document.querySelector('.display').innerHTML = "sem comando"
    }
}

//cronômetro
let second = 0
let minute = 0
let hour = 0

const buttonPlay = document.getElementById("play")
const buttonPause = document.getElementById("pause")
const buttonStop = document.getElementById("stop")
const timer = document.getElementById("timer")

let countTime

const eventsButton = {
    play(){
        countTime = setInterval(time, 1000)
    },
    pause(){
        clearInterval(countTime)
    },
    stop(){
        clearInterval(countTime)
        second = 0
        minute = 0
        hour = 0

        timer.innerHTML = `${formatTime(hour)}:${formatTime(minute)}:${formatTime(second)}`
    }
}
buttonPlay.addEventListener('click', eventsButton.play),
buttonPause.addEventListener('click', eventsButton.pause),
buttonStop.addEventListener('click', eventsButton.stop),

function formatTime(timer) {
    if(timer < 10){
        return `0${timer}`
    }else{
        return timer
    }
}

function time(){
    second++

    if(second === 60){
        minute += 1
        second = 0

        if(minute === 60){
            hour += 1
            minute = 0
        }
    }
    timer.innerHTML = `${formatTime(hour)}:${formatTime(minute)}:${formatTime(second)}`
}

//lista de tarefas

function add(){
    let li = document.createElement('LI')
    let input_value = document.form_main.task.value
    let input_text = document.createTextNode(input_value)

    li.appendChild(input_text)
    document.querySelector('ul').appendChild(li)
    document.form_main.task.value = ""

    createCloseButton(li)
}

function createCloseButton(li){
    let span = document.createElement('SPAN')
    let txt = document.createTextNode("  \u00D7")

    span.className = 'close'
    span.appendChild(txt)
    li.appendChild(span)

    span.onclick = () =>
    span.parentElement.style.display = 'none'
}

document.querySelectorAll('li').forEach(createCloseButton)
document.querySelector('ul').addEventListener('click', (e) => {
    if(e.target.tagName === 'LI')
    e.target.classList.toggle('checked')
})
// https://discord.com/channels/835773937265934388/1014956019367018627/1076497777066000404


// jogo da velha

const currentPlayer = document.querySelector(".currentPlayer");

let selected;
let player = "X"; //iniciando com o X
let positions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
]; //posições possiveis para ter um ganhador

function init(){
    selected = []; //inicia vazio

    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`; //inicia com o X

    document.querySelectorAll(".game button").forEach((item) => { //documento que seleciona todos os botoes da div game
        item.innerHTML = ""; //cada botão inicializado, inicia vazio, sem nenhum preenchimento quando atualiza a pagina 
        item.addEventListener("click", newMove); //emprega-se um evento ao clicar
    });
}

init();

function newMove(e) { //cria-se a função que recebe o evento 
    const index = e.target.getAttribute("data-i") //ao clicar no atributo colocado no html, retorna o valor do botao
    e.target.innerHTML = player; //passa a informação do player para o botão
    e.target.removeEventListener("click", newMove) //remove o evento clique do botão da função
    selected[index] = player; //armazena no array do botão os itens ja selecionados, o player x ou a bolinha, aquele em que for selecionado

    setTimeout(() => { //função que será executada mais abaixo
        check();
    }, [100]);

    player = player === "X" ? "O" : "X"; //depois disso troca-se o player
    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`; //a cada momento troca-se o current player, atribuindo um novo player
} 

function check(){ //executa ao final do escopo acima, linhas 150 e 151
    let playerLastMove = player === "X" ? "O" : "X"; //utiliza o ultimo player que jogou

    const items = selected //mapear os itens selecionados
    .map((item, i) => [item, i]) //gerando um novo array com x, o ou x e o index deste item
    .filter((item) => item[0] === playerLastMove) //filtro o novo array, verificando quais itens selecionados batem com o ultimo player
    .map((item) => item[1]); //mapear apenas o index

    for (pos of positions){
        if (pos.every((item) => items.includes(item))){
            alert("O jogador '" + playerLastMove + "' GANHOU ! õ//");
            init();
            return;
        }
    }

    if(selected.filter((item) => item).length === 9){
        alert("DEU EMPATE !");
        init();
        return;
    }
}

//há linhas em que ficam dando erro, imagino que por causa do evento de lista que se 'repete'
//linha 49 .. verificar o pq