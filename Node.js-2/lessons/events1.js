const Emitter = require('events') // модуль events дозволяє нам створювати події ,підписуватись на них , генерувати ці події

const emitter = new Emitter()//тут створим обєкт emitter

//тут створюєм свою подію за допомогою функції on
emitter.on('message',(data,second,third)=>{// першим аргументом вказуєм назву (подію message) , другим callback який буде відпрацьовувати коли хтось цю подію згенерував (тут приймаєм нескінченну кількість аргументів які нам потрібні)
    console.log('Ви прописали сповіщення '+ data) //тут виводим перший аргумент 
    console.log('Другий аргумент '+ second)//тут виводим другий аргумент 
})

//тут згенеруєм подію - будем отримувати сповіщення із змінних оточення 
const MESSAGE = process.env.message || '' // якщо це сповіщення не пусте то будем генерувати подію 

if(MESSAGE) {
    // для генерації подій використовуєм функцію emit
    emitter.emit('message',MESSAGE,123)// тут передаєм аргументи 
}else {
    emitter.emit('message','Ви не вказали сповіщення')// в цьому випадку якщо сповіщення не пусте то згенеруєм цю подію з іншими аргументами 
}

//в терміналі за допомогою cross-env проініціалізуєм змінну оточення MESSAGE хоть якимось значенням і запустим програму то згенерується подія із іншими аргументами
