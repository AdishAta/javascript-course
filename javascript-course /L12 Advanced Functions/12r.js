let score = JSON.parse(localStorage.getItem('score')) || {
  Wins: 0,
  Losses: 0,
  Ties: 0
};     
updateScoreElement(); 

let revfigs = ['rock','paper','scissors'];
let comMove = 0;
let userMove = 0;

let isAutoPlaying = false;
let intervalID;
let isResetConfirmation = false;

document.body.addEventListener('keydown',(event)=>{
  comMove = pickComputerMove();
  if(event.key === 'r'){
    pickUserMove(0);
  }
  else if(event.key ==='p'){
    pickUserMove(1);
  }
  else if(event.key === 's'){
    pickUserMove(2);
  }
  else if(event.key ==='a'){
    autoPlay();
  }
  else if(event.key ==='Backspace' && isResetConfirmation ===true){
    document.querySelector('.reset-confirmation').innerHTML="";
    isResetConfirmation=false;
  }
  else if(event.key==='Enter' && isResetConfirmation === true){
    pressedYes();
  }
  else if(event.key ==='Backspace'){
    resetScore();
  }
})

document.querySelector('.reset-score-button').addEventListener('click',()=>{
  resetScore();
})

document.querySelector('.auto-play-button').addEventListener('click',()=>autoPlay());

function pressedYes(){
  score.Wins = 0;
  score.Losses = 0;
  score.Ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
  document.querySelector('.reset-confirmation').innerHTML="";
  isResetConfirmation=false;
}
function resetScore(){
  isResetConfirmation = true;
  document.querySelector('.reset-confirmation').innerHTML=`Are you sure you want to reset the score? <button class="yes-button">
  Yes
  </button> 
  <button class="no-button">
  No
  </button>`
  document.querySelector('.no-button').addEventListener('click',()=>{document.querySelector('.reset-confirmation').innerHTML="";
  isResetConfirmation =false;})

  
  document.querySelector('.yes-button').addEventListener('click',()=>{pressedYes();
    isResetConfirmation =false;});
  
}

function autoPlay(){
  if(!isAutoPlaying){
    
    intervalID = setInterval(() => {
        comMove = pickComputerMove();
        userMove = pickComputerMove();
        // console.log(userMove);
        // console.log(comMove);
        pickUserMove(userMove);

    },1000);
    document.querySelector('.auto-play-button').innerHTML='Stop Playing';
    isAutoPlaying = true;
  }
  else{
    clearInterval(intervalID);
    document.querySelector('.auto-play-button').innerHTML='Start Playing';
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button').addEventListener('click',() => {
  comMove = pickComputerMove();
  pickUserMove(0);
})

document.querySelector('.js-paper-button').addEventListener('click',()=>{
  comMove = pickComputerMove();
  pickUserMove(1);
})

document.querySelector('.js-scissors-button').addEventListener('click',()=>{
  comMove = pickComputerMove();
  pickUserMove(2);
})

  function minusFigs(i){
    if(i==0){
      return 2;
    }
    else{
      return i-1;
    }
  }
   
function pickComputerMove(x) {
  const rNumber = Math.random();
  if(rNumber >= 0 && rNumber < 1/3){
    return 0;
  }
  else if (rNumber >= 1/3 && rNumber < 2/3){
    return 1;
  }
  else if (rNumber >= 2/3 && rNumber < 3/3){
    return 2;
  }
}

  
  function pickUserMove(a){
    let result = '';
    if(comMove - a == -1){
      result = 'You lose';
      score.Losses++;
    }
    else if(comMove - a == 0){
      result = 'tie';
      score.Ties++;
    }
    else {
      result = 'You win';
      score.Wins++;
    }
    console.log(comMove);
    document.querySelector('.js-moves').innerHTML = `      You <img src="images/${revfigs[a]}-emoji.png" class="move-icon">
  <img src="images/${revfigs[comMove]}-emoji.png" class="move-icon">
  Computer`;
    document.querySelector('.js-result').innerHTML = result;

    localStorage.setItem('score',JSON.stringify(score));
    
    updateScoreElement();

  
  }

  function updateScoreElement(){
    document.querySelector('.js-score').innerHTML = `Wins: ${score.Wins} Losses: ${score.Losses} Ties: ${score.Ties}`;

    

    
  }
  
  
  

  
/*
  if(!score){
    score = {
    Wins: 0,
    Losses: 0,
    Ties: 0
  };
}
*/