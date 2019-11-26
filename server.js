// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http)

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});


io.on("connection",function(socket){
  console.log("a user connected id: ",socket.id);
  socket.on("disconnect",function(){
    console.log("a user disconnected id: ",socket.id);
  })
});

var sqs = {sq1:"", sq2:"", sq3:"", sq4:"", sq5:"", sq6:"", sq7:"",q8:"",sq9:""};

io.on('connection', function(socket){
  socket.on('game info', function(msg){
    //{ id: 'mk', kar: 'X', box: 'square1' }
    //var msg1 = JSON.stringify(msg);
    console.log(msg);
    var box = msg.box;
    sqs[box] = msg.kar;
    console.log("Kaydedilen değer: ",sqs[box])
    var sıra;
    if(msg.kar=="X"){sıra="O"}else{sıra="X"}
    var sonuc = checkWin();
    console.log(sqs);
    console.log(sonuc,msg.box,msg.kar,sıra,msg.id);
    io.emit("game return",{win:sonuc, konum:msg.box, who:msg.kar, id:msg.id, durum:msg.kar});
  });
});

function checkWin() {
  if(sqs.sq1 == "X"&&sqs.sq2 == "X"&&sqs.sq3 == "X"||
     sqs.sq4 == "X"&&sqs.sq5 == "X"&&sqs.sq6 == "X"||
     sqs.sq7 == "X"&&sqs.sq8 == "X"&&sqs.sq9 == "X"||
     
     sqs.sq1 == "X"&&sqs.sq4 == "X"&&sqs.sq7 == "X"||
     sqs.sq2 == "X"&&sqs.sq5 == "X"&&sqs.sq8 == "X"||
     sqs.sq3 == "X"&&sqs.sq6 == "X"&&sqs.sq9 == "X"||
     
     sqs.sq1 == "X"&&sqs.sq5 == "X"&&sqs.sq9 == "X"||
     sqs.sq3 == "X"&&sqs.sq5 == "X"&&sqs.sq7 == "X"
    ){
     console.log("oyunu: X kazandı"); //Win X
     reset();
    return("X");
}else if(
     sqs.sq1 == "O"&&sqs.sq2 == "O"&&sqs.sq3 == "O"||
     sqs.sq4 == "O"&&sqs.sq5 == "O"&&sqs.sq6 == "O"||
     sqs.sq7 == "O"&&sqs.sq8 == "O"&&sqs.sq9 == "O"||
     
     sqs.sq1 == "O"&&sqs.sq4 == "O"&&sqs.sq7 == "O"||
     sqs.sq2 == "O"&&sqs.sq5 == "O"&&sqs.sq8 == "O"||
     sqs.sq3 == "O"&&sqs.sq6 == "O"&&sqs.sq9 == "O"||
     
     sqs.sq1 == "O"&&sqs.sq5 == "O"&&sqs.sq9 == "O"||
     sqs.sq3 == "O"&&sqs.sq5 == "O"&&sqs.sq7 == "O"
){
  console.log("Oyunu O kazandı."); //Win O
  reset();
  return("O");
}else if(sqs.sq1 && sqs.sq2 && sqs.sq3 && sqs.sq4 && sqs.sq5 && sqs.sq6 && sqs.sq7 && sqs.sq8 && sqs.sq9){
    reset();
    return("B");
}else{return("N")}
}

function reset(){
  sqs = {sq1:"", sq2:"", sq3:"", sq4:"", sq5:"", sq6:"", sq7:"",sq8:"",sq9:""}
}

// listen for requests :)
const listener = http.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

//Oyun yapımı 21.11.2019 saat 22 de başlandı.
//saat 00:07 oyun sunucu hariç oynnaış kodlandı temelde html ve css githubdan alındı.
//js kendim yazdım bakarak. Reset yazıldı.
//Saat 22.11.2019 00:35 server yapımına başlandı.
//22.11.2019 saat 17:06 hatalar var ama oyun oynanıyor.
//22.11.2019 11:00 css eklendi yenilendi.
//23.11.2019 hiçbirşey yapılmadı
//24.11.2019 isim sistemi eklendi alert sistemi yenilerndi html içine gömüldü
//25.11.2019 hedehf 27sinde githuba koymak.

//    yapılacaklar.
//
//2.Eşleşme(isimlerin doğru yazımı direk bağlanınca) ve oyun sıfırlama.
//3.Admin paneli()hataları çözmek için()

