const allHoles = document.querySelectorAll('.hole');
const allGuac = document.querySelectorAll('.guac');
const difficulty = document.querySelectorAll('.diff');
const totalScore = document.querySelector('.score');
const startGame = document.querySelector('button');
const images = ["url('./src/images/avocado1.png') bottom center no-repeat; ", 
                "url('./src/images/cilantro1.png') bottom center no-repeat;", 
                "url('./src/images/lime1.png') bottom center no-repeat;",
                "url('./src/images/red_onion.png') bottom center no-repeat;",
            ]
let modal = document.querySelector(".modal-content");
let closeModal= document.querySelector(".close");

startGame.addEventListener('click', () => modal.classList.add('modal-active'));
closeModal.addEventListener('click', () => modal.classList.remove('modal-active'));


let score = 0;
let lost = false;

timeRange = (start, finish) => {
    return Math.round(Math.random() * (finish - start) + start);
}

randomHole = allHoles => {
    let previous;
    const idx = Math.floor(Math.random() * allHoles.length);
    const hole = allHoles[idx];
    if (hole === previous) return randomHole(allHoles)
    previous = hole;
    return hole;
}

populate = (start, finish) => {
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


start = (e) => {
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
    modal.classList.remove('modal-active')
}

hit = e => {
    debugger
    score++;
    e.currentTarget.parentNode.classList.remove('show');
    totalScore.textContent = score;
}



allGuac.forEach(guac => guac.addEventListener("click", hit));
difficulty.forEach(diff => diff.addEventListener('click',start));
