// Menu
const timeContainer = document.getElementById('timeContainer')
const rockPaperScissorsContainer = document.getElementById(
    'rockPaperScissorsContainer'
)

const stopwatchBtn = document.getElementById('stopwatchBtn')
stopwatchBtn.addEventListener('click', () => {
    if (timeContainer.style.display == 'none') {
        timeContainer.style.display = 'block'
        rockPaperScissorsContainer.style.display = 'none'
    } else {
        timeContainer.style.display = 'none'
    }
})

const rockPaperScissorsBtn = document.getElementById('rockPaperScissorsBtn')
rockPaperScissorsBtn.addEventListener('click', () => {
    if (rockPaperScissorsContainer.style.display == 'none') {
        rockPaperScissorsContainer.style.display = 'block'
        timeContainer.style.display = 'none'
    } else {
        rockPaperScissorsContainer.style.display = 'none'
    }
})

// Stopwatch
const timeDisplay = document.getElementById('timeDisplay')
const startBtn = document.getElementById('startBtn')
const pauseBtn = document.getElementById('pauseBtn')
const resetBtn = document.getElementById('resetBtn')

let startTime = 0
let elapsedTime = 0
let currentTime = 0
let paused = true
let intervalId
let hrs = 0
let mins = 0
let secs = 0

const pad = (unit) => {
    return ('0' + unit).length > 2 ? unit : '0' + unit
}

const updateTime = () => {
    elapsedTime = Date.now() - startTime

    secs = Math.floor((elapsedTime / 1000) % 60)
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60)
    hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60)

    secs = pad(secs)
    mins = pad(mins)
    hrs = pad(hrs)

    timeString = `${hrs}:${mins}:${secs}`
    timeDisplay.textContent = timeString
    console.log(timeString)
}

startBtn.addEventListener('click', () => {
    if (paused) {
        paused = false
        startTime = Date.now() - elapsedTime
        intervalId = setInterval(updateTime, 1000)
    }
})
pauseBtn.addEventListener('click', () => {
    if (!paused) {
        paused = true
        elapsedTime = Date.now() - startTime
        clearInterval(intervalId)
    }
})
resetBtn.addEventListener('click', () => {
    paused = true
    clearInterval(intervalId)
    startTime = 0
    elapsedTime = 0
    currentTime = 0
    hrs = 0
    mins = 0
    secs = 0
    timeDisplay.textContent = '00:00:00'
})

// Rock, paper and scissors
const playerText = document.getElementById('playerText')
const computerText = document.getElementById('computerText')
const resultText = document.getElementById('resultText')
const choiceBtns = document.getElementsByClassName('choiceBtn')

choiceBtnsArray = [...choiceBtns] // Convert to array

let player
let computer
let result

const computerOptions = {
    1: 'ROCK',
    2: 'PAPER',
    3: 'SCISSORS',
}

const computerTurn = () => {
    const randNum = Math.floor(Math.random() * 3) + 1
    computer = computerOptions[randNum]
}

const checkWinner = () => {
    if (player == computer) {
        return 'Draw!'
    } else if (computer == 'ROCK') {
        return player == 'PAPER' ? 'You win!' : 'You lose!'
    } else if (computer == 'PAPER') {
        return player == 'SCISSORS' ? 'You win!' : 'You lose!'
    } else if (computer == 'SCISSORS') {
        return player == 'ROCK' ? 'You win!' : 'You lose!'
    }
}

choiceBtnsArray.forEach((button) => {
    button.addEventListener('click', () => {
        player = button.textContent
        computerTurn()
        playerText.textContent = `Player: ${player}`
        computerText.textContent = `Computer: ${computer}`
        resultText.textContent = checkWinner()
    })
})
