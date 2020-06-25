module.exports = {
    incorrectRoutes: function(req,res){
        res.status(404).json({'error':'incorrect routing'});
    }
}