// EDIT THE WEDDING DATE HERE (month is 0-based: 11 = December)
const weddingDate = new Date(2026, 11, 14, 18, 0, 0);

const enterBtn = document.getElementById("enterBtn");
enterBtn.addEventListener("click", () => {
  document.getElementById("cover").classList.add("cover-leaving");
  document.getElementById("invitation").scrollIntoView({ behavior: "smooth" });
});

// Live countdown
function updateCountdown() {
  const now = new Date();
  let diff = Math.max(0, weddingDate.getTime() - now.getTime());
  const day = 86400000, hour = 3600000, minute = 60000;
  const values = {
    days: Math.floor(diff / day),
    hours: Math.floor((diff % day) / hour),
    minutes: Math.floor((diff % hour) / minute),
    seconds: Math.floor((diff % minute) / 1000)
  };
  Object.entries(values).forEach(([id, value]) => {
    document.getElementById(id).textContent = String(value).padStart(2, "0");
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Reveal content as it enters the viewport
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Background audio: browsers require a user click before playback.
const audio = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
let musicPlaying = false;
musicToggle.addEventListener("click", async () => {
  if (!musicPlaying) {
    try {
      await audio.play();
      musicPlaying = true;
      musicToggle.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    } catch (error) {
      alert("Add your audio file at assets/nasheed.mp3, then try again.");
    }
  } else {
    audio.pause();
    musicPlaying = false;
    musicToggle.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
  }
});

// Small floating gold particles, created without external libraries.
const particleLayer = document.querySelector(".ambient");
for (let i = 0; i < 28; i++) {
  const particle = document.createElement("span");
  particle.className = "particle";
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${Math.random() * 100}%`;
  particle.style.animationDelay = `${Math.random() * 8}s`;
  particleLayer.appendChild(particle);
}
