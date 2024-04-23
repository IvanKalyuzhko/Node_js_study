// створюєм файл який буде описувати маршрути звязані із користувачами 
const Router = require('../framework/Router') 
const controller = require('./user-controller')
const router = new Router ()


const users = [
    {id:1, name:'Petya'},
    {id:2, name:'Vasia'}
]
router.get('/users',controller.getUsers)

router.post('/users',controller.createUser)

module.exports = router 