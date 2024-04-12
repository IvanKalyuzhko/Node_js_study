// Stream - дають можливість скачувати файл по кусочкам (один кусочок важить 64 кілобайт)
// Є 4 типи Stream 
//Readable - читання 
//Writable - запис
//Duplex - для читання і запису (універсальні)
//Transform - такий же як і Duplex ,але може змінити дані по мірі читання 

const fs = require('fs')
const path = require('path')

//тут створюєм stream в якому callback не прописується (stream працює по принципу подій)
const stream = fs.createReadStream(path.resolve(__dirname,'text.txt'))

//тут створюєм подію 
//один чанк по дефолту важе 64 кілобайта 
stream.on('data',(chunk)=> {//першою подією створюєм data , а іншим callback який приймає chunk (той кусок файла який ми прочитали )
    console.log(chunk) // виводим його в логи
})

stream.on('end',()=> console.log('Закінчили читати'))// використовуєм подію end
stream.on('open',()=> console.log('Почали читати'))// використовуєм подію open
stream.on('error',(e)=> console.log(e))// використовуєм подію error для обробки різних ошибок 