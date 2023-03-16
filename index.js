// Pages
// Design all pages, figure out how you want everything before you start coding
// About
// Projects
// why i built this portfolio maybe include in projects
// Favorite Music and Movies
// Future coding things page
// Obstacles page, with fighting if possible
// Contacts page

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const platform = new Image();
platform.src = './images/kendrickdamn.jpg'

const playerPic = new Image();
playerPic.src = './images/player.png'

const introPic = new Image();
introPic.src = './images/background.png'

canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 0.5


class Intro {
    constructor(x, y) {
        this.position = {
            x: 0,
            y: 0
        }
        this.width = 1910,
        this.height = 950
        this.introPic = introPic
    }
    
    draw() {
        c.drawImage(this.introPic, this.position.x, this.position.y, this.width, this.height)
    }
}
    
class Word {
    constructor({x, y, sentence}) {
        this.sentence = sentence
        this.position = {
            x: x,
            y: y
        }
    }
draw() {
    c.fillStyle = 'blue'
    c.fillText(this.sentence, this.position.x, this.position.y)
}
    
}

class Player {
    constructor() {
        this.position = {
            x: 1000,
            y: 500
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        this.width = playerPic.width
        this.height = playerPic.height

        this.playerPic = playerPic
    }

    draw() {
        c.drawImage(this.playerPic, this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        this.draw()
        this.velocity.y += gravity
        if(this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        } else {this.velocity.y = 0}

    }
    
}

const keys = {
    right: { 
        pressed: false
    },
    left: {
        pressed: false
    }
}

class Platform {
    constructor({x, y}) {
        this.position = {
            x: x,
            y: y
        }
        
        this.width = platform.width
        this.height = 20
        this.platform = platform
    }

    

    draw() {
        c.drawImage(this.platform, this.position.x, this.position.y)
    }
}

const words = [new Word({x: 1000, y:20, sentence:'About'}), new Word({x: 1000, y: 30, 
    sentence: 'My name is Sathes Bala, I am currently working in the restaurant industry, and find it awesome and a lot of fun, but I would love to move on to a field where I get to learn something new everyday and have a better worklife balance, which is why I got in to coding.'

})]
const intros = [new Intro()]
const player = new Player()
const platforms = [new Platform({x: 1255, y: 560}), new Platform({x: 3555, y: 300})]

let scrollOffset = 0

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0,0, canvas.width, canvas.height)
    intros.forEach(intro => {
        intro.draw()
    })
    words.forEach(word => {
        word.draw()
    })
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })
    
    if(keys.right.pressed
        && player.position.x < 400
        ) {
        player.velocity.x = 5
    } else if(keys.left.pressed && player.position.x > 100) {player.velocity.x = -5} 
    else {
        player.velocity.x = 0

            
            if(keys.right.pressed) {
                console.log(player.x)
                scrollOffset += 5
                platforms.forEach(platform => {
                    platform.position.x -= 25
                })

            } else if (keys.left.pressed) {
                scrollOffset -=5

                platforms.forEach(platform => {
                    platform.position.x += 25
                })
            }

            if(keys.right.pressed) {
                scrollOffset += 5
                intros.forEach(intro => {
                    intro.position.x -= 25
                })
            } else if (keys.left.pressed) {
                scrollOffset -=5
                intros.forEach(intro => {
                    intro.position.x += 25
                })

            }
    }

// platform collision detection
    platforms.forEach(platform => {
        if (player.position.y + player.height 
            <= platform.position.y && 
            player.position.y + player.height + player.velocity.y
            >= platform.position.y && player.position.x + player.width 
            >= platform.position.x 
            && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
        }
    })

    if(scrollOffset > 2000){
        console.log('You Win')
    }
}

animate()


addEventListener('keydown', ({keyCode}) => { 
switch (keyCode) {
    case 65: 
    keys.left.pressed = true
    break

    case 83: 
    break
    
    case 68: 
    keys.right.pressed = true
    break

    case 87: 
    player.velocity.y -= 20
    break
}
})

addEventListener('keyup', ({keyCode}) => { 
    switch (keyCode) {
        case 65: 
        keys.left.pressed = false
        break
        
        case 68: 
        keys.right.pressed = false
        break
    }
    })