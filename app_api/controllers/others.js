module.exports.about = function(req,res){
    res.render('about',
    {
        title:'소개',
        content:'해당 웹 어플리케이션은 사용자가 휴식을 갖기 위한 장소와 개인적인 일을 할 수 있는 장소를 찾을 수 있도록 정보를 제공한다.'
    });
};