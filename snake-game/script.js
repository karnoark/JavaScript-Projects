//define HTML elements
const board = document.getElementById('game-board');


//define game variables
const gridSize = 20;
let snake = [{x:2, y:19}];
let food = generateFood();
// food = {x:2, y:5}
let direction = 'right';
let i = 10;
let speed = 200;
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
let gameStarted = false;
let foodCount = 0;
const score = document.getElementById('score');
const highScore = document.getElementById('highScore');
let highestScore = 0;

// draw game map, snake, food
function draw() {
    board.innerHTML = '';
    drawFood();
    drawSnake();
}

//draw snake
function drawSnake() {
    snake.forEach((segment) =>{
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    })
}

//create a snake or food cube
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}


//set the position of snake or food
function setPosition(obj, pos) {
    obj.style.gridColumn = pos.x;
    obj.style.gridRow = pos.y;
}

//draw food
function drawFood() {
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement)
}

function generateFood() {
    const x = Math.floor(Math.random()*gridSize) + 1;
    const y = Math.floor(Math.random()*gridSize) + 1;
    return {x,y};
}


// moving the snake
function move(){
    const head = {...snake[0]};
    // console.log(head);
    switch(direction){
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
    }
    snake.unshift(head);
    
    if (snake[0].x == food.x && snake[0].y == food.y) {
        console.log("yumm");
        foodCount++;
        score.textContent = foodCount;
        food = generateFood();  
        clearInterval(intervalID);  
        if (speed>150) {
            speed = speed - 10;
        } else if(speed>100){
            speed = speed - 5;
        } else if(speed>50){
            speed = speed -3;
        }
        console.log("speed is : " , speed);
        intervalID = setInterval(() => {
            move();
            checkCollison();
            draw();
        }, speed);
    } else {
        snake.pop();
    }
}

// checking if snake got the food or not
function checkCollison(){
    const head = snake[0];
    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        resetGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x == snake[i].x && head.y == snake[i].y) {
            resetGame();
        }
        
    }
}

//keydown event listener
document.addEventListener('keydown', (event) => {
    if (
        (!gameStarted && event.code == 'Space') || 
        (!gameStarted && event.key == ' ')
    ) {
        startGame();
    } else {
        switch (event.key) {
            case 'ArrowUp':
                console.log("Up arrow pressed");
                direction = 'up';
                break;
            
                case 'ArrowDown':
                console.log("Down arrow pressed");
                direction = 'down';
                break;
            
                case 'ArrowLeft':
                console.log("Left arrow pressed");
                direction = 'left';
                break;
            
                case 'ArrowRight':
                console.log("Right arrow pressed");
                direction = 'right';
                break;
        
            default:
                break;
        }
    }
})

// Start game function
function startGame(){
    instructionText.style.display = 'none';
    logo.style.display = 'none';
    intervalID = setInterval(() => {
        move();
        checkCollison();
        draw();
    }, speed);
    
}

// Reset the game
function resetGame(){
    stopGame();
    updateHighscore(foodCount);
    console.log("I want to reset the game");
    snake = [{x:10, y:10}];
    direction = 'right';
    speed = 200;
    updateScore();
}

function updateScore(){
    score.textContent = 0;
    foodCount = 0;
}

function updateHighscore(sc){
    highScore.style.display = 'block';
    if (sc> highestScore){
        highestScore = sc;
    }
    highScore.textContent = highestScore;
}

// function to stop the game
function stopGame(){
    clearInterval(intervalID);
    instructionText.style.display = 'block';
    logo.style.display = 'block';
}