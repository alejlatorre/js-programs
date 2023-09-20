// Menu
const timeContainer = document.getElementById('timeContainer')
const rockPaperScissorsContainer = document.getElementById(
    'rockPaperScissorsContainer'
)
const snakeContainer = document.getElementById('snakeContainer')

const stopwatchBtn = document.getElementById('stopwatchBtn')
stopwatchBtn.addEventListener('click', () => {
    if (timeContainer.style.display == 'none') {
        timeContainer.style.display = 'block'
        rockPaperScissorsContainer.style.display = 'none'
        snakeContainer.style.display = 'none'
    } else {
        timeContainer.style.display = 'none'
    }
})

const rockPaperScissorsBtn = document.getElementById('rockPaperScissorsBtn')
rockPaperScissorsBtn.addEventListener('click', () => {
    if (rockPaperScissorsContainer.style.display == 'none') {
        rockPaperScissorsContainer.style.display = 'block'
        timeContainer.style.display = 'none'
        snakeContainer.style.display = 'none'
    } else {
        rockPaperScissorsContainer.style.display = 'none'
    }
})

const snakeGameBtn = document.getElementById('snakeGameBtn')
snakeGameBtn.addEventListener('click', () => {
    if (snakeContainer.style.display == 'none') {
        snakeContainer.style.display = 'block'
        rockPaperScissorsContainer.style.display = 'none'
        timeContainer.style.display = 'none'
    } else {
        snakeContainer.style.display = 'none'
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

// Snake game
const gameBoard = document.getElementById('gameBoard')
const ctx = gameBoard.getContext('2d')
const scoreText = document.getElementById('scoreText')
const startGameBtn = document.getElementById('startGameBtn')
const resetScoreBtn = document.getElementById('resetScoreBtn')
const gameWidth = gameBoard.width // That is why these vars were defined in html as properties in canvas
const gameHeight = gameBoard.height
const boardBackground = 'white'
const snakeColor = 'lightgreen'
const snakeBorder = 'black'
const foodColor = 'red'
const unitSize = 25
const gameSpeed = 75
let running = false
let xVelocity = unitSize
let yVelocity = 0
let foodX
let foodY
let score = 0
let snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 },
]

const gameStart = () => {
    running = true
    scoreText.textContent = score
    createFood()
    drawFood()
    nextTick()
}

const nextTick = () => {
    if (running) {
        setTimeout(() => {
            clearBoard()
            drawFood()
            moveSnake()
            drawSnake()
            checkGameOver()
            nextTick()
        }, gameSpeed)
    } else {
        displayGameOver()
    }
}

const clearBoard = () => {
    ctx.fillStyle = boardBackground
    ctx.fillRect(0, 0, gameWidth, gameHeight)
}

const createFood = () => {
    const randomFood = (min, max) => {
        const randomNumber =
            Math.round((Math.random() * (max - min) + min) / unitSize) *
            unitSize
        return randomNumber
    }
    foodX = randomFood(0, gameWidth - unitSize)
    foodY = randomFood(0, gameWidth - unitSize)
}
const drawFood = () => {
    ctx.fillStyle = foodColor
    ctx.fillRect(foodX, foodY, unitSize, unitSize)
}

const moveSnake = () => {
    const snakeHead = {
        x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity,
    }
    snake.unshift(snakeHead)
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score += 1
        scoreText.textContent = score
        createFood()
    } else {
        snake.pop()
    }
}
const drawSnake = () => {
    ctx.fillStyle = snakeColor
    ctx.strokeStyle = snakeBorder
    snake.forEach((snakePart) => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize)
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize)
    })
}

const changeDirection = (event) => {
    const keyPressed = event.keyCode
    const LEFT = 37
    const UP = 38
    const RIGHT = 39
    const DOWN = 40
    const goingUp = yVelocity == -unitSize
    const goingDown = yVelocity == unitSize
    const goingRight = xVelocity == unitSize
    const goingLeft = xVelocity == -unitSize

    switch (true) {
        case keyPressed == LEFT && !goingRight:
            xVelocity = -unitSize
            yVelocity = 0
            break
        case keyPressed == RIGHT && !goingLeft:
            xVelocity = unitSize
            yVelocity = 0
            break
        case keyPressed == UP && !goingDown:
            xVelocity = 0
            yVelocity = -unitSize
            break
        case keyPressed == DOWN && !goingUp:
            xVelocity = 0
            yVelocity = unitSize
            break
    }
}
const checkGameOver = () => {
    switch (true) {
        case snake[0].x < 0:
            running = false
            break
        case snake[0].x >= gameWidth:
            running = false
            break
        case snake[0].y < 0:
            running = false
            break
        case snake[0].y >= gameHeight:
            running = false
            break
    }
    for (let i = 1; i < snake.length; i += 1) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false
        }
    }
}
const displayGameOver = () => {
    ctx.font = '50px MV Boli'
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.fillText('GAME OVER!', gameWidth / 2, gameHeight / 2)
    running = false
}
const resetGame = () => {
    score = 0
    xVelocity = unitSize
    yVelocity = 0
    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 },
    ]
    gameStart()
}

window.addEventListener('keydown', changeDirection)

startGameBtn.addEventListener('click', gameStart)
resetScoreBtn.addEventListener('click', resetGame)
