module.exports.about = function(req,res){
    res.render('about',
    {
        title:'소개',
        content:'해당 웹 어플리케이션은 사용자가 잠시동안 머물러 있을 수 있는 주위에 카페들의 정보들을 보여준다.'
    });
};