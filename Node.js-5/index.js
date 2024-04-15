const http = require('http') 
const EventEmitter = require('events')
const PORT = process.env.PORT || 5000 

const emitter = new EventEmitter()//створюєм обєкт з евентемітеру (створюєм його глобально)


class Router {
    constructor(){// реалізуєм конструктор 
        this.endpoints={}//ініціюєм обєкт ендпоінтс
    }
    //додаєм метод  request
    request(method="GET",path,handler){//цей метод приймає такі параметри - 1 аргумент - за замовчуванням GET ,2 - шлях до цього метода та хендлер(callback - якась функція що буде по цьому шляху відпрацьовувати )
       // тут ми переконаємось що такого ендпоінта на даний момент ще немає 
        if(!this.endpoints[path]){// робим перевірку - підключаєм по ключу path якесь поле у обєкта 
            this.endpoints[path]={}// якщо на поточний момент цього ключа немає то ініціюєм його пустим обєктом
        }
        const endpoint = this.endpoints[path] // тут ендпоінт виносим у окрему змінну щоб кожен раз із обєкту його не отримувати 
        //Але у кожного маршруту може бути різні методи (GET,POST,PUT,DELETE)
        //Необхідно в події переконатись у тому що по цьому адресу такого методу неіснує (так як буде конфлікт)
        //Тут робим перевірку і прокидаєм помилку
        if(endpoint[method]){
            throw new Error(`[${method}] по адресу ${path} уже існує`)//тут вказуєм що по такому методу та адресу уже існує маршрут
        }
        endpoint[method] = handler// якщо верхня подія не відпрацьовує то ми просто записуєм цей ендпоінд по ключу методу хендлер
        //просто записати хендлер недостатньо , на відповідний запит необхідно згенерувати необхідну обставину (тут використаєм EventEmitter)

        //створюєм подію по особливій назві
        // в квадратних дужках спочатку створюєм шлях, а потім метод 
        emitter.on(`[${path}]:[${method}]`,(req,res)=>{ //другим аргументом вказуєм callback який на цю подію буде визиватись (req,res)
            handler(req,res)// всередині цього колбека визиваєм хендлер і передаєм два стріма (req,res)
        })
    }
    //тут створюєм набор методів у роутера - це будуть методи які є оболочкою для визову функції request 
    get(path,handler){
        this.request('GET',path,handler)
    }
    post(path,handler){
        this.request('POST',path,handler)
    }
    put(path,handler){
        this.request('PUT',path,handler)
    }
    delete(path,handler){
        this.request('DELETE',path,handler)
    }
}
//створюєм обєкт 
const router = new Router()

//робим get запрос по адресу users
router.get('/users',(req,res)=>{//другим аргументом додаєм колбек який приймає параметрами (req,res) 
    res.end('YOU SEND REQUEST TO /USERS')// тут повертаєм звичайне сповіщення на клієнт
})
router.get('/posts',(req,res)=>{
    res.end('YOU SEND REQUEST TO /POSTS')
})

// Потрібно згенерувати подію при створенні сервера 
const server = http.createServer((req,res)=>{
    //визиваєм функцію emit і емітим події (в якості шляху вказуєм req.url , в якості методу ставим req.method)
    const emitted = emitter.emit(`[${req.url}]:[${req.method}]`,req,res) // тут необхідно передати ті параметри які ми прописували в listener ( emitter.on(`[${path}]:[${method}]`,(req,res))
    // якщо користувач відправив запрос по неіснуючим юрл адресам то його теж необхідно опрацювати 
    //коли ми емітим події то нам повертаються буліан значення (воно = false якщо такої події не існує )
    if(!emitted){
        res.end()// в умові ми закриваєм stream щоб запит не висів нескінченно (якщо користувач робить запит по неіснуючому юрл)
    }
   // res.end(req.url)
})

server.listen(PORT, ()=>console.log(`Server started on PORT ${PORT}`))