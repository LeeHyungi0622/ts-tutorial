"use strict";
var imgCoords = '0';
;
var rsp = {
    ROCK: '0',
    SCISSORS: '-142px',
    PAPER: '-284px'
};
var score = {
    ROCK: 0,
    SCISSORS: 1,
    PAPER: -1
};
function computerChoice(imgCoords) {
    //Object.keys(rsp);// [ROCK, SCISSORS, PAPAER]
    // 프로그래머의 재량으로 undeined 타입은 절대 나올 수 없다는 가정으로 !를 붙여준다.
    // 'ROCK', 'SCISSORS', 'PAPER'
    return Object.keys(rsp).find(function (k) { return rsp[k] === imgCoords; });
}
var interval;
var point = 0;
document.querySelectorAll('.btn').forEach(function (btn) {
    // text content 가져오기
    // 1) e.target.textContent
    // 2) this로 textContent가져오기
    btn.addEventListener('click', function (e) {
        clearInterval(interval);
        setTimeout(intervalMaker, 2000);
        var myChoice = this.textContent;
        var myScore = score[myChoice];
        var computerScore = score[computerChoice(imgCoords)];
        var diff = myScore - computerScore;
        if (diff === 0) {
            console.log('비겼습니다.');
        }
        else if ([-1, 2].includes(diff)) {
            console.log('이겼습니다.');
            point++;
        }
        else {
            console.log('졌습니다 ㅠㅠ');
            point--;
        }
        document.querySelector('#point').textContent = String(point);
    });
});
function intervalMaker() {
    interval = setInterval(function () {
        if (imgCoords === rsp.ROCK) {
            imgCoords = rsp.SCISSORS;
        }
        else if (imgCoords === rsp.SCISSORS) {
            imgCoords = rsp.PAPER;
        }
        else {
            imgCoords = rsp.ROCK;
        }
        if (document.querySelector('#computer')) {
            document.querySelector('#computer').style.background = 'url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ' + imgCoords + ' 0';
        }
    }, 100);
}
intervalMaker();
