let song = [
    {
       title: 'xcho',
       music: './xcho-mir-na-dvoih-mp3.mp3',
       img: 'https://cdn.pbilet.com/origin/c069fcde-456e-49c7-b911-90a07e059aba.webp', 
    },
    {
       title: 'dvn-mozhno',
       music: './dvn-mozhno-ya-s-toboj-mp3.mp3',
       img: 'https://imageio.forbes.com/specials-images/imageserve/6691410ebf58e316b3bd024e/MTV-EMA-s-2013---Eminem-Dressing-Room-Exclusive/0x0.jpg?format=jpg&crop=2885,2163,x0,y34,safe&width=960', 
    },
    {
        title: 'Another Love',
        music: './pianovus-another-love-mp3.mp3',
        img: 'https://i.scdn.co/image/ab67616d0000b2731917a0f3f4152622a040913f', 
     },
];

let ImgPlayer = document.querySelector('#Imgplyer');
let Musictitle = document.querySelector('#Musictitle');
let songSelect = document.querySelector('#songSelect');
let prevBtn = document.querySelector('#prevBtn');
let PlayPauseBtn = document.querySelector('#PlayPouseBtn');
let nextBtn = document.querySelector('#nextBtn');
let AudioPlayer = document.querySelector('#AudioPlayer');
let progressBar = document.querySelector('#progressBar')
let BarTime = document.querySelector('#BarTime')
let audioPlayer = new Audio();

let current = 0;

function loadSong(index) {
    let currentSong = song[index];
    Musictitle.textContent = currentSong.title;
    ImgPlayer.src = currentSong.img;
    audioPlayer.src = currentSong.music;
}


function playSong() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        PlayPauseBtn.textContent = "Pause";
    } else {
        audioPlayer.pause();
        PlayPauseBtn.textContent = "Play";
    }
}

function nextSong() {
    current = (current + 1) % song.length
    console.log(current);
    loadSong(current)
    audioPlayer.play()
}
function prevSong() {
    current = (current - 1 + song.length) % song.length
    console.log(current);
    loadSong(current)
    audioPlayer.play()
}
function selectSong() {
    songSelect.innerHTML = '';
    song.forEach((item, index) => {
        let option = document.createElement('option');
        option.value = index
        option.textContent = item.title
        songSelect.appendChild(option);
    });
}

function selectongsTitleChange() {
    let selectTitle = songSelect.value
    let selectIndex = song.findIndex(item => item.title === selectTitle)
}


selectSong();
loadSong(current);
PlayPauseBtn.addEventListener('click' , playSong)
nextBtn.addEventListener('click' , nextSong)
prevBtn.addEventListener('click' , prevSong)


audioPlayer.addEventListener('timeupdate', () => {
    let progress = (audioPlayer.currentTime / audioPlayer.duration) * 100
    progressBar.value = progress || 0    
    BarTime.innerHTML = progressBar.value
})
progressBar.addEventListener('input', () => {
    let seektime = (progressBar.value / 100) * audioPlayer.duration
    audioPlayer.currentTime = seektime
})


audioPlayer.addEventListener('ended', nextSong)

songSelect.addEventListener('change', (event) => {
    current = parseInt(event.target.value);
    loadSong(current);
    playSong();
});
