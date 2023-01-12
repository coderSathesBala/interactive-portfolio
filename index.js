const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

var platform = new Image();
platform.src = './images/platform.png'

var hills = new Image();
hills.src = './images/hills.png'

var background = new Image();
background.src = './images/background.png'

canvas.width = innerWidth
canvas.height = innerHeight


const gravity = 0.5
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        this.width = 30
        this.height = 30
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
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

class GenericObject {
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

// function createImage(imageSrc) {
//     const image = new Image()
//     image.src = platform
//     return image
// }

const image = new Image()
image.src = platform
console.log(image.width)
const imagez = new Image()
imagez.src = hills
console.log(imagez.width)

const player = new Player()
const platforms = [new Platform({x: -1, y: 830}), new Platform({x: 577, y: 470}), new Platform({x: 1155, y: 470})]
const genericObjects = [new GenericObject({x: 800, y: 250}),
    //  new GenericObject({x: 800, y: 600}
        ]

let scrollOffset = 0

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'brown'
    c.fillRect(0,0, canvas.width, canvas.height)
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })
    genericObjects.forEach(genericObject => {
        genericObject.draw()
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
                genericObjects.forEach(genericObject => {
                    genericObject.position.x -= 5
                })
            } else if (keys.left.pressed) {
                scrollOffset -=5
                genericObjects.forEach(genericObject => {
                    genericObject.position.x += 5
                })
            }
    }

    console.log(scrollOffset)

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
    console.log('left')
    keys.left.pressed = true
    break

    case 83: 
    console.log('down')
    break
    
    case 68: 
    console.log('right')
    keys.right.pressed = true
    break

    case 87: 
    console.log('up')
    player.velocity.y -= 20
    break
}
console.log(keys.right.pressed)
})

addEventListener('keyup', ({keyCode}) => { 
    switch (keyCode) {
        case 65: 
        console.log('left')
        keys.left.pressed = false
        break
    
        // case 83: 
        // console.log('down')
        // break
        
        case 68: 
        console.log('right')
        keys.right.pressed = false
        break
    
        // case 87: 
        // console.log('up')
        // player.velocity.y -= 20
        // break
    }
    console.log(keys.right.pressed)
    })