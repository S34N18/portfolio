const playlist = [
    { title: "Song 1", artist: "Artist 1", src: "path/to/song1.mp3", art: "path/to/album-art1.jpg" },
    { title: "Song 2", artist: "Artist 2", src: "path/to/song2.mp3", art: "path/to/album-art2.jpg" },
    { title: "Song 3", artist: "Artist 3", src: "path/to/song3.mp3", art: "path/to/album-art3.jpg" },
];

let currentTrackIndex = 0;
let isPlaying = false;
const audio = new Audio();

const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const seekBar = document.getElementById('seek-bar');
const albumArt = document.getElementById('album-art');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const playlistElement = document.getElementById('playlist');

function loadTrack(index) {
    const track = playlist[index];
    audio.src = track.src;
    albumArt.src = track.art;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    updatePlaylist();
}

function updatePlaylist() {
    playlistElement.innerHTML = '';
    playlist.forEach((track, index) => {
        const li = document.createElement('li');
        li.textContent = `${track.title} - ${track.artist}`;
        li.onclick = () => {
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
            if (isPlaying) audio.play();
        };
        if (index === currentTrackIndex) {
            li.style.fontWeight = 'bold';
        }
        playlistElement.appendChild(li);
    });
}

function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = 'Play';
    } else {
        audio.play();
        playPauseBtn.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
}

playPauseBtn.onclick = togglePlayPause;

prevBtn.onclick = () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) audio.play();
};

nextBtn.onclick = () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) audio.play();
};

audio.ontimeupdate = () => {
    seekBar.value = (audio.currentTime / audio.duration) * 100 || 0;
};

seekBar.oninput = () => {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
};

audio.onended = () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    audio.play();
};

// Initialize
loadTrack(currentTrackIndex);
updatePlaylist();