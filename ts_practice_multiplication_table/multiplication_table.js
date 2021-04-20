var numberOne = Math.ceil(Math.random() * 9);
var numberTwo = Math.ceil(Math.random() * 9);
var result = numberOne * numberTwo;
var string = 'hello';
var boolean = true;
// HTMLDivElement
var word = document.createElement('div');
word.textContent = numberOne + " X " + numberTwo;
document.body.append(word);
// HTMLFormElement
var form = document.createElement('form');
document.body.append(form);
var input = document.createElement('input');
input.type = 'number';
form.append(input);
var button = document.createElement('button');
button.textContent = '입력';
form.append(button);
var resultDiv = document.createElement('div');
document.body.append(resultDiv);
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (result === Number(input.value)) {
        resultDiv.textContent = '딩동댕';
        numberOne = Math.ceil(Math.random() * 9);
        numberTwo = Math.ceil(Math.random() * 9);
        result = numberOne * numberTwo;
        input.value = '';
        word.textContent = numberOne + " X " + numberTwo;
        input.focus();
    }
    else {
        resultDiv.textContent = '땡';
        input.value = '';
        input.focus();
    }
});
