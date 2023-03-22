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
buttonPlay.addEventListener('click', eventsButton.play)
buttonPause.addEventListener('click', eventsButton.pause)
buttonStop.addEventListener('click', eventsButton.stop)

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
