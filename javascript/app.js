var keyPress;
var keyValueTB = 8;
var keyValueLF = 2;
var player = document.getElementById("player")
var ground = document.getElementById("ground")
console.log(player.getBoundingClientRect())

function keydoon(){
 console.log()   
}

document.addEventListener("keydown", function () {
    if (event.keyCode === 40 || event.keyCode === 83) {
        keyValueTB = keyValueTB + 2;
        setTimeout(function () {
            player.style.transform = "scaleX(-1)"
        }, 1000)
        player.style.transform = "rotate(270deg)"
    }
     else if (event.keyCode === 38 || event.keyCode === 87) {
        keyValueTB = keyValueTB - 2
        setTimeout(function () {
            player.style.transform = "scaleX(-1)"
        }, 1000)
        player.style.transform = "rotate(90deg)"
    }
    else if (event.keyCode === 39 || event.keyCode === 68) {
        keyValueLF = keyValueLF + 1;
        player.style.transform = "scaleX(-1)"
    } 
    else if (event.keyCode === 37 || event.keyCode === 65) {
        keyValueLF = keyValueLF - 1
        setTimeout(function () {
            player.style.transform = "scaleX(-1)";
        }, 1000)
        player.style.transform = "scaleX(1)";
    }

    if (keyValueTB < 8) {
        keyValueTB = 8;
    } else if (keyValueTB > 80) {
        keyValueTB = 80
    }

    if (keyValueLF < 2) {
        keyValueLF = 2;
    } else if (keyValueLF > 90) {
        keyValueLF = 90
    }
    player.style.top = keyValueTB + "%";
    player.style.left = keyValueLF + "%";
})



var enemyCreate;
function createEnemy() {
    var randomEnemy = Math.ceil(Math.random() * 3)

    enemyCreate = document.createElement("div")
    if (randomEnemy === 1) {
        enemyCreate.classList.add("enemy-1")
    }
    else if (randomEnemy === 2) {
        enemyCreate.classList.add("enemy-2")

    } else {
        enemyCreate.classList.add("enemy-3")
    }

    return enemyCreate
}


var position;
function randomPostitons() {
    var randomPositions = Math.ceil(Math.random() * 5)
    if (randomPositions === 1) {
        position = 8;
    } else if (randomPositions === 2) {
        position = 20;
    } else if (randomPositions === 3) {
        position = 40;
    } else if (randomPositions === 4) {
        position = 56;
    } else {
        position = 78;
    }
    return position
}

var score = 0;
var enemies = [];
var randomPosition;
var start;
var enemy;
function enemyStartCreate() {
    start = setInterval(function () {
        enemy = createEnemy();
        enemies.push(enemy)
        randomPosition = randomPostitons() + "%";
        enemy.style.top = randomPosition;
        ground.appendChild(enemy);
        moveEnemy(enemy);
    }, 4500)
}
enemyStartCreate() //---------> animi create animation

var scoreTraget = document.getElementById("score")
var randomPositionTB;
var crashed = false;


function moveEnemy(enemy) {
    randomPositionTB = randomPostitons()
    var randomPositionLF = 83;
    var interval = setInterval(function () {
        if (randomPositionLF <= 1) {
            clearInterval(interval);
            enemy.remove();
            score++
        } else {
            randomPositionLF--;
            enemy.style.left = randomPositionLF + "%";
        }
        if (isColliding(player, enemy)) {
            crashed = true;
            alert("*** TRY AGAIN *** \n" + "score : " + score);
            clearInterval(interval);
            clearInterval(timer)
            clearInterval(start);
            enemies.forEach(function (enemy) {
                enemy.remove();
            })
            enemies = [];
            console.log("hello")
        }
        
        scoreTraget.innerHTML = score;
    }, 60)
}



function isColliding(element1, element2) {
    var react1 = element1.getBoundingClientRect();
    var react2 = element2.getBoundingClientRect();

    return !(react1.right < react2.left || react1.left > react2.right || react1.bottom < react2.top || react1.top > react2.bottom)
}


var timer;
var sec = 59;
min = 1

var setTimer = document.getElementById("timer")
function time() {
    timer = setInterval(function () {
        setTimer.innerHTML = min + ":" + sec;
        sec--
        if (sec < 0) {
            sec = 59;
            min--
        }
        if (min < 0) {
            alert("timer up \n" + "score : " + score)
            clearInterval(interval);
            clearInterval(timer)
            clearInterval(start);
            enemies.forEach(function (enemy) {
                enemy.remove();
            })
            enemies = [];
        }
    }, 1000)
}
time()

