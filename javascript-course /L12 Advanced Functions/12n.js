function removeEggs(foods){
  let i = 0;
  console.log(foods.filter(value =>{
    value==='egg'&&i++;
    return value!=='egg' || i>2;
  }));
}

removeEggs(['egg','egg','apple','egg']);

