const http = require('http') 
const EventEmitter = require('events')

module.exports = class Application { 
    constructor(){
        this.emitter = new EventEmitter() 
        this.server = this._createServer()
        this.middlewares = []// тут створюєм поле із масивом middleware 
    }

    //створюєм метод за допомогою якого зможем middleware додавати 
    use(middleware) {// аргументом приймає middleware
        this.middlewares.push(middleware)
    }

    listen(port,callback){ 
        this.server.listen(port,callback)
    }
    // СТРУКТУРА ENPOINT !!!
    // enpoint = {
    //     '/users':{
    //         'GET' : handler
    //     }
    // }
    addRouter(router) {
        Object.keys(router.endpoints).forEach(path => { 
            const endpoint= router.endpoints[path] 
            Object.keys(endpoint).forEach((method) => {
                this.emitter.on(this._getRouteMask(path,method),(req,res)=>{
                    const handler = endpoint[method] 
                    this.middlewares.forEach(middleware => middleware(req,res)) //тут визиваєм кожен middleware
                    handler(req,res)
                })
            })
        })
    }
    _createServer(){ 
        return http.createServer((req,res)=>{
            let body =""
            req.on('data',(chunk)=>{
                body += chunk
            })

            req.on('end',()=> {
                if(body) {
                    req.body = JSON.parse(body)
                }
                const emitted = this.emitter.emit(this._getRouteMask(req.url,req.method),req,res) 
                if(!emitted){
                   res.end()
                }
            })
        })
    }
    _getRouteMask(path,method) { 
        return`[${path}]:[${method}]`
    }
}