// Main Constants
const image = document.querySelector('img')
const title = document.querySelector('#title')
const artist = document.querySelector('#artist')
const musicPlay = document.querySelector('audio')
const progressContainer = document.querySelector('#progress-container')
const progress = document.querySelector('#progress')
const currentTimeElement = document.querySelector('#current-time')
const durationElement = document.querySelector('#duration')
const prevBtn = document.querySelector('#prev')
const playBtn = document.querySelector('#play')
const nextBtn = document.querySelector('#next')

//Verify is the song is playing as soon as the app starts
let isPlaying = false

//Play the song
function playSong() {
  isPlaying = true
  playBtn.classList.replace('fa-play', 'fa-pause')
  playBtn.setAttribute('title', 'Pause')
  musicPlay.play()
}

//Stop the song
function pauseSong() {
  isPlaying = false
  playBtn.classList.replace('fa-pause', 'fa-play')
  playBtn.setAttribute('Pause', 'title')
  musicPlay.pause()
}
//Play or pause the song  event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))

// All Songs Available
const allSongs = [{

    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric',
  },

  {
    name: 'bensound-punky',
    displayName: 'Punky',
    artist: 'Bensound',
  },

  {
    name: 'bensound-acousticbreeze',
    displayName: 'Acoustic Breeze',
    artist: 'Bensound',
  },

  {
    name: 'bensound-countryboy',
    displayName: 'Country Boy',
    artist: 'Bensound',
  },

  {
    name: 'bensound-dreams',
    displayName: 'Dreams',
    artist: 'Bensound',
  },

  {
    name: 'bensound-happyrock',
    displayName: 'Happy Rock',
    artist: 'Bensound',
  },

  {
    name: 'bensound-highoctane',
    displayName: 'High Octane',
    artist: 'Bensound',
  },

  {
    name: 'bensound-smallguitar',
    displayName: 'Small Guitar',
    artist: 'Bensound',
  },

  {
    name: 'bensound-goinghigher',
    displayName: 'Going Higher',
    artist: 'Bensound',
  },

  {
    name: 'bensound-betterdays',
    displayName: 'Better Days',
    artist: 'Bensound',
  },

  {
    name: 'bensound-energy',
    displayName: 'Energy',
    artist: 'Bensound',
  },

  {
    name: 'bensound-erf',
    displayName: 'E.R.F',
    artist: 'Bensound',
  },

  {
    name: 'bensound-jazzyfrenchy',
    displayName: 'Jazzy Frenchy',
    artist: 'Bensound',
  },

  {
    name: 'bensound-onceagain',
    displayName: 'Once Again',
    artist: 'Bensound',
  },

  {
    name: 'bensound-slowmotion',
    displayName: 'Slow Motion',
    artist: 'Bensound',
  },

  {
    name: 'bensound-theelevatorbossanova',
    displayName: 'The Elevator Bossa Nova',
    artist: 'Bensound',
  },

  {
    name: 'bensound-tomorrow',
    displayName: 'Tomorrow',
    artist: 'Bensound',
  },
]

//Change  the songs info updating the DOM
function loadSongs(song) {
  title.textContent = song.displayName
  artist.textContent = song.artist
  musicPlay.src = `music/${song.name}.mp3`
  image.src = `img/${song.name}.jpg`
}

//The current song playing
let songIndex = 0

//Previous songs to play
function prevSong() {
  if (songIndex < 1) {
    songIndex = allSongs.length - 1
  }
  songIndex--
  loadSongs(allSongs[songIndex])
  playSong()
}

//Next songs to play
function nextSong() {
  songIndex++
  if (songIndex > allSongs.length - 1) {
    songIndex = 0
  }

  loadSongs(allSongs[songIndex])
  playSong()
}

//On load select the first song
loadSongs(allSongs[songIndex])

//Update progress bar and time
function updateProgressBar(e) {
  if (isPlaying) {
    const {
      duration,
      currentTime
    } = e.srcElement
    //update the progress bar
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
    //Calculates the display for duration of the song
    const durationMin = Math.floor(duration / 60)

    let durationSeconds = Math.floor(duration % 60)
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`
    }

    //Delay switching duration of the song to avoid NaN
    if (durationSeconds) {
      durationElement.textContent = `${durationMin}:${durationSeconds}`
    }
    //Calculates the display for current time  of the song
    const currentMin = Math.floor(currentTime / 60)

    let currentSeconds = Math.floor(currentTime % 60)
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`
    }

    currentTimeElement.textContent = `${currentMin}:${currentSeconds}`
  }
}
//Set the progress bar
function setProgressBar(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const {
    duration
  } = musicPlay
  musicPlay.currentTime = (clickX / width) * duration
}

//Event listeners
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
musicPlay.addEventListener('ended', nextSong)
musicPlay.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)