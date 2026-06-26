//Card Data
const cardsArray = [
    {
        name: 'shell',
        img : './img/blueshell.png'
    },

    {
        name : 'star',
        img : './img/star.png'
    },

    {
        name: 'mario',
        img : './img/mario.png'
    },

    {
        name : 'luigi',
        img : './img/luigi.png'
    },

    {
        name : 'bobomb',
        img : './img/bobomb.png'
    },



    {
        name : 'coin',
        img : './img/coin.png'
    },

    {
        name : 'goomba',
        img : './img/goomba.png'
    },

    {
        name : 'peach',
        img : './img/peach.png'
    },

    {
        name: 'lup',
        img : './img/1up.png'
    },

    {
        name : 'bulletbill',
        img : './img/bulletbill.png'
    },

    {
        name : 'mushroom',
        img : './img/mushroom.png'
    },

    {
        name : 'thwomp',
        img : './img/thwomp.png'
    }



]



const game = document.getElementById('game')

//Create a section with class name grid

const grid = document.createElement('section')

grid.setAttribute('class','grid')

//append child in game div
game.appendChild(grid)

//----- New: grab the stat elements + win overlay -----
const timerEl = document.getElementById('timer')
const movesEl = document.getElementById('moves')
const scoreEl = document.getElementById('score')
const restartBtn = document.getElementById('restart')
const winMessage = document.getElementById('win-message')
const winStats = document.getElementById('win-stats')
const playAgainBtn = document.getElementById('play-again')

const totalPairs = cardsArray.length // 12


let moves = 0;
let matchesFound = 0;
let secondsElapsed = 0;
let timerInterval = null;
let timerStarted = false;

const startTimer = ()=>{
    if(timerStarted) return; // only start once per game

    timerStarted = true;
    timerInterval = setInterval(()=>{
        secondsElapsed++;
        timerEl.textContent = secondsElapsed + 's'
    },1000)
}

const stopTimer = ()=>{
    clearInterval(timerInterval)
    timerInterval = null;
}


const updateMoves = ()=>{
    movesEl.textContent = moves;
}


const updateScore = ()=>{
    scoreEl.textContent = matchesFound + ' / ' + totalPairs;
}


const checkWin = ()=>{
    if(matchesFound === totalPairs){
        stopTimer();

        winStats.textContent = `You finished in ${secondsElapsed}s using ${moves} moves.`
        winMessage.classList.remove('hidden')
    }
}

//for each loop for cardsArray
/* cardsArray.forEach((item)=>{
    const card = document.createElement('div','card')

    card.classList.add('card')

    //set the data-name attribute
    card.dataset.name = item.name 

    card.style.backgroundImage = `url(${item.img})`

    grid.appendChild(card)
}) */

let gameGrid = [];


const buildBoard = ()=>{
    
    grid.innerHTML = '';

    gameGrid = cardsArray.concat(cardsArray);

    gameGrid.sort(()=> 0.5 - Math.random())

    gameGrid.forEach((item)=>{
        const card = document.createElement('div')

        card.classList.add('card')

        
        card.dataset.name = item.name 

        

        const front = document.createElement('div');
        front.classList.add('front')

        const back = document.createElement('div')
        back.classList.add('back')

        back.style.backgroundImage = `url(${item.img})`;


        grid.appendChild(card)
        card.appendChild(front)
        card.appendChild(back)
    })
}

buildBoard();

let count  = 0;

let firstGuess = ''
let secondGuess = ''
let previoustarget = null;

let delay = 1200;

const match = ()=>{
    var selected = document.querySelectorAll('.selected')

    selected.forEach((card)=>{
        card.classList.add('match')
    })

   
    matchesFound++;
    updateScore();
    checkWin();
}

const resetGuess = ()=>{
    firstGuess = '';
    secondGuess = ''
    count = 0;

    var selected = document.querySelectorAll('.selected')
    selected.forEach((card)=>{
        card.classList.remove('selected')
    })
}



grid.addEventListener('click', function(event){
    let clicked = event.target

    if(clicked.nodeName === 'SECTION' || clicked === previoustarget || clicked.parentNode.classList.contains('selected')){
        return 
    }

    
    if(clicked.parentNode.classList.contains('match')){
        return
    }

   
    startTimer();

    if(count<2){
        count++;

        if(count === 1){
            firstGuess = clicked.parentNode.dataset.name

            console.log(firstGuess)
            clicked.parentNode.classList.add('selected')
        }
        else{
            secondGuess = clicked.parentNode.dataset.name

            console.log(secondGuess);
            
            clicked.parentNode.classList.add('selected')

           
            moves++;
            updateMoves();
        }

        if(firstGuess !== '' && secondGuess !== ''){
            if(firstGuess === secondGuess){
                // match()
                // resetGuess()

                setTimeout(match,delay)
                setTimeout(resetGuess,delay);
            }
            else{
                // resetGuess();
                setTimeout(resetGuess,delay);
            }

        }

        //set previous target to clicked; 
        previoustarget = clicked
        console.log(previoustarget);
    }
})


const restartGame = ()=>{
    stopTimer();

    moves = 0;
    matchesFound = 0;
    secondsElapsed = 0;
    timerStarted = false;

    count = 0;
    firstGuess = '';
    secondGuess = '';
    previoustarget = null;

    timerEl.textContent = '0s';
    updateMoves();
    updateScore();

    winMessage.classList.add('hidden')

    buildBoard();
}

restartBtn.addEventListener('click', restartGame)
playAgainBtn.addEventListener('click', restartGame)
