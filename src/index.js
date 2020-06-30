const allHoles = document.querySelectorAll('.hole');
const allGuac = document.querySelectorAll('.guac');
const difficulty = document.querySelectorAll('.diff');
const restart = document.querySelector('.play-again');
const totalScore = document.querySelector('.score');
const startGame = document.querySelector('button');
let okBtn = document.querySelector('.start-btn');


const images = ["url('./src/images/avocado1.png') bottom center no-repeat; ", 
                "url('./src/images/cilantro1.png') bottom center no-repeat;", 
                "url('./src/images/lime1.png') bottom center no-repeat;",
                "url('./src/images/red_onion.png') bottom center no-repeat;",
            ]

let audio = document.getElementById('background');
let choose = document.getElementById('choose');
let strikeSound = document.getElementById('strike-sound');
let gameOver = document.getElementById('game-over');
let restartSound = document.getElementById('restart');
let hitSound = document.getElementById('slice');



let modal = document.querySelector(".modal-content");
let endGameModal = document.querySelector(".result-modal");
let closeModal= document.querySelector(".close");
let closeModalEnd= document.querySelector(".close-end");

startGame.addEventListener('click', () => {
            lost = true
            modal.classList.add('modal-active')
        });

const restartBtn = () => {
    okBtn.classList.remove('start-btn-hidden')
    okBtn.classList.add('start-btn')
}

closeModal.addEventListener('click', () => {
    restartBtn()
    modal.classList.remove('modal-active')
});

closeModalEnd.addEventListener('click', () => {
    restartBtn()
    endGameModal.classList.remove('modal-active')
});

let score = 0;
let lost = false;
let started = false;
let strikes = [];
let clicked;

const randomHole = allHoles => {
    let previous;
    const idx = Math.floor(Math.random() * allHoles.length);
    const hole = allHoles[idx];
    if (hole === previous) {
        return randomHole(allHoles)
    }
    previous = hole;
    return hole;
}

const playMusic = () => {
    let soundOn = document.querySelector('.sound-on');
    let soundOff = document.querySelector('.sound-off')
    soundOn.addEventListener('click', () => {
        hitSound.volume = 0;
        audio.volume = 0;
        strikeSound.volume = 0;
        gameOver.volume = 0;
        choose.volume = 0;
        restartSound.volume = 0;
        soundOn.setAttribute('style', 'display: none');
        soundOff.removeAttribute('style', 'display: none');
        soundOff.setAttribute('style', 'display: flex');
    })

    soundOff.addEventListener('click', () => {
        hitSound.volume = 0.2;
        audio.volume = 0.2;
        strikeSound.volume = 0.2;
        gameOver.volume = 0.2;
        choose.volume = 0.2;
        restartSound.volume = 0.2;
        soundOff.setAttribute('style', 'display: none');
        soundOn.removeAttribute('style', 'display: none');
        soundOn.setAttribute('style', 'display: flex');
    })
}


const populate = (start) => {
    const hole = randomHole(allHoles);
    const image = images[Math.floor(Math.random() * images.length)];
    hole.firstElementChild.setAttribute("style", `background: ${image}; background-size: 50%;`);
    hole.classList.add('show');

    if (strikes.length > 4) {
        lost = true;
        gameOver.play();
        startTime();
    }

    clicked = false;

    setTimeout(() => { 
        hole.classList.remove('show');
        let strike;

        if (!clicked) {
            strikes.push('strike');
            strike = document.querySelector(`.no-strike-${strikes.length}`);
            strike.classList.remove(`no-strike-${strikes.length}`);
            strikeSound.play();
            strike.classList.add('yes-strike');  
        }
        if (!lost) populate(start);
    }, start);
}



const startTime = () => {
    let result = document.getElementById('score-new');
    let title = document.getElementById('title');

    if (lost) {
        lost = true;
        if (score === 0){
            title.innerHTML = 'Did you even try?'
        } else if (score < 10) {
            title.innerHTML = 'Not bad, you should try again!'
        } else if (score > 10 && score < 35) {
            title.innerHTML = 'Great job, keep it up!'
        } else if (score > 35) {
            title.innerHTML = 'Wooow, you are Guac-A-Mole MVP!!!!'
        }
        audio.pause();
        result.innerHTML = score;
        endGameModal.classList.add('modal-active')
    }
}

const restartGame = () => {
    lost = false;
    score = 0;
    totalScore.textContent = 0;
    playMusic();
    started = true;
    strikes = [];
    let allStrikes = Array.from(document.querySelector('.strikes').children);

    allStrikes.forEach((str, i) => {
        str.classList.remove('yes-strike');
        str.classList.add(`no-strike-${i + 1}`);
    })
}

const start = (e) => {

    restartGame();
    playMusic();
    let start;

    if (e.currentTarget.classList[1] === 'easy') {
        start = 1350;
    } else if(e.currentTarget.classList[1] === 'medium') {
        start = 1070;
    } else if (e.currentTarget.classList[1] === 'hard') {
        start = 920;
    }

    populate(start);
    modal.classList.remove('modal-active');
    startTime();
}

const hit = e => {
    hitSound.play();
    score++;
    clicked = true;
    e.currentTarget.parentNode.classList.remove('show');
    totalScore.textContent = score;
}

allGuac.forEach(guac => guac.addEventListener("click", hit));
difficulty.forEach(diff => diff.addEventListener('click', start));

difficulty.forEach(diff => diff.addEventListener('click', () => {
    choose.play()

    okBtn.classList.remove('start-btn');
    okBtn.classList.add('start-btn-hidden');
}))

restart.addEventListener('click', () => {
    lost = true
    endGameModal.classList.remove('modal-active');
    modal.classList.add('modal-active')
});