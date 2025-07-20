
let countDown;

const timerDisplay = document.querySelector('.display__time-left');

const buttons = document.querySelectorAll('[data-time]');

const form = document.customForm;

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    timer(parseInt(form.minutes.value)*60);
    form.reset();
});

buttons.forEach(
    button => button.addEventListener('click', startTimer)
);

function startTimer(){
   timer(parseInt(this.dataset.time));
}

function timer(seconds){

    clearInterval(countDown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds)
    displayEndTime(then);
    countDown = setInterval(()=>{
        const secondsLeft = (then - Date.now())/1000;
        if(secondsLeft < 0){
            timerDisplay.textContent = '00 : 00 : 00';
            clearInterval(countDown);
            return;
        }
        displayTimeLeft(secondsLeft)
    }, 1000);

    
}

function displayTimeLeft(seconds){
    const hours  = Math.floor(seconds/3600);
    const mins = Math.floor((seconds - hours*3600)/60);
    const secs = Math.ceil(seconds - hours*3600 - (mins * 60));
    const display = `${hours < 10 ? '0' + hours : hours} : ${mins < 10? '0' + mins : mins} : ${secs < 10 ? '0' + secs: secs}`;
    timerDisplay.textContent = display;
}

function displayEndTime(timeStamp){
    const beBack = document.querySelector('.display__end-time');
    const time = new Date(timeStamp);
    const hrs = time.getHours();
    const min = time.getMinutes();
    const sec = time.getSeconds();
    beBack.textContent = `Be back at: ${hrs>12? hrs - 12 : hrs}:${min < 10 ? '0' + min : min} ${hrs>= 12? 'PM' : 'AM'}`;
}

