import Compositor from './Compositor.js'
import Entity from './Entity.js'
import { loadLevel } from './loaders.js'
import { createBackgroundLayer, createSpriteLayer } from './layers.js'
import { loadBackgroundSprites } from './sprites.js'
import { createMario } from './entities.js'

const canvas    = document.getElementById('screen')
const context   = canvas.getContext('2d')






Promise.all([
    createMario(),
    loadBackgroundSprites(),
    loadLevel('1-1')
])
.then(( [mario, sprites, level]) => {
    const comp = new Compositor()

    const backgroundLayer = createBackgroundLayer(level.backgrounds, sprites)
    comp.layers.push(backgroundLayer)
    
    const gravity = 0.5
    
    const spriteLayer = createSpriteLayer(mario)
    comp.layers.push(spriteLayer)
    
    let deltaTime   = 0
    let lastTime    = 0

    function update(time) {
        deltaTime = (time - lastTime) / 1000
        console.log(time)
        comp.draw(context)
        mario.update(deltaTime)
        
        mario.vel.y += gravity
        
        requestAnimationFrame(update)
        
        lastTime = time
    }

    update(0)

})