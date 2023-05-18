// GRID ---
let body = $('body')
body.prepend("<div class='grid-container'></div>")

let gridContainer = $('.grid-container')
gridContainer.css("z-index", 0)
gridContainer.prepend("<div id='player'></div>")

let player = $('#player')
player.css("background-image", "url('/images/player.webp')")
player.css("z-index", 1)

for (let i = 1; i < 51; i++) {
    gridContainer.append(`<div class='grid-items item${i}'></div>`)
    $('#grid-item').css("border", "2px solid black")
}

// OVERLAY / MENU
let isOverlay = true

function showOverlay() {
    if (isOverlay) {
        body.prepend("<div id='overlay'></div>")
        let overlay = $('#overlay')
        overlay.css({"background-color": "rgba(128, 128, 128)", "height": "100vh", "width": "100vw", "z-index": 3, "position": "absolute", "left": 0, "top": 0})
    }
    return overlay
}
showOverlay()

// AUDIO ---
const audioArray = ["theme", "win", "thud", "horizontal", "vertical"]

audioArray.forEach(element => {
    const audio = new Audio("sounds/" + element + ".mp3")
    audio.id = element
    body.append(audio)
})

// Volume
theme.volume = 0.5
win.volume = 0.5
horizontal.volume = 0.55
vertical.volume = 0.32

console.log($('audio'))

audioArray.forEach(element => {
    return element = $('#' + element)
})

// START GAME ---

// Random Integer
function randomInt(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;   
}

let intGoal = randomInt(3, 50)

function startGame () {
    theme.pause()
    theme.currentTime = 0
    theme.play()

    let goal = '.item' + intGoal

    $(goal).css("border", "5px solid green")
    $(goal).css("z-index", 2)

    $(document).ready(function(){
        $(this).keydown(function(e) {
            e.preventDefault()
            if (e.keyCode == 37) {
                action.moveLeft()
            }
            if (e.keyCode == 38) {
                action.moveUp()
            }
            if (e.keyCode == 39) {
                action.moveRight()
            }
            if (e.keyCode == 40) {
                action.moveDown()
            }
        })
    })
    return isOverlay = false
}

console.log(isOverlay)

// startGame()

// Start Game Button
if (isOverlay) {
    body.append("<button id='start-game'>Start Game</button>")
    let start = $("#start-game")

    start.css({"position": "absolute", "z-index": 3, "top": "50vh", "left": "40vw", "width": "20vw", "height": "10vh", "border-radius": "20vw", "font-size": "30px",  "margin": 0})
    start.on("click", () => {
        startGame()
        overlay.remove()
        start.remove()
    })
}

// ACTIONS ---
let position = 1
let posArray = [11, 21, 31, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]
let gameWin = false

// Names
let names = ["Ahmed", "Ali", "Almira", "Aysha", "Ebrahim", "Fatima", "Hasan", "Heba", "Husain", "Jawaher", "Khalid", "Latifa"]
let intName = randomInt(0, names.length - 1)

// gameWin Condition
function winCondition() {
    if (intGoal === position) {
        body.append(`<p>${names[intName]}</p>`)
        player.css("background-image", "url('/images/player-win.gif'")
        theme.pause()
        win.pause()
        win.currentTime = 0
        win.play()
        return gameWin = true
    }
}

const action = {
    moveLeft() {
        if (!posArray.slice(0, 4).includes(position) && position !== 1 && !gameWin) {
            position--
            player.animate({ left: '-=10vw'}, 120)
            player.css("transform", "scaleX(-1)")
            horizontal.pause()
            horizontal.currentTime = 0
            horizontal.play()
        } else if (!gameWin) {
            player.effect("shake", {distance: 8, direction: "left"}, 200)
            player.css("filter", "grayscale(100%)")
            thud.pause()
            thud.currentTime = 0
            thud.play()
        }
        winCondition()
    },
    moveUp() {
        if (!(position <= 10) && !gameWin) {
            position -= 10
            player.animate({ top: "-=10vw"}, 80)
            player.effect("shake", {distance: 6, direction: "up"}, 100)
            vertical.pause()
            vertical.currentTime = 0
            vertical.play()
        } else if (!gameWin) {
            player.effect("shake", {distance: 8, direction: "up"}, 200)
            player.css("filter", "grayscale(100%)")
            thud.pause()
            thud.currentTime = 0
            thud.play()
        }
        winCondition()
    },
    moveRight() {
        if (position % 10 !== 0 && !gameWin) {
            position++
            player.animate({left: '+=10vw'}, 120)
            player.css("transform", "")
            horizontal.pause()
            horizontal.currentTime = 0
            horizontal.play()
        } else if (!gameWin) {
            player.effect("shake", {distance: 8, direction: "right"}, 200)
            player.css("filter", "grayscale(100%)")
            thud.pause()
            thud.currentTime = 0
            thud.play()
        }
        winCondition()
    },
    moveDown() {
        if (!posArray.slice(3, 13).includes(position) && !gameWin) {
            position += 10
            player.animate({ top: "+=10vw"}, 80)
            player.effect("shake", {distance: 6, direction: "up"}, 100)
            vertical.pause()
            vertical.currentTime = 0
            vertical.play()
        } else if (!gameWin) {
            player.effect("shake", {distance: 8, direction: "down"}, 200)
            player.css("filter", "grayscale(100%)")
            thud.pause()
            thud.currentTime = 0
            thud.play()
        }
        winCondition()
    }
}