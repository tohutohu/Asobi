var twit = require('twit');

var T = new twit();
// mail: dkuf4jw3egrm@sute.jp
// pass: qazwsxedc

var stream = T.stream('user');
var count = 0;
var list = {};

stream.on('tweet',function(tweet){
  console.log(tweet.user.name);
  var reply = tweet.in_reply_to_screen_name;
  if(reply === "bentuyo_shite"){
    if(tweet.text.match(/登録/g)){
      console.log(reply);
      list[tweet.user.screen_name] = 1;
      T.post('favorites/create',{id:tweet.id_str},function(err,data,res){
        
      });
      T.post('statuses/update',{status:`@${tweet.user.screen_name} \n登録したよ \n勉強して`},function(err,data,res){

      });
    }else if(tweet.text.match(/解除/g)){
      delete list[tweet.user.screen_name];
      T.post('statuses/update',{status:`@${tweet.user.screen_name} \n解除したよ \nお疲れ様`},function(err,data,res){

      });
    }
  }else{
    if(list[tweet.user.screen_name] !== undefined){
      console.log(list[tweet.user.screen_name]);
      T.post('statuses/update',{status:`@${tweet.user.screen_name} \n 勉強して \n ${list[tweet.user.screen_name]}回目だよ？`},function(err,data,res){
        //T.post('statuses/update',{status:'この人'+list[tweet.user.screen_name]+'回言ってるのに勉強しないんだけど\n https://twitter.com/statuses/'+tweet.id_str},function(err,data,res){
          list[tweet.user.screen_name]++;
        //});
      });
    }
  }
});

stream.on('follow',function(data){
  console.log(data);
  T.post('friendships/create',{screen_name:data.source.screen_name},function(err,data,res){
    console.log(err);
    console.log(data);
  });
});
