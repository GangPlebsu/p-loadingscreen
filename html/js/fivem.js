const tips = [
    "Plebsu TOP DEV",
    "Naciśnij SPACJA, aby wyciszyć muzykę!",
    "Nowe funkcje dostępne codziennie!",
    "Sprawdź najnowsze aktualizacje!",
    "Masz pytania? Skontaktuj się z nami!",
    "Plebsu - najlepsza jakość w sieci!"
];

let currentTipIndex = 0;

function changeTip() {
    const tipsTextElement = document.getElementById("tips-text");
    tipsTextElement.textContent = tips[currentTipIndex];

    currentTipIndex = (currentTipIndex + 1) % tips.length;
}

setInterval(changeTip, 10000);
changeTip();

const staffData = [
    {
        avatar: 'https://cdn.discordapp.com/avatars/776795614402314240/aecaabbadd9c120221f078b6dbb1dfdd.webp?size=100', // link do obrazu avatara
        nickname: 'Gang Plebsu',
        role: 'Project Owner',
    },
    {
        avatar: 'https://cdn.discordapp.com/avatars/776795614402314240/aecaabbadd9c120221f078b6dbb1dfdd.webp?size=100',
        nickname: 'Druga Osoba',
        role: 'Project v-Owner',
    },
];

let currentIndex = 0;

function updateStaff() {
    const staff = staffData[currentIndex];

    document.getElementById('avatar').style.backgroundImage = `url(${staff.avatar})`;
    document.getElementById('nickname').innerText = staff.nickname;
    document.getElementById('staff-role').innerText = staff.role;

    currentIndex = (currentIndex + 1) % staffData.length;
}

setInterval(updateStaff, 10000);

window.onload = updateStaff;

const musicList = [
    { artist: "Lost Soul", title: "NBSPLV", path: "https://plebsushop.ct8.pl/fivem/audio/Soul.mp3" },
    { artist: "t.A.T.u.", title: "Нас не догонят", path: "https://plebsushop.ct8.pl/fivem/audio/nas.mp3" }
];

let audio = new Audio();
let currentSongIndex;
let isPlaying = false;

function getRandomSongIndex() {
    return Math.floor(Math.random() * musicList.length);
}

function loadAndPlaySong(index) {
    const song = musicList[index];
    audio.src = song.path;
    document.getElementById('artist').textContent = song.artist;
    document.getElementById('song').textContent = song.title;

    audio.play()
        .then(() => {
            isPlaying = true;
            updateProgressBar();
        })
        .catch(error => {
            console.log("Automatyczne odtwarzanie zablokowane:", error);
        });
}

function updateProgressBar() {
    const progressFill = document.getElementById('progress-fill');
    
    audio.ontimeupdate = () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = `${progress}%`;
    };
    
    audio.onended = () => {
        currentSongIndex = (currentSongIndex + 1) % musicList.length;
        loadAndPlaySong(currentSongIndex);
    };
}

function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        audio.play()
            .then(() => {
                isPlaying = true;
            })
            .catch(error => {
                console.log("Odtwarzanie zablokowane:", error);
            });
    }
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        togglePlayPause();
    }
});

currentSongIndex = getRandomSongIndex();
loadAndPlaySong(currentSongIndex);

document.onload = function() {
    currentSongIndex = getRandomSongIndex();
    loadAndPlaySong(currentSongIndex);
}