
module.exports.main = function(req,res){
    res.render('locations-main',
            {
                title: '메인화면',
                pageHeader: {
                    title:'Cafe',
                    strapline: '주위에 Wi-Fi를 사용할 수있는 장소를 찾아보세요!'
                },
                sidebar:'wi-fi를 지원하는 휴식할 수있는 공간을 찾고 계신가요? Cafe.......................................',
                locations:[{
                    name: '건대입구역 스타벅스',
                    address:'주소 - 서울특별시 광진구 화양동 5-47',
                    rating: 3,
                    facilities:['Hot drinks','Food','Premium wifi'],
                    distance: '100m'
                },
                {
                    name: '건대입구역 카페베네',
                    address:'주소 - 서울특별시 광진구 화양동 48-5',
                    rating: 5,
                    facilities:['Hot drinks','Food','Premium wifi'],
                    distance: '150m'
                },
                {
                    name: '건대입구역 투썸플레이스',
                    address:'주소 - 서울특별시 광진구 화양동 5-12',
                    rating: 4,
                    facilities:['Hot drinks','Food','Premium wifi'],
                    distance: '200m'
                }]
            });
            
};