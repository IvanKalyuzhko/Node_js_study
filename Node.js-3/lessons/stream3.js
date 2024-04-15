// Stream - дають можливість скачувати файл по кусочкам (один кусочок важить 64 кілобайт)
// Є 4 типи Stream 
//Readable - читання 
//Writable - запис
//Duplex - для читання і запису (універсальні)
//Transform - такий же як і Duplex ,але може змінити дані по мірі читання 

const fs = require('fs')
const path = require('path')

// використаєм функцію для запису 
const writableStream = fs.createWriteStream(path.resolve(__dirname,'text2.txt'))
for (let i = 0 ;i<20;i++){ // робим цикл 
    writableStream.write(i+'\n')// робим перенос рядка після кожного запису (i+'\n')
} //writableStream необхідно завершувати вручну 
writableStream.end()//функцією end завершуєм writableStream
// після чого зявиться файл 
writableStream.close()// цим методом теж можна закрити writableStream але він визиває іншу подію
writableStream.destroy()// цим методом теж можна закрити writableStream але він визиває іншу подію
writableStream.on('error')// в залежності від події потрібно по різному обробляти її (тут за допомогою 'error')
