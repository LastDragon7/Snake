let inputDir = {x : 0 , y : 0};
let score = 0;
let speed = 3;
let lastpaint = 0;
let snakeArr = [
    {x: 13, y: 15}
];
let food = {x : 10 , y : 12};

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastpaint)/1000 < 1/speed){
        return;
    }
    lastpaint = ctime;
    gamengine();
}

function iscollide(sarr){
    if(sarr[0].x > 18 || sarr[0].y > 18 || sarr[0].x < 0 || sarr[0].y < 0){
        return true;
    }
    return false;
}

function gamengine(){
    // Game Over
    if(iscollide(snakeArr)){
        inputDir = {x : 0 , y : 0};
        score = 0;
        scorebox.innerHTML = "Score : " + score;
        snakeArr = [{x: 13, y: 15}];
        alert('Try again loser!');
    }
    // Food Eaten
    console.log('Food at : '+food.x,food.y);
    console.log('Snake head at : ' + snakeArr[0].x , snakeArr[0].y);
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        console.log('Food Eaten');
        score += 1;
        scorebox.innerHTML = "Score : " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};
    }

    // Moving the snake

    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    board.innerHTML = '';
    // snakearr.forEach((e,index)=>{
    //     snakelement = document.createElement('div');
    //     snakelement.style.gridRowStart = e.y;
    //     snakelement.style.gridColomnStart = e.x;
    //     if(index === 0){
    //         snakelement.classList.add('head');
    //     }
    //     else{
    //         snakelement.classList.add('sbody');
    //     }
    //     board.appendChild(snakelement);
    // });

    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('sbody');
        }
        board.appendChild(snakeElement);
    });
    // Food Display
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}




window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir = {x : 0 , y : 1};
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});