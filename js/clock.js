const clock = document.querySelector(".clock");

function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clock.innerText = `${hours < 12 ? `${hours}` : `${hours-12}`} : ${minutes < 10 ? `0${minutes}` : `${minutes}`}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();