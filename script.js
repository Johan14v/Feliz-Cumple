/////////////////////////////////////////////////////
const confettiParticles = []
let canvas, ctx
let musicPlaying = false
let music

function initCanvas() {
  canvas = document.getElementById("confetti-canvas")
  ctx = canvas.getContext("2d")
  resizeCanvas()
}

function resizeCanvas() {
  if (canvas && ctx) {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
}

window.addEventListener("resize", resizeCanvas)

/////////////////////////////////////////////////////
class Confetti {
  constructor(x, y) {
    this.x = x || Math.random() * window.innerWidth
    this.y = y || Math.random() * window.innerHeight - window.innerHeight
    this.size = Math.random() * 5 + 6
    this.speedY = Math.random() * 1.5 + 2
    this.speedX = Math.random() * 1 - 0.5
    this.color = this.randomColor()
    this.rotation = Math.random() * 360
    this.rotationSpeed = Math.random() * 6 - 3
  }

  randomColor() {
    const colors = ["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3", "#54a0ff", "#00d2d3"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  update() {
    this.y += this.speedY
    this.x += this.speedX
    this.rotation += this.rotationSpeed

    if (this.y > window.innerHeight) {
      this.y = -10
      this.x = Math.random() * window.innerWidth
    }
  }

  draw() {
    if (!ctx) return
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate((this.rotation * Math.PI) / 180)
    ctx.fillStyle = this.color
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size)
    ctx.restore()
  }
}

/////////////////////////////////////////////////////
function initConfetti() {
  for (let i = 0; i < 35; i++) {
    confettiParticles.push(new Confetti())
  }
}

function animateConfetti() {
  if (!ctx || !canvas) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  confettiParticles.forEach((particle) => {
    particle.update()
    particle.draw()
  })

  requestAnimationFrame(animateConfetti)
}

// Confeti
document.addEventListener("click", (e) => {
  if (!canvas || confettiParticles.length >= 50) return

  for (let i = 0; i < 10; i++) {
    confettiParticles.push(new Confetti(e.clientX, e.clientY))
  }
})

function hideSplash() {
  const splashScreen = document.getElementById("splash-screen")
  const loadingScreen = document.getElementById("loading-screen")

  splashScreen.classList.add("hidden")
  loadingScreen.classList.remove("hidden")

  music = document.getElementById("background-music")
  music.play().catch((e) => console.log("Error al reproducir música:", e))
  musicPlaying = true

  setTimeout(() => {
    loadingScreen.classList.add("hidden")
    const mainContent = document.getElementById("main-content")
    mainContent.classList.remove("hidden")

    setTimeout(() => {
      initCanvas()
      initConfetti()
      animateCounters()
      animateConfetti()
    }, 100)
  }, 1500)
}

/////////////////////////////////////////////////////
function showSurprise() {
  const modal = document.getElementById("surprise-modal")
  modal.style.display = "block"

  if (confettiParticles.length < 50) {
    for (let i = 0; i < 15; i++) {
      confettiParticles.push(new Confetti(window.innerWidth / 2, window.innerHeight / 2))
    }
  }
}

/////////////////////////////////////////////////////
function closeSurprise() {
  const modal = document.getElementById("surprise-modal")
  modal.style.display = "none"
}

/////////////////////////////////////////////////////
window.onclick = (event) => {
  const modal = document.getElementById("surprise-modal")
  if (event.target === modal) {
    modal.style.display = "none"
  }
}

function toggleMusic() {
  if (!music) {
    return
  }

  const btn = document.getElementById("music-toggle")
  if (musicPlaying) {
    music.pause()
    btn.textContent = "🔇"
    musicPlaying = false
  } else {
    music.play().catch((e) => console.log("Error al reproducir música:", e))
    btn.textContent = "🔊"
    musicPlaying = true
  }
}

function animateCounters() {
  const counters = [
    { id: "days-counter", target: 365 },
    { id: "smiles-counter", target: 1000 },
    { id: "memories-counter", target: 500 },
  ]

  counters.forEach((counter) => {
    let current = 0
    const element = document.getElementById(counter.id)
    if (!element) return

    const increment = counter.target / 100
    const timer = setInterval(() => {
      current += increment
      if (current >= counter.target) {
        element.textContent = counter.target
        clearInterval(timer)
      } else {
        element.textContent = Math.floor(current)
      }
    }, 20)
  })
}

function flipCard(card) {
  card.classList.toggle("flipped")
}
