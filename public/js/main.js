import Compositor from './Compositor.js'
import Entity from './Entity.js'
import {loadLevel} from './loaders.js'
import {createBackgroundLayer} from './layers.js'
import {loadMarioSprite, loadBackgroundSprites} from './sprites.js'

const canvas    = document.getElementById('screen')
const context   = canvas.getContext('2d')


export function createSpriteLayer(entity) {
    return function drawSpriteLayer(context) {
        entity.draw(context)
    }
} 



Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites(),
    loadLevel('1-1')
])
.then(( [marioSprite, sprites, level]) => {
    const comp = new Compositor()

    const backgroundLayer = createBackgroundLayer(level.backgrounds, sprites)
    comp.layers.push(backgroundLayer)
    
    const gravity = 0.5
    
    const mario = new Entity()
    
    mario.pos.set(64, 120)
    
    mario.vel.set(2, -10)

    mario.draw = function drawMario(context) {
        marioSprite.draw('idle', context, this.pos.x, this.pos.y)
    }

    mario.update = function updateMario() {
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
    }

    const spriteLayer = createSpriteLayer(mario)
    comp.layers.push(spriteLayer)

    function update() {
        comp.draw(context)
        mario.update()
        
        mario.vel.y += gravity
        
        requestAnimationFrame(update)
    }

    update()

})