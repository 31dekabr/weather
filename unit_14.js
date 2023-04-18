"use strict";

let createSelect = document.createElement("select");
createSelect.classList.add('sel');

let city = [
    { id: "1526273", value: '1', name: 'Астана' },
    { id: "1526384", value: '2', name: 'Алматы' },
    { id: "610612", value: '3', name: 'Актау' },
    { id: "610611", value: '4', name: 'Актобе' },
    { id: "610529", value: '5', name: 'Атырау' },
    { id: "1516589", value: '6', name: 'Жезказган' },
    { id: "609655", value: '7', name: 'Караганда' },
    { id: "1522203", value: '8', name: 'Кокшетау' },
    { id: "1519928", value: '9', name: 'Костанай' },
    { id: "1519922", value: '10', name: 'Кызылорда' },
    { id: "1520240", value: '11', name: 'Павлодар' },
    { id: "1520172", value: '12', name: 'Петропавловск' },
    { id: "1519422", value: '13', name: 'Семей' },
    { id: "1516905", value: '14', name: 'Тараз' },
    { id: "1518542", value: '15', name: 'Талдыкорган' },
    { id: "1517945", value: '16', name: 'Туркестан' },
    { id: "608668", value: '17', name: 'Уральск' },
    { id: "1520316", value: '18', name: 'Усть-Каменогорск' },
    { id: "1518980", value: '19', name: 'Шымкент' },
]

for (let i = 0; i < city.length; i++) {

    let elem = document.createElement('option');
    elem.id = city[i].id;
    elem.text = city[i].name;
    elem.value = city[i].value;

    createSelect.append(elem);
}
document.querySelector('.select').append(createSelect);


function changeBackground() {
    let sel = document.querySelector('.sel').value;
    document.body.style.backgroundImage = `url("./IMG/${sel}.jpg")`;
}
document.querySelector('.sel').onchange = changeBackground;




//https://api.openweathermap.org/data/2.5/weather?id= &appid=4b2a441412cd40d69d03e8d936f00e87



function getK() {
    let str = '';
    let a = document.querySelectorAll('.sel option');
    for (let i = 0; i < a.length; i++) {
        if (a[i].selected) {
            str = a[i].id;
        }
    }
    return (`https://api.openweathermap.org/data/2.5/weather?id=${str}&lang=ru&appid=4b2a441412cd40d69d03e8d936f00e87`);
}

document.querySelector('.sel').addEventListener('change', function () {
    fetch(getK())
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            document.querySelector('.City').textContent = data.name;
            document.querySelector('.temp').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
            document.querySelector('.icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@4x.png">`;
            document.querySelector('.direction').innerHTML = 'направление ветра ' + data.wind.deg + '&deg;';
            document.querySelector('.description').innerHTML = data.weather[0]['description'];
            document.querySelector('.speed').innerHTML = 'скорость ветра ' + Math.round(data.wind.speed) + ' м/c';
            document.querySelector('.pressure').innerHTML = "давление " + data.main.pressure + '  гПа';
            console.log(data);
        })
        .catch(function () {
            // catch any errors
        });
});

// fetch on load
fetch(getK())
    .then(function (resp) { return resp.json() })
    .then(function (data) {
        document.querySelector('.City').textContent = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
        document.querySelector('.icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@4x.png">`;
        document.querySelector('.direction').innerHTML = 'направление ветра ' + data.wind.deg + '&deg;';
        document.querySelector('.description').innerHTML = data.weather[0]['description'];
        document.querySelector('.speed').innerHTML = 'скорость ветра ' + Math.round(data.wind.speed) + ' м/c';
        document.querySelector('.pressure').innerHTML = "давление " + data.main.pressure + '  гПа';
        console.log(data);
    })
    .catch(function () {
        // catch any errors
    });