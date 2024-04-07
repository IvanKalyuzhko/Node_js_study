// Файлова система

//Для взаємодії з файловою системою є модуль fs та робота із шляхом path
const fs = require('fs')
const path = require('path')

// Функція для запису файла на диск 
const writeFileAsync = async (path,data) => {
    //тут повертаєм проміс (при створенні повертає callback (resolve - Якщо функція виконалась успішно і reject - якщо функція виконалась із ошибкою  ))
    return new Promise ((resolve,reject) => fs.writeFile(path,data,(err)=> { // після чого(=>) виконуєм функцію writeFile із стандартного модулю node.js (в ній вказуєм шлях та передаєм callback)
        if(err) { // робим умову для перевірки ошибки 
            return reject(err.message) // тут у випадку якщо пройшла ошибка викликаєм функцію reject у якій прописуєм як саму ошибку або сповіщення рошибки
        }
        resolve()// якщо ошибка не пройшла то викликаєм функцію  resolve
    }))
}

//тут вказуєм все те ж що і для writeFileAsync 
const appendFileAsync = async (path,data) => {
    return new Promise ((resolve,reject) => fs.appendFile(path,data,(err)=> { 
        if(err) {
            return reject(err.message)
        }
        resolve()
    }))
}

//за допомогою цієї функції ми будем файли зчитувати (додавати 'utf-8' для того щоб прописувати необхідну інфу в логах )
const readFileAsync = async (path) => {// тут буде достатньо тільки шлях (path) так як ми будем тільки читати його 
    // за замовчуванням ця функція зчитує буфер , але якщо ми другим аргументом вказуєм {encoding:'utf-8'} то буфер переробиться в читаємий текст
    return new Promise ((resolve,reject) => fs.readFile(path,{encoding:'utf-8'},(err,data)=> { // в callback  окрім err потрібно вказати ще один callback (або string або буфер) data 
        if(err) {
            return reject(err.message)
        }
        resolve(data)// додаєм data також у  resolve щоб дані отримати 
    }))
}

//визиваєм функцію в якій першим аргументом передаєм шлях , а в іншу дані які хочем записати 
writeFileAsync(path.resolve(__dirname,'test.txt'),'data')
    .then(() =>appendFileAsync(path.resolve(__dirname,'test.txt'),'123'))
    .then(() =>appendFileAsync(path.resolve(__dirname,'test.txt'),'456'))
    .then(() =>appendFileAsync(path.resolve(__dirname,'test.txt'),'578'))
    .then(() =>readFileAsync(path.resolve(__dirname,'test.txt'))) // тут отримуєм дані до readFileAsync 
    .then(data => console.log(data)) // отримані із файлу дані виведем в консоль (дані отримаєм у кодировці 'utf-8')
    .catch(err => console.log(err)) // тут виводим ошибку в логи 
//тут створиться файл і в необхідній послідовності вложиться інформація