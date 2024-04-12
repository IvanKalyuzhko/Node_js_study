// Файлова система

//Для взаємодії з файловою системою є модуль fs та робота із шляхом path
const fs = require('fs')
const path = require('path')

//тутстворим функцію щоб удалити файл 
const removeFileAsync = async (path) => {
    return new Promise ((resolve,reject) => fs.rm(path,(err)=> { // тут визиваєм функцію rm яка буде видаляти саме файл
        if(err) {
            return reject(err.message)
        }
        resolve()
    }))
}

removeFileAsync(path.resolve(__dirname,'test.txt'))
     .then(()=> console.log('file waz removed'))// в логи передамо інформацію що файл був видалений
//після цього створений нами файл буде цією функцією видалятись