const http = require('http') // імпортуєм модуль http

const PORT = process.env.PORT || 5000

//методом createServer створюєм сервер 
const server = http.createServer((req,res)=>{

})

server.listen(PORT, ()=>console.log(`Server started on PORT ${PORT}`))