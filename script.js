////////////Variables And Objects and Arrays (declaration start)/////////
let inputDir = {x:0,y:0};
let lastPaintTime = 0;
let speed = 7;
let score = 0;
        //////Snake element, initially only Head which ==snakeArr[0] i.e,first object of array////////
let snakeArr = [{x:9,y:9}];
     //////Food element////
let food = {x:10,y:10};
const foodSound = new Audio("./resources/food.mp3");
const gameOverSound = new Audio("./resources/gameover.mp3");
const moveSound = new Audio("./resources/move.mp3");
const musicSound = new Audio("./resources/music.mp3")
////////////Variables And Objects and Arrays (declaration End)/////////

////////////////////////MAIN////starts////////////////////////
    /////Game Functions
   
    const main = (ctime) => { 
        window.requestAnimationFrame(main);
        if ( ((ctime-lastPaintTime)/1000) < 1/speed) {
            return;
        }
        lastPaintTime = ctime;
        gameEngine();
    }
    ////////Game Over Logic oR collision///
    const isCollide = (snakeArr) => {
        ///for snake colliding into itself
        for(i=1 ; i<snakeArr.length ; i++){
            if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y ===snakeArr[0].y){
                return true;
            }
        }
        ///for snake colliding with the boundary wall
        if (snakeArr[0].x >= 18 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0 || snakeArr[0].x <= 0 ) {
            return true;
        }
         else {
            return false;
        }
    }
    ///////Game engine///////
    const gameEngine = () => {
        if(isCollide(snakeArr)){
            musicSound.pause();
            gameOverSound.play();
            gameContainer.innerHTML = "";
            alert(`Game Over`);
            inputDir={x:0,y:0};
            snakeArr = [{x:9,y:9}];
            score = 0;
            scoreHead.innerHTML =`Score:${score}`;
            speed = 7;
        }

        ///After food had consumed, regenerating new food and incrementing Snake
        if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
            speed+=1;
            score+=5;
            scoreHead.innerHTML = `Score:${score}`;
            foodSound.play();
            snakeArr.unshift({ x : snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y})
            let max = 16;
            let min = 2;
            food = { x: Math.floor(Math.random() * (max - min) + min) , y: Math.floor(Math.random() * (max - min) + min)}
        }

        //////MOving the SNAKE
        for (let i = snakeArr.length - 2 ; i>=0 ; i--) {
            snakeArr[i+1] = {...snakeArr[i]};
        }
        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;

        ///////displaying the snake element
            gameContainer.innerHTML = "";
            snakeArr.forEach( (elem,index) => {
                snakeElement = document.createElement('div');
                snakeElement.style.gridRowStart = elem.y;
                snakeElement.style.gridColumnStart = elem.x;

            if (index === 0) {
                snakeElement.classList.add("head");
                
            } else {
                snakeElement.classList.add("snake");
            }
            gameContainer.appendChild(snakeElement);
        });

        ///displaying the food element
            foodElement = document.createElement('div');
            foodElement.style.gridRowStart = food.y;
            foodElement.style.gridColumnStart = food.x;
            foodElement.classList.add("food");
            gameContainer.appendChild(foodElement);

    }
///////////////main logic Starts////////////////////////
startButton.addEventListener('click', () => {
    inputDir = {x:0 , y:1}  //snake will move either in x axis when y=0 or y axis when x=0
    musicSound.play();
    window.requestAnimationFrame(main);
    window.addEventListener('keydown', e => {
    switch (e.key) {
        case "ArrowUp":
            moveSound.play();
            inputDir.x=0
            inputDir.y=-1
            break;
        case "ArrowDown":
            moveSound.play();
            inputDir.x=0
            inputDir.y=1
            break;
        case "ArrowLeft":
            moveSound.play();
            inputDir.x=-1
            inputDir.y=0
            break;
        case "ArrowRight":
            moveSound.play();
            inputDir.x=1
            inputDir.y=0
            break;
            
        default:
            break;
    }
})
})

