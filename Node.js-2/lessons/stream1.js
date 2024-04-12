// Stream - дають можливість скачувати файл по кусочкам (один кусочок важить 64 кілобайт)
// Є 4 типи Stream 
//Readable - читання 
//Writable - запис
//Duplex - для читання і запису (універсальні)
//Transform - такий же як і Duplex ,але може змінити дані по мірі читання 

const fs = require('fs')
const path = require('path')

//цією функцією будем зчитувати файл (поки не використовуєм stream)
fs.readFile(path.resolve(__dirname,'text.txt'),(err,data)=>{
    if(err){
        throw err
    }
    console.log(data)
})
// в терміналі нам має повернутися буфер із розміром файлу