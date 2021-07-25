const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost/meanWook';
//production모드일때 외부 live db의 dbURI로 설정해준다.
if (process.env.NODE_ENV === 'production'){
    dbURI = "mongodb+srv://wook:abc1234!@cluster0.ivwng.mongodb.net/meanWook";
}

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.connect(dbURI);    //mongoDb연결

//DB 연결 열기 및 닫기를 적절히 관리
//mongoose의 연결 이벤트들을 콘솔에 찍음 , [연결 이벤트들 모니터링]
mongoose.connection.on('connected',()=>{
    console.log('몽구스에 연결되었습니다. '+dbURI);
});
mongoose.connection.on('error',(err)=>{
    console.log('몽구스 연결 에러. '+err);
});
mongoose.connection.on('disconnected',()=>{
    console.log('몽구스 연결이 끊어졌습니다.');
});


const gracefulShutdown = function(msg, callback){
    mongoose.connection.close(function(){
        console.log('Monoose disconnected through '+msg);
        callback();
    });
};

//[Node 프로세스 이벤트 모니터링] //애플리케이션이 끝나면 Mongoose 연결을 닫기 위해
//nodemon 재시작 모니터링
process.once('SIGUSR2',()=>{
    gracefulShutdown('nodemon restart', ()=>{
        process.kill(process.pid,'SIGUSR2');
    });
});
//앱 종료
process.on('SIGINT',()=>{
    gracefulShutdown('app termination',()=>{
        process.exit(0);
    });
});
//heroku에서 프로세스 종료
process.on('SIGTERM',()=>{
    gracefulShutdown('Heroku app shutdown',()=>{
       process.exit(0); 
    });
});



require('./locations'); //어플리케이션에서 가져옴