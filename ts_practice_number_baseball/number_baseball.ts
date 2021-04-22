const { body } = document;
let candidate: number[];
let array: number[] = [];

// type 선언하기
interface hello {
    a: string;
    b?: number;
}

interface helloChild extends hello {
    c?: boolean;
}

type stringOrNumber = string | number;

const hi: hello = { a: 'b'};

// 랜덤으로 숫자 4개를 뽑아주는 함수
function chooseNumber(){
    candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    array = [];
    for(let i: number = 0; i < 4; i += 1){
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
}

// 랜덤으로 숫자 4개를 뽑아주는 함수 실행
chooseNumber();

console.log(array);

const result = document.createElement('div');
body.append(result);

// HTMLFormElement
const form = document.createElement('form');
body.append(form);

const input = document.createElement('input');
input.type = 'text';
input.maxLength = 4;
form.append(input);

const button = document.createElement('button');
button.textContent = '입력!';
form.append(button);

//  정답처리
let wrongCount = 0;
form.addEventListener('submit', (event) => {
    event.preventDefault();   
    const answer = input.value;
    if(answer === array.join('')){
        result.textContent = '홈런';
        input.value = '';
        input.focus();
        chooseNumber();
        wrongCount = 0;
    } else {
        const answerArray = answer.split('');
        let strike = 0;
        let ball = 0;
        wrongCount += 1;
        if(wrongCount > 10){
            // 10번 넘게 틀린 경우
            result.textContent = '10번 넘게 틀려서 실패! 답은 '+array.join(',')+'였습니다!';
            // 초기화 
            input.value = '';
            input.focus();
            chooseNumber();
            wrongCount = 0;
        } else {
            // 10번 미만으로 틀린 경우
            console.log(`답이 틀리면 ${answerArray}`)
            for(let i: number = 0; i <= 3; i += 1){
                if(Number(answerArray[i]) === array[i]){
                    // 같은 자리인지 확인
                    console.log('같은 자리?');
                    strike += 1;
                }
            }
            result.textContent = `${strike}스트라이크 ${ball}볼입니다.`;
            input.value = '';
            input.focus();
        }

    }
});