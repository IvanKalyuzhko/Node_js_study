const os = require('os') // імпортуєм модуль os (операційна система)
//cluster - потрібен для того щоб однопоточній node.js програмі використовувати всі можливості багатоядерних систем запускати дочірні процеси  
const cluster = require('cluster')

//тут робим перевірку - чи є цей процес головним (за це відповідає isMaster)
if(cluster.isMaster){ // якщо цей процес головний то потрібно запустити дочірні процеси
    for (let i = 0;i<os.cpus().length - 2;i++) { //os.cpus().length - тут звертаємось до модулю os , визиваєм функцію cpus і потім отримуєм довжину
        cluster.fork()// тут для кожного ядра запускаєм  процес (у cluster визиваєм функцію fork - таким чином буде запущений дочірній процес)
    }
    //тут ми можем підписуватись на певні події 
    cluster.on('exit',(worker)=>{//тут ми підписуємось на подію exit 
        console.log(`Воркер з pid= ${worker.process.pid} вмер`)// тут будем виводити в логи подію - коли певний процес вмер 
        cluster.fork()// тут одразу запускатимем новий процес після того як попередній процес вмиратиме
    })
}else{ // else - відпрацьовуватиме у тому випадку коли будуть запускатись дочірні процеси 
    console.log(`Воркер з pid= ${process.pid} запущений`) // в логи виведем id поточного процесу

    setInterval(()=> {// тут створюєм інтервал де кожні 5 секунд будем виводити інформацію про те що процес із певним id все ще працює 
        console.log(`Воркер з pid= ${process.pid} ще працює`)
    },5000)
}

const cpus = os.cpus()

//Воркером називають дочірній процес
