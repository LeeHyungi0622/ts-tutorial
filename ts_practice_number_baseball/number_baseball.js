var body = document.body;
var candidate;
var array = [];
var hi = { a: 'b' };
// 랜덤으로 숫자 4개를 뽑아주는 함수
function chooseNumber() {
    candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    array = [];
    for (var i = 0; i < 4; i += 1) {
        var chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
}
// 랜덤으로 숫자 4개를 뽑아주는 함수 실행
chooseNumber();
console.log(array);
var result = document.createElement('div');
body.append(result);
// HTMLFormElement
var form = document.createElement('form');
body.append(form);
var input = document.createElement('input');
input.type = 'text';
input.maxLength = 4;
form.append(input);
var button = document.createElement('button');
button.textContent = '입력!';
form.append(button);
//  정답처리
var wrongCount = 0;
form.addEventListener('submit', function (event) {
    event.preventDefault();
    var answer = input.value;
    if (answer === array.join('')) {
        result.textContent = '홈런';
        input.value = '';
        input.focus();
        chooseNumber();
        wrongCount = 0;
    }
    else {
        var answerArray = answer.split('');
        var strike = 0;
        var ball = 0;
        wrongCount += 1;
        if (wrongCount > 10) {
            // 10번 넘게 틀린 경우
            result.textContent = '10번 넘게 틀려서 실패! 답은 ' + array.join(',') + '였습니다!';
            // 초기화 
            input.value = '';
            input.focus();
            chooseNumber();
            wrongCount = 0;
        }
        else {
            // 10번 미만으로 틀린 경우
            console.log("\uB2F5\uC774 \uD2C0\uB9AC\uBA74 " + answerArray);
            for (var i = 0; i <= 3; i += 1) {
                if (Number(answerArray[i]) === array[i]) {
                    // 같은 자리인지 확인
                    console.log('같은 자리?');
                    strike += 1;
                }
            }
            result.textContent = strike + "\uC2A4\uD2B8\uB77C\uC774\uD06C " + ball + "\uBCFC\uC785\uB2C8\uB2E4.";
            input.value = '';
            input.focus();
        }
    }
});
