const form = document.querySelector('.form');
const button = document.querySelector('.button');
const levels = Array.from(document.querySelectorAll('.level'));
const numbers = Array.from(document.querySelectorAll('.number'));

//--- сохраняем выбранный уровень сложности в глобальное состояние
for (let i = 0; i < levels.length; i++) {
    levels[i].addEventListener('click', () => {
        console.log(`${levels[i].name}: ${levels[i].value}`);
        localStorage.setItem('level', levels[i].value);
    })
}

//--- логика ответа интерфейса на выбор уровня
for (let j = 0; j < numbers.length; j++) {
    numbers[j].addEventListener('click', () => {
        numbers[j].classList.contains('number__chosen') ?
            numbers[j].classList.remove('number__chosen') :
            numbers[j].classList.add('number__chosen');

        let previousSiblings = getAllPreviousSiblings(numbers[j]);
        let nextSiblings = getAllNextSiblings(numbers[j]);

        previousSiblings.forEach(sibling => {
            if (sibling.classList.contains('number__chosen')) {
                sibling.classList.remove('number__chosen');
            }
        })

        nextSiblings.forEach(sibling => {
            if (sibling.classList.contains('star__checked')) {
                sibling.classList.remove('star__checked');
            };
        })
    })
}

function getAllPreviousSiblings(element){
    let result = [];
    while(element.previousElementSibling) {
        result.push(element = element.previousElementSibling);
    }
    return result;
}

function getAllNextSiblings(element){
    let result = [];
    while(element.nextElementSibling) {
        result.push(element = element.nextElementSibling);
    }
    return result;
}

//--- валидация и сбор значений
function getFieldValue(fieldElement) {
    const controls = fieldElement.querySelectorAll('.field__control');

    if (controls.length === 1) {  
        const control = controls[0];
        const key = control.name;
        const value = control.value;
        return { [key] : value };  
    }

    for (const control of controls) {
        const key = control.name;
        if (control.checked) {
            return { [key] : control.value };                 
        }
    }

    const key = controls[0].name;
    return { [key] : undefined };
};

//--- валидация формы выбора уровня
form.addEventListener('submit', function(event) { 
    const formTarget = event.target;

    const fields = formTarget.querySelectorAll('.form__field');

    let result = {};  

    fields.forEach(field => {
        result = {
            ...result,
            ...getFieldValue(field),
        };
    });

    if (result.level === undefined) {
        event.preventDefault();
        alert('Сначала выбери сложность!');
    } else {
        console.log(result);
    }
});




