const PORT = process.env.PORT || 5000 
const Application = require('./framework/Application') 
const userRouter = require('./src/user-router')// імпортуєм сюди user-router

const app = new Application() 


app.addRouter(userRouter)//додаєм userRouter у функцію 

app.listen(PORT, ()=>console.log(`Server started on PORT ${PORT}`))

