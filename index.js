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
