var T = require('twitter');

console.log(T);
T.post('statuses/update',{status:'pppgsfghspopo'},function(err,data,res){
  console.log(err)
  console.log(data)
  console.log(res)
})
