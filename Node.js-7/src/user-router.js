// створюєм файл який буде описувати маршрути звязані із користувачами 
const Router = require('../framework/Router') 

const router = new Router ()


const users = [
    {id:1, name:'Petya'},
    {id:2, name:'Vasia'}
]
router.get('/users',(req,res)=> {
    console.log(req.params)
    res.send(users) //тепер тут достатньо визвати функцію send 
})
// Вкожному запросі є тіло 
router.post('/users',(req,res)=> {
    console.log(req.body)
    const user = req.body
    users.push(user)
    res.send(user) //тепер тут достатньо визвати функцію send 
})

module.exports = router 