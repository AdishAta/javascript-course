let add = function(){
  console.log(2+3);
}

function runTwice(fun){
  fun();
  fun();
}

runTwice(add);