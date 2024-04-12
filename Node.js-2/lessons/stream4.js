// Stream - дають можливість скачувати файл по кусочкам (один кусочок важить 64 кілобайт)
// Є 4 типи Stream 
//Readable - читання 
//Writable - запис
//Duplex - для читання і запису (універсальні)
//Transform - такий же як і Duplex ,але може змінити дані по мірі читання 

const fs = require('fs')
const path = require('path')
const http = require('http')

//при роботі із сервером нам доступно 2 обєкта - (req,res) - регвест і респонс
http.createServer((req,res)=> {
    //req - readable stream 
    //res - writable stream 
    // тут ми відправляєм користувачу файл 
    const stream = fs.createReadStream(path.resolve(__dirname,'text.txt'))
    
    //МЕРЕЖЕВЕ ПІДКЛЮЧЕННЯ ЗНАЧНО ПОВІЛЬНІШЕ НІЖ ПРОЧИТАННЯ ФАЙЛУ !
    stream.pipe(res)// ТОЖ Є МЕТОД pipe ЩОБ КОРИСТУВАЧУ ЗАКАЧАЛОСЬ ВСІ НЕОБХІДНІ ФАЙЛИ ПЕРШ НІЖ ЗАКРИЄТЬСЯ ЦЯ ФУНКЦІЯ
    //readable stream не починає читати нову порцію даних поки  writable stream не закінчить записувати попередні файли 
})