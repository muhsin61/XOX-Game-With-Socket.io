console.log("hello world :o");

$(function() {
  var socket = io();

  $(".tic-tac-toe").hide();
  $(".secim").hide();
  $("#uyari").hide();
  
  var nickname;
  var secim;
  
  var yourcount = 0;//
  var othercount = 0;

  var sq1 = $("#sq1");
  var sq2 = $("#sq2");
  var sq3 = $("#sq3");
  var sq4 = $("#sq4");
  var sq5 = $("#sq5");
  var sq6 = $("#sq6");
  var sq7 = $("#sq7");
  var sq8 = $("#sq8");
  var sq9 = $("#sq9");

  var playValid = true;
  var win = false;

  $(".tile").on("click", function Xplay() {
    if ($(this).text()) {
     uyari("Burası dolu...");
    } else {
      if (playValid) {
        playValid = false;
        socket.emit("game info", {
          id: nickname,
          kar: secim,
          box: $(this).attr("id")
        });
      } else {
        uyari("Sıra sizde değil.")
      }
    }
  });

  //Nickname codes
  $(".nickname").submit(function(event) {
    nickname = $("#nickname").val();
    $(".secim").show(); //Game screen open
      $("#uyari").hide();
    $(".nickname").hide();
    $("#yourname").text(nickname);
    event.preventDefault();
  });

  //Choose X or O
  $(".karakter").click(function(event) {
    //alert($(this).text());//test
    secim = $(this).text();
    $(".tic-tac-toe").show();
    $(".secim").hide();
  });

  function reset() {
    //Reset function
    $(".free").text("");
    playValid = true;
  }

  //Response codes
  socket.on("game return", function(msg) {
    console.log(msg);
    //durum: "O"id: "fgxk" konum: "sq5" who: "O" win: "N"
    $("#" + msg.konum).text(msg.durum);
   if(msg.win === secim){
      uyari("Sen kazandın...");//fonksyion olarak yazılabilir.
      yourcount += 1;
      $("#yourcount").text(yourcount);
      reset();
    }else if(msg.win == "B"){
      uyari("Berabere...");
      reset();
    }else if(msg.win == "N"){
      console.log("Önemsiz bir hata.");
    }else {
      uyari("Kaybettin...");
      othercount += 1;
      $("#othercount").text(othercount);
      reset();
    }
    if (msg.who == secim) {
      playValid = true;
    }
    if (msg.id != nickname) {//rakip ismi geldiğinde ekrana yaz. bu bir fazla kod.
      $("#othername").text(msg.id);
    }
  });
});

function uyari(msg){
  $("#uyari").text(msg).slideDown("slow",function(){
          $("#uyari").slideUp("slow"), 4000;
    });
}
