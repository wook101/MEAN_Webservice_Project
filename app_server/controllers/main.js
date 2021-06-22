module.exports.home = function(req,res){
    res.render('index',{title: 'Express 메인 페이지'});
};