window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    let title = document.querySelector('.title'),
        category = document.querySelector('.category'),
        inputCategory = document.getElementsByName('section1'),
        inputCars = document.getElementsByName('section2'),
        descr = document.querySelector('.descr'),
        price = document.querySelector('.price'),
        imgCar = document.querySelector('.img-car');


    let request = new XMLHttpRequest();

    request.open('GET', 'js/cars.json');
    request.setRequestHeader('Content-type', 'application/json: charset=utf-8');
    request.send();

    request.addEventListener('readystatechange', function () {
        if (request.readyState === 4 && request.status == 200) {
            let data = JSON.parse(request.response);

            let categoryAll = removeDuplicates(data.cars, 'category');

            function removeDuplicates(myArr, prop) {
                return myArr.filter((obj, pos, arr) => {
                    return arr.map(mapObj =>
                        mapObj[prop]).indexOf(obj[prop]) === pos;
                });
            }
            for (let i = 0; i < categoryAll.length; i++) {
                category.innerHTML += `<input type="radio" value="${categoryAll[i].category}" class="item-boxing radio-item" data-edition="" id="category${i}" name="section1" /><label for="category${i}">${categoryAll[i].category}</label></br>`;
            }

            for (let i = 0; i < data.cars.length; i++) {
                if (data.cars[i].category == 'germany') {
                    title.innerHTML += `<input type="radio" value="${data.cars[i].name}" class="item-boxing radio-item" data-edition="" id="car${i}" name="section2" /><label for="car${i}">${data.cars[i].name}</label></br>`;
                }
            }
            inputCategory[0].setAttribute('checked', true);
            inputCars[0].setAttribute('checked', true);
            descr.innerHTML = data.cars[0].description;
            price.innerHTML = data.cars[0].price + ' $';
            imgCar.src = data.cars[0].img;

            category.addEventListener('change', function (event) {
                title.innerHTML = '';
                for (let i = 0; i < data.cars.length; i++) {
                    if (data.cars[i].category == event.target.value) {
                        title.innerHTML += `<input type="radio" value="${data.cars[i].name}" class="item-boxing radio-item" data-edition="" id="car${i}" name="section2" /><label for="car${i}">${data.cars[i].name}</label></br>`;
                    }
                }
                inputCars[0].setAttribute('checked', true);
                for (let i = 0; i < data.cars.length; i++) {
                    if (data.cars[i].name == inputCars[0].value) {
                        descr.innerHTML = data.cars[i].description;
                        price.innerHTML = data.cars[i].price+ ' $';
                        imgCar.src = data.cars[i].img;
                    }
                }
            });
            title.addEventListener('change', function (event) {
                for (let i = 0; i < data.cars.length; i++) {
                    if (data.cars[i].name == event.target.value) {
                        descr.innerHTML = data.cars[i].description;
                        price.innerHTML = data.cars[i].price+ ' $';
                        imgCar.src = data.cars[i].img;
                    }
                }
            });
        }


    });

});