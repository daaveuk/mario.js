import Compositor from './Compositor.js'
import Entity from './Entity.js'
import Timer from './Timer.js'
import { loadLevel } from './loaders.js'
import { createMario } from './entities.js'
import Keyboard from './KeyboardState.js'

const canvas    = document.getElementById('screen')
const context   = canvas.getContext('2d')


<<<<<<< HEAD
Promise.all([
    createMario(),
    loadLevel('1-1')
])
.then(( [mario, level]) => {
    const gravity   = 2000
    const SPACE     = 32;
    const input     = new Keyboard()

    mario.pos.set(64, 180)
    
    level.entities.add(mario)

    input.addMapping(SPACE, keyState => {
        if(keyState) {
            mario.jump.start()
        } else {
            mario.jump.cancel()
        }
    })
    input.listenTo(window)

    const timer = new Timer(1/60)

    timer.update = function update(deltaTime) {
            level.update(deltaTime)
            
            level.comp.draw(context)
            
            mario.vel.y += gravity * deltaTime;
    }
    timer.start()
=======



    
    Promise.all([
        createMario(),
        loadBackgroundSprites(),
        loadLevel('1-1')
    ])
    .then(( [mario, sprites, level]) => {
        const comp = new Compositor()
    
        const backgroundLayer = createBackgroundLayer(level.backgrounds, sprites)
        comp.layers.push(backgroundLayer)
        
        const gravity = 2000
        mario.pos.set(64, 180)
        mario.vel.set(200, -600)
        
        const spriteLayer = createSpriteLayer(mario)
        comp.layers.push(spriteLayer)
    
    
    
        const timer = new Timer(1/60)
    
    
    
        timer.update = function update(deltaTime) {
                mario.update(deltaTime)
                comp.draw(context)
                mario.vel.y += gravity * deltaTime
    
        }
        
        timer.start()
    })


>>>>>>> 00221b5d478d4b9ab8f9fb4c8a7d59c66954df48

