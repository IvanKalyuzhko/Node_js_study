// створим middleware (його суть буде в парсингу JSON )
module.exports = (req,res) => {
    res.writeHead(200,{ 
        'Content-type': 'aplication/json'
    })
    // тут додаєм ще один метод який буде необхідним для того щоб відправити якісь дані в форматі JSON
    res.send = (data) => {
        res.end(JSON.stringify(data))// визиваєм метод end і перетворює дані в JSON формат 
    }
}