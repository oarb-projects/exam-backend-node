module.exports = function(app){
    app.get('/', (req, res) => {
        res.send(process.env.SECRET_KEY);
    })
}