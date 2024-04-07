// Файлова система

//Для взаємодії з файловою системою є модуль fs та робота із шляхом path
const fs = require('fs')
const path = require('path')

console.log('START')// тут вказуєм в консолі сповіщення для перевірки чи виконується функція асинхронно
//асинхронна функція 
fs.mkdir(path.resolve(__dirname, 'dir'),(err)=>{//створюєм функцію за допомогою callback (першим аргументом вказуєм шлях , а іншим callback(аргументом приймає ошибку))
    if(err){ //робим умову - якщо ошибка є то виводим її в логи 
        console.log(err)
        return // додаєм для повернення callback
    }
    console.log('Папка створена') //в іншшому випадку якщо ошибки немає то в логи виводим сповіщення 
})

console.log('END')// тут вказуєм в консолі сповіщення для перевірки чи виконується функція асинхронно