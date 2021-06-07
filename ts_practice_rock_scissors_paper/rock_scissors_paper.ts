let imgCoords: RSP[keyof RSP] = '0';

interface RSP {
    ROCK: '0',
    SCISSORS: '-142px',
    PAPER: '-284px'
};

const rsp: RSP = {
    ROCK: '0',
    SCISSORS: '-142px',
    PAPER: '-284px',
} as const;

const score = {
    ROCK: 0,
    SCISSORS: 1,
    PAPER: -1,
} as const;

function computerChoice(imgCoords: RSP[keyof RSP]): 'ROCK'|'SCISSORS'|'PAPER'{
    //Object.keys(rsp);// [ROCK, SCISSORS, PAPAER]
    // 프로그래머의 재량으로 undeined 타입은 절대 나올 수 없다는 가정으로 !를 붙여준다.
    // 'ROCK', 'SCISSORS', 'PAPER'
    return (Object.keys(rsp) as ['ROCK', 'SCISSORS', 'PAPER'] ).find((k) => rsp[k] === imgCoords)! ;
}   

let interval: any;
let point: number = 0;
document.querySelectorAll('.btn').forEach((btn) => {
    // text content 가져오기
    // 1) e.target.textContent
    // 2) this로 textContent가져오기
    btn.addEventListener('click', function(this: HTMLButtonElement, e: Event){
        clearInterval(interval);
        setTimeout(intervalMaker, 2000);
        const myChoice = this.textContent as keyof RSP;
        const myScore = score[myChoice];
        const computerScore = score[computerChoice(imgCoords)];
        const diff = myScore - computerScore;
        if(diff === 0){
            console.log('비겼습니다.');
        } else if([-1, 2].includes(diff)){
            console.log('이겼습니다.');
            point++;
        } else {
            console.log('졌습니다 ㅠㅠ');
            point--;
        }
    (document.querySelector('#point') as HTMLElement).textContent = String(point);
    });
});


function intervalMaker() {
  interval = setInterval(function () {
    if (imgCoords === rsp.ROCK) {
      imgCoords = rsp.SCISSORS;
    } else if (imgCoords === rsp.SCISSORS) {
      imgCoords = rsp.PAPER;
    } else {
      imgCoords = rsp.ROCK;
    }
    if (document.querySelector('#computer')) {
      (document.querySelector('#computer') as HTMLElement).style.background = 'url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ' + imgCoords + ' 0';
    }
  }, 100);
}

intervalMaker();


// call을 써서 <반환값의 타입>
const result = Array.prototype.map.call<number[], [(item: number) => string], string[]>([1, 2, 3], (item) => {
  return item.toFixed(1);
});

// const answer = [1, 2, 3].map((item) => item.toFixed(1));
// result: ['1.0', '2,0', '3.0']
const answer = [1, 2, 3].map.call<number[], [(item: number) => string], string[]>([1, 2, 3], (item) => item.toFixed(1));