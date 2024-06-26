const http = require('http') //імпортуєм необхідні модулі так як ми будем його інкапсулювати 
const EventEmitter = require('events')//імпортуєм необхідні модулі так як ми будем його інкапсулювати 

module.exports = class Application { // експортуєм цей клас
    constructor(){
        this.emitter = new EventEmitter() // тут створюєм обєкт EventEmitter (називаєм його emitter)
        this.server = this._createServer() // тут створюєм сервер і ініціалізуєм його визвавши приватний метод 
    }

    listen(port,callback){ //приймає порт та колбек який відпрацює в той момент коли сервер запустився
        this.server.listen(port,callback) // тут ми делегуєм подію 
    }

    // СТРУКТУРА ENPOINT !!!
    // enpoint = {
    //     '/users':{
    //         'GET' : handler
    //     }
    // }

    //тут робим метод який буде додавати роутери так як у одної програми може бути декілька роутерів 
    addRouter(router) {// аргументом буде приймати router 
        // тут ми ітеруємось по всім ендпоінтам щоб отримати шляхи , методи і для кожного ендпоінта підписатись на відповідну подію 
        Object.keys(router.endpoints).forEach(path => { // за допомогою Object.keys отримуємо ключі від ендпоіндів роутера (ключем є саме шлях у маршрут)
            const endpoint= router.endpoints[path] // тут ми виципляєм ендпоінд 
            //відповідно якщо ми отримаєм ключі у ендпоінда то це вже будуть методи і тепер ми зможем отримати хендлер і підписатись на подію 
            Object.keys(endpoint).forEach((method) => {// тут знову отримуєм ключі , за допомогою forEach ітеруємся по цих ключам 
                const handler = endpoint[method] // тут отримуєм відповідний handler із enpoint по методу 
                //залишається підписатись на подію (яку ми робили всередині роутера у Node.js-4 )
                this.emitter.on(this._getRouteMask(path,method),(req,res)=>{ // тут отримуєм емітер із поточного контексту (this.emitter) ,а маску отримуєм із методу _getRouteMask
                    handler(req,res)
                })
            })
        })
    }

    //створюєм окремий ПРИВАТНИЙ метод (приватний - означає що використовувати його ззовні не варто , приватний позначається нижнім підкресленням ( _ ))
    _createServer(){ 
        return http.createServer((req,res)=>{//цей метод буде повертати уже створений шттп сервер
            //логіку ми скопіювали із Node.js-4 в індексі
            // тут звертаємось до окремого методу _getRouteMask 
            // в момент коли ми цю подію емітим то просто визиваєм цю функцію та передаєм туди шлях і метод які отримуєм від обєкта req
            const emitted = this.emitter.emit(this._getRouteMask(req.url,req.method),req,res) //звертаємось до this.emitter так як він інкапсульований в середині класу 
            if(!emitted){
                res.end()
            }
        })
    }
    //створюєм окремий ПРИВАТНИЙ метод (приватний - означає що використовувати його ззовні не варто , приватний позначається нижнім підкресленням ( _ ))
    _getRouteMask(path,method) { // тут ми вшиваєм шлях і метод 
        return`[${path}]:[${method}]` // цю маску ми будем використовувати у 2 місцях (при ініціюванні події та при еміті даної події)
    }
}