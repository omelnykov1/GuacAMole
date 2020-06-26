const allHoles = document.querySelectorAll('.hole');
const allGuac = document.querySelectorAll('.guac');
const difficulty = document.querySelectorAll('.diff');
const restart = document.querySelector('.play-again');
const totalScore = document.querySelector('.score');
const startGame = document.querySelector('button');
const images = ["url('./src/images/avocado1.png') bottom center no-repeat; ", 
                "url('./src/images/cilantro1.png') bottom center no-repeat;", 
                "url('./src/images/lime1.png') bottom center no-repeat;",
                "url('./src/images/red_onion.png') bottom center no-repeat;",
            ]
// modals

let modal = document.querySelector(".modal-content");
let endGameModal = document.querySelector(".result-modal");
let closeModal= document.querySelector(".close");
let closeModalEnd= document.querySelector(".close-end");

startGame.addEventListener('click', () => {
            lost = true
            modal.classList.add('modal-active')
            });

closeModal.addEventListener('click', () => modal.classList.remove('modal-active'));
closeModalEnd.addEventListener('click', () => modal.classList.remove('modal-active'));

let score = 0;
let lost = false;


const timeRange = (start, finish) => {
    return Math.round(Math.random() * (finish - start) + start);
}

const randomHole = allHoles => {
    let previous;
    const idx = Math.floor(Math.random() * allHoles.length);
    const hole = allHoles[idx];
    if (hole === previous) return randomHole(allHoles)
    previous = hole;
    return hole;
}

const populate = (start, finish) => {
    // debugger
    const time = timeRange(start, finish);
    const hole = randomHole(allHoles);
    const image = images[Math.floor(Math.random() * images.length)]
    hole.firstElementChild.setAttribute("style", `background: ${image};background-size: 50%;`)
    hole.classList.add('show');
    let clicked = false

    setTimeout(() => { hole.classList.remove('show');
            if (!lost) populate(start, finish);
            }, time);

}

const startTime = () => {
    const startMin = 1;
    let mins = startMin * 60;
    const timer = document.getElementById('clock');
    
    const x = setInterval(() => {
        let minutes = Math.floor(mins / 60);
        let seconds = mins % 60;
    
        seconds = seconds < 10 ? '0' + seconds : seconds;
    
        timer.innerHTML = `${minutes} : ${seconds}`;
        mins--;
        let result = document.getElementById('score-new');
        let title = document.getElementById('title')
        if (mins < 0) {
            lost = true;
            clearInterval(x)
            if (score < 10) {
                title.innerHTML = 'Not bad, you should try again'
            } else if (score > 10 && score < 35) {
                title.innerHTML = 'Great job, keep it up!'
            } else if (score > 35) {
                title.innerHTML = 'Wooow, you are Guac-A-Mole MVP!!!!'
            }
            result.innerHTML = score;
            endGameModal.classList.add('modal-active')
        }
    }, 1000)
}

const start = (e) => {
    // debugger
    lost = false;
    score = 0;
    let start;
    let finish;
    totalScore.textContent = 0;
    if (e.currentTarget.classList[1] === 'easy') {
        start = 500;
        finish = 1300;
    } else if(e.currentTarget.classList[1] === 'medium') {
        start = 400;
        finish = 1000;
    } else if (e.currentTarget.classList[1] === 'hard') {
        start = 200;
        finish = 600;
    }
    populate(start, finish);
    modal.classList.remove('modal-active');
    startTime();
    
}

const hit = e => {
    score++;
    e.currentTarget.parentNode.classList.remove('show');
    totalScore.textContent = score;
}


allGuac.forEach(guac => guac.addEventListener("click", hit));
difficulty.forEach(diff => diff.addEventListener('click',start));
restart.addEventListener('click', () => {
    lost = true
    endGameModal.classList.remove('modal-active');
    modal.classList.add('modal-active')
});