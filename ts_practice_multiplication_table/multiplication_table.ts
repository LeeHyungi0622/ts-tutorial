let numberOne = Math.ceil(Math.random() * 9);
let numberTwo = Math.ceil(Math.random() * 9);
let result = numberOne * numberTwo;
let string = 'hello';
let boolean = true;

// HTMLDivElement
const word = document.createElement('div');
word.textContent = `${numberOne} X ${numberTwo}`;
document.body.append(word);

// HTMLFormElement
const form = document.createElement('form');
document.body.append(form);

const input = document.createElement('input');
input.type = 'number';
form.append(input);

const button = document.createElement('button');
button.textContent = '입력';
form.append(button);

const resultDiv = document.createElement('div');
document.body.append(resultDiv);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (result === Number(input.value)){
        resultDiv.textContent = '딩동댕';
        numberOne = Math.ceil(Math.random() * 9);
        numberTwo = Math.ceil(Math.random() * 9);
        result = numberOne * numberTwo;
        input.value = '';
        word.textContent = `${numberOne} X ${numberTwo}`;
        input.focus();

    } else {
        resultDiv.textContent = '땡';
        input.value = '';
        input.focus();
    }
})
