console.log('he');

document.getElementById('categories-field').addEventListener('click', function (event) {
    const number = event.target.innerText;
    console.log(number);
    const childNum = event.target.parentElement.childElementCount;
    console.log(childNum)
});