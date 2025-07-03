
// get all elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// functions


function togglePlay(){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}

function updateButton(){
    toggle.textContent = this.paused ? '>' : '||';
}

function skip(){
    if(this.dataset.skip != 'full')
        video.currentTime += parseFloat(this.dataset.skip);
    else{
        video.requestFullscreen();
    }
}

function handleRangeUpdate(){
    video[this.name] = this.value;
}

function handleProgress(){
    const percent = (video.currentTime/video.duration) * 100; 
    progressBar.style.flexBasis = `${percent}%`;
}

let mdown = false;

function scrub(e){
        const scrubTime  = (e.offsetX / progress.offsetWidth)* video.duration;
        video.currentTime = scrubTime;
}
// event listeners

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mdown && scrub(e));
progress.addEventListener('mousedown', ()=>mdown = true);
progress.addEventListener('mouseup', ()=>mdown = false);
document.addEventListener('keydown', (e)=> {if(e.key == 'f') video.requestFullscreen()} );


