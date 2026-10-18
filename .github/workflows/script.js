const songs = [
    {
        title: "My First Song",
        artist: "Unknown Artist",
        file: "music/song1.mp3",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d"
    },

    {
        title: "Beautiful Melody",
        artist: "Music Artist",
        file: "music/song2.mp3",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"
    },

    {
        title: "Night Vibes",
        artist: "DJ Example",
        file: "music/song3.mp3",
        cover: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b"
    }
];


const audio = document.getElementById("audio");
const playButton = document.getElementById("play");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");

const title = document.getElementById("songTitle");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const songList = document.getElementById("songList");
const searchInput = document.getElementById("searchInput");

let songIndex = 0;
let isPlaying = false;
let shuffleMode = false;
let repeatMode = false;


/* LOAD SONG */

function loadSong(index) {

    songIndex = index;

    const song = songs[songIndex];

    title.textContent = song.title;
    artist.textContent = song.artist;

    cover.src = song.cover;

    audio.src = song.file;

    updatePlaylist();
}


/* PLAY */

function playSong() {

    audio.play();

    isPlaying = true;

    playButton.innerHTML =
        '<i class="fa-solid fa-pause"></i>';
}


/* PAUSE */

function pauseSong() {

    audio.pause();

    isPlaying = false;

    playButton.innerHTML =
        '<i class="fa-solid fa-play"></i>';
}


/* PLAY BUTTON */

playButton.addEventListener("click", () => {

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }

});


/* NEXT */

nextButton.addEventListener("click", () => {

    if (shuffleMode) {

        songIndex =
            Math.floor(Math.random() * songs.length);

    } else {

        songIndex++;

        if (songIndex >= songs.length) {
            songIndex = 0;
        }

    }

    loadSong(songIndex);
    playSong();

});


/* PREVIOUS */

previousButton.addEventListener("click", () => {

    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songIndex);
    playSong();

});


/* PROGRESS */

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    const percent =
        (audio.currentTime / audio.duration) * 100;

    progress.value = percent;

    currentTime.textContent =
        formatTime(audio.currentTime);

    duration.textContent =
        formatTime(audio.duration);

});


/* SEEK */

progress.addEventListener("input", () => {

    if (!audio.duration) return;

    audio.currentTime =
        (progress.value / 100) * audio.duration;

});


/* VOLUME */

volume.addEventListener("input", () => {

    audio.volume = volume.value;

});


/* AUTO NEXT */

audio.addEventListener("ended", () => {

    if (repeatMode) {

        audio.currentTime = 0;
        playSong();

    } else {

        nextButton.click();

    }

});


/* SHUFFLE */

document.getElementById("shuffle")
    .addEventListener("click", function () {

        shuffleMode = !shuffleMode;

        this.style.color =
            shuffleMode ? "#ff3b6b" : "white";

    });


/* REPEAT */

document.getElementById("repeat")
    .addEventListener("click", function () {

        repeatMode = !repeatMode;

        this.style.color =
            repeatMode ? "#ff3b6b" : "white";

    });


/* FORMAT TIME */

function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${secs}`;
}


/* CREATE PLAYLIST */

function updatePlaylist(filteredSongs = songs) {

    songList.innerHTML = "";

    filteredSongs.forEach((song) => {

        const originalIndex =
            songs.indexOf(song);

        const div =
            document.createElement("div");

        div.className =
            "song " +
            (originalIndex === songIndex
                ? "active"
                : "");

        div.innerHTML = `

            <img src="${song.cover}" alt="">

            <div class="song-info">

                <h3>${song.title}</h3>

                <p>${song.artist}</p>

            </div>

            <i class="fa-solid fa-play"></i>

        `;

        div.addEventListener("click", () => {

            loadSong(originalIndex);
            playSong();

        });

        songList.appendChild(div);

    });

}


/* SEARCH */

searchInput.addEventListener("input", () => {

    const search =
        searchInput.value.toLowerCase();

    const filtered =
        songs.filter(song =>
            song.title.toLowerCase().includes(search) ||
            song.artist.toLowerCase().includes(search)
        );

    updatePlaylist(filtered);

});


/* INITIALIZE */

loadSong(0);