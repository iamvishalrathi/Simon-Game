let gameSeq= [];
let userSeq= [];

let highScore=0;

let level = 0;
let started = false;

let color= ["red", "green", "purple", "yellow"]; //To choose random color

//Step1 : Game Started
document.addEventListener("keypress", function(){
    if (started===false) { //Ensure game started once only
        console.log("Game Started");
        started=true;

        levelUp();
    }
});

let h3 = document.querySelector("h3");

//Step 2 : Level Up & Random Btn Choose
function levelUp(){
    userSeq=[]; //Make userSeq empty
    level++;
    h3.innerText= `Level ${level}`;

    //Random button choose
    let randIdx= Math.floor(Math.random()*3);
    let randColor= color[randIdx];
    let randBtn= document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

//Step 3 : User Press Btn
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function btnPress(){
    let btn= this;
    userFlash(btn);

    let usercolor= btn.getAttribute("id");
    userSeq.push(usercolor);

    checkAns(userSeq.length-1);
}

let allBtns= document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

//Step 4 : Matching Sequence
function checkAns(idx){
    if (userSeq[idx]===gameSeq[idx]) {
        if (userSeq.length=== gameSeq.length) { //Level is Up only when all the userSeq
            // matches with gameSeq
            setTimeout(levelUp,1000);
        }
    } else{
        if (highScore<level) {
            highScore=level;
        }
        h3.innerHTML=`Game Over! <br>Your Score: <b>${level}</b> <br>Highest Score: 
        <b>${highScore}</b> <br>Press Any Key to Start`;
        

        //Ganme Over Signal
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="#808080";
        },150);

        reset();
    }
}

//Step 5 : Reset
function reset(){
    started= false;
    gameSeq=[];
    userSeq=[];
    level=0;
}

//i button
let i = document.querySelector(".i");
let howto = document.querySelector(".howto");
let btncontainer = document.querySelector(".btn-container");
i.addEventListener("click", function () {
    howto.style.display = "block";
    document.querySelector("body").style.backgroundColor = "#36454F";
    btncontainer.style.display = "none";
    h3.style.display = "none";
});

document.addEventListener("click", function (event) {
    if (!howto.contains(event.target) && event.target !== i) {
        howto.style.display = "none";
        document.querySelector("body").style.backgroundColor = "#808080";
        btncontainer.style.display = "flex";
        h3.style.display = "block";
    }
});

let closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", function () {
    howto.style.display = "none";
    document.querySelector("body").style.backgroundColor = "#808080";
    btncontainer.style.display = "flex";
    h3.style.display = "block";
});