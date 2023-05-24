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

// Random Integer
function randomInt(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;
}

// Goal
let goalArr = [12, 13, 14, 15, 16, 17, 18, 19, 22, 23, 24, 25, 26, 27, 28, 29, 32, 33, 34, 35, 36, 37, 38, 39]
let randomGoalIndex = randomInt(0, 23)
let intGoal = goalArr[randomGoalIndex]

let goal = '.item' + intGoal

// Enemies
let intEnemy = randomInt(4, 6)

for (let i = 0; i < intEnemy; i++) {
    let intEnemy2 = randomInt(2, 32) // Enemy Position
    let intEnemy3 = randomInt(1, 5) // Select Enemy Type
    if (intEnemy2 !== intGoal) {
        $(`.item${intEnemy2}`).css({"background-image": `url('/images/enemies/${intEnemy3}.gif')`, "background-size": "100%"})
    }
}

// OVERLAY / MENU ---
body.prepend("<div id='bar'></div>")
let bar = $('#bar')

bar.append(`<p id='amount'>${JSON.parse(localStorage.getItem("names")).length} People Left</p>`)
$('#amount').css({"position": "absolute", "right": "0.5vw", "top": "1vh", "z-index": 3})

let isOverlay = true

function showOverlay() {
    if (isOverlay) {
        body.prepend("<div id='overlay'></div>")
        let overlay = $('#overlay')
        overlay.css({"background-image": "url('/images/bg.jpeg')", "background-size": "100%", "height": "100vh", "width": "100vw", "z-index": 3, "position": "absolute", "left": 0, "top": 0})
    }
    return overlay
}
showOverlay()

// AUDIO ---
const audioArray = ["theme", "win", "horizontal", "vertical", "thud", "hurt"]

audioArray.forEach(element => {
    const audio = new Audio("sounds/" + element + ".mp3")
    audio.id = element
    body.append(audio)
})

// Volume
theme.volume = 0.35
horizontal.volume = 0.35
vertical.volume = 0.15
win.volume = 0.30
thud.volume = 0.8

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

function startGame () {
    $('#amount').remove()

    audioControl(theme)
    
    body.prepend("<div id='bar'></div>")
    let bar = $('#bar')

    bar.append("<button id='menu'>Menu</button>")
    let menu = $('#menu')
    
    menu.on("click", () => {
        window.location.reload()
    })

    bar.append(`<p id='amount'>${JSON.parse(localStorage.getItem("names")).length} People Left</p>`)
    $('#amount').css("text-align", "right")

    $(goal).css({"z-index": 2, "background-image": "url('/images/where.gif')", "background-size": "100%"})
    $(goal).attr("id", "goal")

    $(document).ready(function(){
        $(this).keydown(function(e) {
            e.preventDefault()
            if ((e.keyCode == 37 || e.keyCode == 65) && !gameWin) {
                action.moveLeft()
            }
            if ((e.keyCode == 38 || e.keyCode == 87) && !gameWin) {
                action.moveUp()
            }
            if ((e.keyCode == 39 || e.keyCode == 68) && !gameWin) {
                action.moveRight()
            }
            if ((e.keyCode == 40 || e.keyCode == 83) && !gameWin) {
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
        
        let response = confirm("Are you sure?")

        if (response) {
            newGameStart()
            startGame()
            overlay.remove()
            continueGame.remove()
            newGame.remove()
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
        $(goal).css({"background-image": "url('/images/border-win.gif')", "border-image": "url('/images/border-win.gif')"})

        let namesGet = localStorage.getItem("names")
        console.log(JSON.parse(namesGet)[intName])

        player.css("background-image", "url('/images/player-win.gif'")

        let container = $('.container')
        container.append("<p class='win-text'>You Win!</p>")
        
        // Win
        setTimeout(() => {
            body.append("<img class='win-screen' src='images/win.png'>")
            let winScreen = $('.win-screen')

            winScreen
            .hide()
            .css({"height": "100vh", "width": "100vw", "z-index": 4, "position": "absolute", "top": 0, "left": 0})
            .fadeIn(1000)

            // Buttons
            setTimeout(() => {
                container.append("<div class='btn-container'></div")
                let btnContainer = $('.btn-container')

                btnContainer.css({"display": "flex"})

                btnContainer.append("<button class='win-btns skip-btn'>Skip</button>")
                let skipBtn = $('.skip-btn')

                btnContainer.append("<button class='win-btns continue-btn'>Continue</button")
                let continueBtn = $('.continue-btn')

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
                

                container.css("justify-content", "end")
                
            }, 2500)

            $('#win-text').remove()

        }, 800)

        // Show Player
        setTimeout(() => {
            audioControl(horizontal)

            body.prepend("<div id='player'></div>")
            let player = $('#player')
            player
            .css({"background-image": "url('/images/player-win.gif')", "z-index": 6, "left": '-10vw', "top": "80vh", "height": "10vh", "width": "10vh", "background-size": "100%"})
            .animate({"left": "5vw"})

            let counter = 0

            setTimeout(()=> {
                const timer = setInterval(function (){
                    audioControl(horizontal)
                    player.animate({"left": "+=8vw"})
                    counter++
                    if (counter === 5){
                        clearInterval(timer)
                    }
                }, 380)
            }, 200)

        }, 1600)

        // Win Message
        setTimeout(() => {
            $('.win-text').remove()

            container.prepend((`<p class='win-message'>You saved <div class='student-name'>${JSON.parse(namesGet)[intName]}</div></p>`))
            container.prepend("<p class='win-message'>Congratulations Mr. catJam!</p>")

            container.css({"z-index": 10, "justify-content": "center"})


        }, 4300)

        // Dancers
        setTimeout(() => {
            // Dancer 1
            let randomDancer1 = randomInt(1, 3)
            body.append(`<img class='dancer1' src='/images/dancers/dancer${randomDancer1}.gif'>`)
            let dancer1 = $('.dancer1')
            dancer1.css({"z-index": 5, "position": "absolute", "left": "-13vw", "top": "73vh", "height": "10vw"})
            dancer1.animate({"left": "32vw"}, 18000)

            // Dancer 2
            let randomDancer2 = randomInt(4, 6)
            body.append(`<img class='dancer2' src='/images/dancers/dancer${randomDancer2}.gif'>`)
            let dancer2 = $('.dancer2')
            dancer2.css({"z-index": 5, "position": "absolute", "right": "-13vw", "top": "73vh", "height": "10vw"})
            dancer2.animate({"right": "30vw"}, 18000)

            // Coffin Dancer
            body.append(`<img class='coffinDancer' src='/images/dancers/dancer7.gif'>`)
            let coffinDancer = $('.coffinDancer')
            coffinDancer.css({"z-index": 4, "position": "absolute", "right": "-15vw", "top": "2vh", "height": "6vw"})
            coffinDancer.animate({"right": "110vw"}, 20000)
        }, 1500)

        theme.pause()
        audioControl(win)
        return gameWin = true
    }
}

// MOVEMENT ---
let position = 1
let posArray = [11, 21, 31, 41]

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

// Player Filter Gray (Wall)
function blockMove(way) {
    gridContainer.effect("shake", {distance: 8, direction: way}, 220)
    player.effect("shake", {distance: 8, direction: way}, 220)
    player.css("filter", "grayscale(100%)")

    setTimeout(function() {
        player.css("filter", "")
    }, 900)
    audioControl(thud)
}

// Player Filter Red (Enemy)
function blockEnemy(way, enemy) {
    gridContainer.effect("shake", {distance: 8, direction: way}, 220)
    player.css("filter", "hue-rotate(320deg) contrast(200%)")

    setTimeout(function() {
        player.css("filter", "hue-rotate(0deg)")
    }, 250)
    audioControl(hurt)
    audioControl(thud)

    enemy.css("border", "5px solid red")

    setTimeout(() => {
        enemy.css("border", "1px solid rgb(215, 214, 214)")
    }, 200)
}

// Actions
const action = {
    moveLeft() {
        if (!posArray.slice(0, 4).includes(position) && position !== 1 && !gameWin && !($(`.item${position - 1}`).css("background-image").includes("enemies"))) {
            console.log($(`.item${position - 1}`).css("background-image"))
            position--
            horizontalMove("-=10vw", "scaleX(-1)")
        } else if (position !== 1 && (!gameWin && ($(`.item${position - 1}`).css("background-image").includes("enemies")))) {
            blockEnemy("left", $(`.item${position - 1}`))
        } else if (!gameWin) {
            blockMove("left")
        }
        winCondition()
    },
    moveUp() {
        if (!(position <= 10) && !gameWin && !($(`.item${position - 10}`).css("background-image").includes("enemies"))) {
            position -= 10
            verticalMove("-=10vw", "up")
        } else if (position > 10 && !gameWin && ($(`.item${position - 10}`).css("background-image").includes("enemies"))) {
            blockEnemy("up", $(`.item${position - 10}`))
        } else if (!gameWin) {
            blockMove("up")
        }
        winCondition()
    },
    moveRight() {
        if (position % 10 !== 0 && !gameWin && !($(`.item${position + 1}`).css("background-image").includes("enemies"))) {
            position++
            horizontalMove("+=10vw", "")
        } else if (position % 10 !== 0 && !gameWin && ($(`.item${position + 1}`).css("background-image").includes("enemies")))  {
            blockEnemy("right", $(`.item${position + 1}`))
        } else if (!gameWin) {
            blockMove("right")
        }
        winCondition()
    },
    moveDown() {
        if (!(position >= 41) && !gameWin && !($(`.item${position + 10}`).css("background-image").includes("enemies"))) {
            position += 10
            verticalMove("+=10vw", "up")
        } else if (position < 41 && !gameWin && ($(`.item${position + 10}`).css("background-image").includes("enemies"))) {
            blockEnemy("down", $(`.item${position + 10}`))
        } else if (!gameWin) {
            blockMove("down")
        }
        winCondition()
    }
}