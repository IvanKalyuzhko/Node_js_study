const Emitter = require('events') 

const emitter = new Emitter()

//тут виносим у певну змінну слухача
const callback= (data,second,third)=>{
    console.log('Ви прописали сповіщення '+ data) 
    console.log('Другий аргумент '+ second)
}
//якщо подію нам необхідно згенерувати лише раз то використовуєм функцію once
emitter.once('message',callback) 

//коли ми за допомогою  підписуємось на окрему подію то за допомогою emit ми можем генерувати нескінченно раз подію(відправляти якесь сповіщення)
emitter.emit('message')
emitter.emit('message')
emitter.emit('message')
emitter.emit('message')

emitter.removeAllListeners()//тут ми можем видаляти всі слухачі 
emitter.removeListener('message',callback)//тут можем аидаляти певний слухач (першим аргументом передаєм назву слухача ,а іншим callback)
