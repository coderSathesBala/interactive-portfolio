// Pages

// 1) Background and name
// 2) About
// 3) Projects
// 4) Favorite Music and Movies
// 5) Future coding things page
// 6) Obstacles page, with fighting if possible
// 7) Contacts page

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const platform = new Image();
platform.src = './images/platform.png'

const hills = new Image();
hills.src = './images/hills.png'

const playerPic = new Image();
playerPic.src = './images/player.png'

const background = new Image();
background.src = './images/background.png'

canvas.width = innerWidth
canvas.height = innerHeight


const gravity = 0.5
class Player {
    constructor() {
        this.position = {
            x: 100,
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
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
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
            y: 830
        }
        
        this.width = platform.width
        this.height = 20
        this.platform = platform
    }

    

    draw() {
        c.drawImage(this.platform, this.position.x, this.position.y)
    }
}

class AllImage {
    constructor({x, y}) {
        this.position = {
            x: x,
            y: y
        }
        
        this.width = hills.width
        this.height = 20

        this.hills = hills
    }

    

    draw() {
        c.drawImage(this.hills, this.position.x, this.position.y)
    }
}

const image = new Image()
image.src = platform
const imagez = new Image()
imagez.src = hills
const imagePlayer = new Image()
imagePlayer.src = playerPic

const player = new Player()
const platforms = [new Platform({x: -1, y: 830}), new Platform({x: 577, y: 470}), new Platform({x: 1155, y: 470})]
const allImages = [new AllImage({x: 800, y: 250})
        ]

let scrollOffset = 0

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0,0, canvas.width, canvas.height)
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })
    allImages.forEach(allImage => {
        allImage.draw()
    })
    
    if(keys.right.pressed
        && player.position.x < 400
        ) {
        player.velocity.x = 5
    } else if(keys.left.pressed && player.position.x > 100) {player.velocity.x = -5} 
    else {
        player.velocity.x = 0

            
            if(keys.right.pressed) {
                scrollOffset += 5
                platforms.forEach(platform => {
                    platform.position.x -= 5
                })
            } else if (keys.left.pressed) {
                scrollOffset -=5
                platforms.forEach(platform => {
                    platform.position.x += 5
                })
            }

            if(keys.right.pressed) {
                scrollOffset += 5
                allImages.forEach(allImage => {
                    allImage.position.x -= 5
                })
            } else if (keys.left.pressed) {
                scrollOffset -=5
                allImages.forEach(allImage => {
                    allImage.position.x += 5
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