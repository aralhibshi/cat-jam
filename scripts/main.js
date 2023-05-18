// GRID ---
let body = $('body')
body.prepend("<div class='grid-container'></div>")

let gridContainer = $('.grid-container')
gridContainer.css("z-index", 1)
gridContainer.prepend("<div id='player'></div>")

let player = $('#player')
player.css("background-image", "url('/images/player.webp')")
player.css("z-index", 2)

for (let i = 1; i < 51; i++) {
    gridContainer.append(`<div class='grid-items item${i}'></div>`)
    $('#grid-item').css("border", "2px solid black")
}

// OVERLAY / MENU
let showOverlay = true

function overlay() {
    if (showOverlay) {
        body.prepend("<div id='overlay'></div>")
        let overlay = $('#overlay')

        overlay
        .css("background-color", "gray")
        .css("height", "100%")
        .css("width", "100%")
        .css("z-index", "2")
    }
}
overlay()

// AUDIO ---
const audioArray = ["theme", "thud", "hop"]

audioArray.forEach(element => {
    const audio = new Audio("sounds/" + element + ".mp3")
    audio.id = element
    body.append(audio)
})

// Volume
theme.volume = 0.4
hop.volume = 0.25

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
    $(goal).css("z-index", 1)

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
}

// startGame()

// ACTIONS ---
let position = 1
let posArray = [11, 21, 31, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]
let win = false

// Names
let names = ["Ahmed", "Ali", "Almira", "Aysha", "Ebrahim", "Fatima", "Hasan", "Heba", "Husain", "Jawaher", "Khalid", "Latifa"]
let intName = randomInt(0, names.length - 1)

// Win Condition
function winCondition() {
    if (intGoal === position) {
        body.append(`<p>${names[intName]}</p>`)
        player.css("background-image", "url('/images/player-win.gif'")
        return win = true
    }
}

const action = {
    moveLeft() {
        if (!posArray.slice(0, 4).includes(position) && position !== 1 && !win) {
            position--
            player.animate({ left: '-=10vw'}, 120)
            player.css("transform", "scaleX(-1)")
        } else if (!win) {
            player.effect("shake", {distance: 8, direction: "left"}, 200)
            player.css("filter", "grayscale(100%)")
            thud.pause()
            thud.currentTime = 0
            thud.play()
        }
        winCondition()
    },
    moveUp() {
        if (!(position <= 10) && !win) {
            position -= 10
            player.animate({ top: "-=10vw"}, 120)
            player.effect("shake", {distance: 5, direction: "up"}, 100)
            hop.pause()
            hop.currentTime = 0
            hop.play()
        } else if (!win) {
            player.effect("shake", {distance: 8, direction: "up"}, 200)
            player.css("filter", "grayscale(100%)")
            thud.pause()
            thud.currentTime = 0
            thud.play()
        }
        winCondition()
    },
    moveRight() {
        if (position % 10 !== 0 && !win) {
            position++
            player.animate({left: '+=10vw'}, 120)
            player.css("transform", "")
        } else if (!win) {
            player.effect("shake", {distance: 8, direction: "right"}, 200)
            player.css("filter", "grayscale(100%)")
            thud.pause()
            thud.currentTime = 0
            thud.play()
        }
        winCondition()
    },
    moveDown() {
        if (!posArray.slice(3, 13).includes(position) && !win) {
            position += 10
            player.animate({ top: "+=10vw"}, 120)
            player.effect("shake", {distance: 5, direction: "up"}, 100)
            hop.pause()
            hop.currentTime = 0
            hop.play()
        } else if (!win) {
            player.effect("shake", {distance: 8, direction: "down"}, 200)
            player.css("filter", "grayscale(100%)")
            thud.pause()
            thud.currentTime = 0
            thud.play()
        }
        winCondition()
    }
}