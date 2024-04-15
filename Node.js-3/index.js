const http = require('http') 

const PORT = process.env.PORT || 5000 

const server = http.createServer((req,res)=>{
    res.writeHead(200,{
        'Content-Type':'application/json'
    })
    if(req.url === '/users'){ //тут генеруєм ендпоінт users і при написанні користувачем цього ендпоінда буде висвітлювати інформація яку ми пропишем
        return res.end(JSON.stringify([
            {id:1,name:'Name'}
        ]))
    }
    if(req.url === '/posts'){//тут генеруєм ендпоінт posts і при написанні користувачем цього ендпоінда буде висвітлювати інформація яку ми пропишем
        return res.end('POSTS')
    }
    res.end(req.url)// тут вставляєм поле юрл щоб відображати інформацію яка буде вказуватись після / в юрл
})

server.listen(PORT, ()=>console.log(`Server started on PORT ${PORT}`))