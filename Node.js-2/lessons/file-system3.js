// Файлова система

//Для взаємодії з файловою системою є модуль fs та робота із шляхом path
const fs = require('fs')
const path = require('path')

//фунція за якої ми будем видаляти папку 'dir' 
fs.rmdir(path.resolve(__dirname, 'dir'),(err)=> {//тут аргументом передаєм шлях до директорії та callback який приймає ошибку яку нам необхідно якось опрацювати 
    if(err) {
        throw err
    }
})