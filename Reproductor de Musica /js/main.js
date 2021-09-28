// Song Data // 

const songList = [

    {
        title: 'Acoustic Breeze',
        file:  'descarga.mp3',
        cover: 'descarga.jpeg' 
    },

    {
        title: 'A New Beginning',
        file:  'descarga1.mp3',
        cover: 'descarga1.jpeg' 
    },
    
    {
        title: 'Creative Minds',
        file:  'descarga2.mp3',
        cover: 'descarga2.jpeg' 
    }
];


// Cancion actual

let actualSong = null;


// Capturar elementos del DOM //

const songs = document.getElementById('songs');
const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const title = document.getElementById('title');
const play = document.getElementById('play');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
progressContainer.addEventListener('click', setProgress);

// Escuchar elemento audio 

audio.addEventListener('timeupdate', updateProgress);

// Escuchar click de los botones

play.addEventListener("click", () => {
    if (audio.paused) {
        playSong();  
    } else {
        pauseSong();
    }
});

next.addEventListener("click", () => nextSong());
prev.addEventListener("click", () => prevSong());


// Cargar y mostrar el listado de canciones 

function loadSounds() {
    songList.forEach((song, index) => {
        // Crear LI
        const li = document.createElement('LI');

        // Crear a
        const link = document.createElement('a');
       
        
        // Contenido a
        link.textContent = song.title;
        link.href = '#';

        // Escuchar Clicks
        link.addEventListener('click', () => loadSound(index));

        // Añadir a
        li.appendChild(link);
        // Añadir li a ul
        songs.appendChild(li);
    });
}

// Cargar cancion seleccinada

function loadSound(songIndex) {
    if(songIndex !== actualSong) {
        changeActiveClass(actualSong,songIndex);
        actualSong = songIndex;
        console.log(actualSong);
        audio.src = '/audio/' + songList[songIndex].file;
        playSong();
        changeCover(songIndex);
        changeTitle(songIndex);
        
    }
}

// Actualizar barra de progreso  de la cancion

function updateProgress(event) {
    const {duration, currentTime} = event.srcElement;
    const percent = (currentTime / duration) * 100;
    progress.style.width = percent + '%';
}

//  Hacer la barra de progreso clicable

function setProgress(event) {
    const totalWidth = this.offsetWidth;
    const progressWidth = event.offsetX;
    const current = (progressWidth / totalWidth) * audio.duration;
    audio.currentTime = current; 
}

// Actualizar controles

function updateControls() {
    if (audio.paused) {
        play.classList.remove("fa-pause");
        play.classList.add("fa-play");
    } else {
        play.classList.add( "fa-pause");
        play.classList.remove("fa-play");
    }
}


// Reproducir canción
function playSong() {
    if (actualSong !== null) {
        audio.play();
        updateControls();
   } 
}

// Pausar canción
function pauseSong() {
    audio.pause();
    updateControls();
}

// Cambiar clase activa

function changeActiveClass(lastIndex,newIndex) {
    const links = document.querySelectorAll('a');
   if(lastIndex !== null) {
       links[lastIndex].classList.remove('active');
   } 
    links[newIndex].classList.add('active');  
}

// Cambiar el cover de la cancion 

function changeCover(songIndex) {
    cover.src = '/img/' + songList[songIndex].cover;
}

// Cambiar el titulo de la cancion

function changeTitle(songIndex) {
    title.textContent = songList[songIndex].title;

}

// Anterior cancion

function prevSong() {
    if(actualSong > 0) {
        loadSound(actualSong -1);
    } else {
        loadSound(songList.length -1);
    }
}

// Siguiente cancion

function nextSong() {
    if(actualSong < songList.length -1) {
        loadSound(actualSong +1); 
   } else {
    loadSound(0);
   }
}

// Lanzar siguiente cancion cuando termina una.

audio.addEventListener('ended', () => nextSong());

// GO! // 
loadSounds();

