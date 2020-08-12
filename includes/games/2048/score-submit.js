function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function scorePush(game_id,score){
  let player = getCookie('player');
  $.ajax({
    type: "POST",
    url: 'https://games.ingram-rivera.xyz/includes/submit_score.php',
    data: "username="+player+"&game_id="+game_id+"&score="+score,
    success: function(data) {
     console.log('score pushed');
    },
    error: function(data){
     console.log('push failed')
    }
   });
 }