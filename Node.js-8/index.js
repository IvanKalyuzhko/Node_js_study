const PORT = process.env.PORT || 5000 
const Application = require('./framework/Application') 
const userRouter = require('./src/user-router')// імпортуєм сюди user-router
const jsonParser = require('./framework/parsejson')// підключаєм middleware для парсингу json 
const parseUrl = require('./framework/parseUrl')
const mongoose = require('mongoose')

const app = new Application() 

app.use(jsonParser)
app.use(parseUrl('http://localhost:5000'))
app.addRouter(userRouter)

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://user:123@cluster0.b5njph8.mongodb.net/')
        app.listen(PORT, ()=>console.log(`Server started on PORT ${PORT}`))
    } catch {
        console.log (e)
    }
}

start()
