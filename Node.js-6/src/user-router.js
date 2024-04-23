// створюєм файл який буде описувати маршрути звязані із користувачами 
const Router = require('../framework/Router') // тут імпортуємо роутер 

const router = new Router ()

//тут на клієнт будем відправляти масив користувача 
const users = [
    {id:1, name:'Petya'},
    {id:2, name:'Vasia'}
]
router.get('/users',(req,res)=> {// додаєм ендпоінт за допомогою методу get (1 аргументом передаєм шлях , а іншим хендлер)
    //щоб браузер розумів що це JSON додаєм метод writeHead
    res.writeHead(200,{// тут вказуєм статус код 200(запит пройшов успішно)
        'Content-type':'aplication/json' // необхідно вказувати 'Content-type' для того щоб користувачу поаертався масив
    })
    res.end(JSON.stringify(users))// за допомогою методу end необхідно отправити користувачів на клієнт (але переробити у JSON рядок за допомогою stringify відправити масив)
})
router.post('/users',(req,res)=> {
    res.writeHead(200,{
        'Content-type':'aplication/json'
    })
    res.end(JSON.stringify(users))
})

module.exports = router // звідси імпортуємо роутер