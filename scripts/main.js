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

// OVERLAY / MENU ---
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
theme.volume = 0.6
win.volume = 0.6
horizontal.volume = 0.55
vertical.volume = 0.32

audioArray.forEach(element => {
    return element = $('#' + element)
})

// Audio Control
function audioControl (audio) {
    audio.pause()
    audio.currentTime = 0
    audio.play()
}

// NEW GAME ---

// Names
let names = ["Ahmed", "Ali", "Almira", "Aysha", "Ebrahim", "Fatima", "Hasan", "Heba", "Husain", "Jawaher", "Khalid", "Latifa", "Manar", "Mariam Merza", "Maryam Ismail", "Maryam Alnajem", "Rawan", "Ruqaya", "Salman Hamad", "Salman Murtaza", "Sarah", "Saud", "Sayed", "Sumaya", "Waleed", "Zainab AbdulJalil", "Zainab Adel", "Zainab Mohammed", "Zainab Saeed"]

// New Game Function
function newGameStart() {
    localStorage.setItem("names", JSON.stringify(names))
    console.log(JSON.parse(localStorage.getItem("names")))
}

// START GAME ---
let gameWin = false

// Random Integer
function randomInt(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;   
}

let intGoal = randomInt(3, 50)

function startGame () {
    audioControl(theme)
    
    body.prepend("<div id='bar'></div>")
    let bar = $('#bar')

    bar.append("<button id='menu'>Menu</button>")
    let menu = $('#menu')
    
    menu.on("click", () => {
        window.location.reload()
    })

    bar.append(`<p id='amount'>${JSON.parse(localStorage.getItem("names")).length} Left</p>`)
    $('#amount').css("text-align", "right")

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
    return isOverlay = false, bar
}

// Buttons
if (isOverlay) {
    body.append("<div class='container'></div>")
    let container = $('.container')

    container.append("<button id='new-game'>New Game</button>")
    let newGame = $("#new-game")

    container.append("<button id='continue-game'>Continue Game</button>")
    let continueGame = $("#continue-game")

    newGame.on("click", () => {
        let response = confirm("New Game?")

        if (response) {
            console.log("Ok was pressed")

            newGameStart()
            startGame()
            overlay.remove()
            continueGame.remove()
            newGame.remove()
        } else {
            console.log("Cancel was pressed")
        }
    })

    continueGame.on("click", () => {
        startGame()
        overlay.remove()
        continueGame.remove()
        newGame.remove()
    })
}

// WIN CONDITION ---
let getNames = JSON.parse(localStorage.getItem("names"))

console.log(getNames)
let intName = randomInt(0, getNames.length - 1)

// Win Outcome
function winCondition() {
    if (intGoal === position) {
        let namesGet = localStorage.getItem("names")
        console.log(JSON.parse(namesGet)[intName])
        
        bar.append(`${JSON.parse(namesGet)[intName]}`)
        player.css("background-image", "url('/images/player-win.gif'")

        $('.container').append("<button id='skip-btn'>Skip</button>")
        let skipBtn = $('#skip-btn')

        $('.container').append("<button id='continue-btn'>Continue</button")
        let continueBtn = $('#continue-btn')

        skipBtn.on("click", () => {
            window.location.reload()
        })
        
        continueBtn.on("click", () => {
            let currentNames = JSON.parse(namesGet)
            console.log(currentNames)

            currentNames.splice(intName, 1)
            console.log(currentNames)

            localStorage.setItem("names", JSON.stringify(currentNames))
            window.location.reload()
        })

        theme.pause()
        audioControl(win)
        return gameWin = true
    }
}

// MOVEMENT ---
let position = 1
let posArray = [11, 21, 31, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]

// Horizontal Movement
function horizontalMove(leftValue, transformValue) {
    player.animate({ left: leftValue}, 80)
    player.css("transform", transformValue)
    audioControl(horizontal)
}

// Vertical Movement
function verticalMove(topValue, way) {
    player.animate({ top: topValue}, 50)
    player.effect("shake", {distance: 7, direction: way}, 100)
    audioControl(vertical)
}

// Player Filter Gray
function blockMove(way) {
    player.effect("shake", {distance: 8, direction: way}, 220)
    player.css("filter", "grayscale(100%)")

    setTimeout(function() {
        player.css("filter", "")
    }, 800)
    audioControl(thud)
}

// Actions
const action = {
    moveLeft() {
        if (!posArray.slice(0, 4).includes(position) && position !== 1 && !gameWin) {
            position--
            horizontalMove("-=10vw", "scaleX(-1)")
        } else if (!gameWin) {
            blockMove("left")
        }
        winCondition()
    },
    moveUp() {
        if (!(position <= 10) && !gameWin) {
            position -= 10
            verticalMove("-=10vw", "up")
        } else if (!gameWin) {
            blockMove("up")
        }
        winCondition()
    },
    moveRight() {
        if (position % 10 !== 0 && !gameWin) {
            position++
            horizontalMove("+=10vw", "")
        } else if (!gameWin) {
            blockMove("right")
        }
        winCondition()
    },
    moveDown() {
        if (!posArray.slice(3, 13).includes(position) && !gameWin) {
            position += 10
            verticalMove("+=10vw", "up")
        } else if (!gameWin) {
            blockMove("down")
        }
        winCondition()
    }
}