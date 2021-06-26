### Express 프로젝트   
Node, npm   
Git   
Heroku   
npm install -g express-generator: 애플리케이션의 골격을 신속하게 작성
   
express  명령어로 프로젝트 뼈대 생성   
npm install   package.json에 정의 되어있는 의존성들 설치   


Procfile파일      
web: npm start   

Heroku에 푸시될 때 이 파일은 Heroku에게 애플리케이션이 웹 프로세스를 필요로 하며 npm 
start를 실행해야 한다고 알린다.   


[몽고db 명령어]   
use [데이터베이스 이름]: 데이터베이스 생성, 한개 이상 document를 넣어야 show dbs명령을 입력했을 때 나타남   
db : 현재 사용하고 있는 db이름 출력    
   
[Mongoose]   
-Node어플리케이션을 위한 mongodb ODM으로 특별히 구축   
-어플리케이션 내에서 데이터 모델을 관리함   
-데이터베이스의 관계 매퍼들을 직접 조작하지 않아도 됨   
   
MongoDB에서 DB의 각 항목을 다큐먼트(Document)라고 한다.   
■ MongoDB에서 다큐먼트 모음을 컬렉션(Collection)이라고 부른다.   
(관계형 DB에 익숙하다면 "테이블"이라고 생각하자)    
■ Mongoose에서는 다큐먼트의 정의를 스키마(Schema)라고 한다.   
■ 스키마에 정의된 각 개별 데이터 엔티티를 패스(Path)라고 한다.  

[mongodb 샘플데이터]   
삽입 : db.locations.save({name: '탐앤탐스 건대입구점',address: '서울특별시 광진구 화양동 5-91',rating: 2,facilities: ['Hot drinks', 'Food', 'Premium wifi'],coords: [127.07046850307063,37.5408220415283],openingTimes: [{days: '매일',opening: '00:00am', closing: '24:00pm',closed: false}]})   

수정 : db.locations.update({name:'스타벅스 건대입구점'},{$push:{reviews:{id:ObjectId(),author:'김동욱',rating:5,reviewText:"잠깐 휴식하기 좋은 장소 입니다."}}})   


[mongodb 외부 데이터베이스 서비스 https://cloud.mongodb.com/]      
cloud.mongodb.com에 db구축, 500mb 무료제공
1.클러스터 생생   
2.네트워크 보안 설정 (현재 로컬 ip에서 접속 가능하게 설정)   
3.Mongo db Compass GUI 도구로 생성한 클러스터에 접속 (host,username,password입력)   
4.연결 후 db생성, collection생성, document들 추가    

   



