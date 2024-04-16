const http = require('http') 
const EventEmitter = require('events')
const PORT = process.env.PORT || 5000 
const Router = require('./framework/Router') // імпортуєм роутер 
const Application = require('./framework/Application') //імпортуєм клас
const emitter = new EventEmitter()

const app = new Application() // створюєм обєкт із класу 

const router = new Router()


router.get('/users',(req,res)=>{
    res.end('YOU SEND REQUEST TO /USERS')
})
router.get('/posts',(req,res)=>{
    res.end('YOU SEND REQUEST TO /POSTS')
})
// за допомогою метода addRouter ми додаєм роутер у Application
app.addRouter(router)
// реалізовуєм функцію listen всередині Application щоб запускати шттп сервер
app.listen(PORT, ()=>console.log(`Server started on PORT ${PORT}`))

