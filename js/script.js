
const bg1 = document.querySelector('.bg1');
const bg2 = document.querySelector('.bg2');
const images = [
  'img/GALERIA/img1.webp',
  'img/GALERIA/img4.webp',
  'img/GALERIA/img6.webp',
  'img/GALERIA/img8.webp'
];

let current = 0;
let showingBg1 = true;

function changeBackground() {
  const next = (current + 1) % images.length;

  if (showingBg1) {
    bg2.style.backgroundImage = `url(${images[next]})`;
    bg2.classList.add('active');
    bg1.classList.remove('active');
  } else {
    bg1.style.backgroundImage = `url(${images[next]})`;
    bg1.classList.add('active');
    bg2.classList.remove('active');
  }

  showingBg1 = !showingBg1;
  current = next;
}

bg1.style.backgroundImage = `url(${images[0]})`;
bg1.classList.add('active');
setInterval(changeBackground, 5000);

function cargarVideoAbout() {
  const container = document.getElementById('videoAboutContainer');
  const esMobile = window.innerWidth <= 768;

  const video = document.createElement('video');
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = "auto";
  video.setAttribute("style", "width: 100%; border-radius: 20px; box-shadow: 10px 15px 25px rgba(0,0,0,0.5)");

  const source = document.createElement('source');
  source.src = 'img/ABOUT/VideoAbout.mp4';
  source.type = 'video/mp4';
  video.appendChild(source);

  video.style.maxWidth = esMobile ? "100%" : "360px";
  container.appendChild(video);
}

window.addEventListener('DOMContentLoaded', cargarVideoAbout);

const menu = document.querySelector(".menu");
const menuLinks = document.querySelectorAll(".menu-items a");
const sections = document.querySelectorAll("section");
const logosNegros = document.querySelectorAll(".logo-negro, .fb-negro, .ig-negro, .wa-negro");
const logosBlancos = document.querySelectorAll(".logo-blanco, .fb-blanco, .ig-blanco, .wa-blanco");

function updateMenuVisual(sectionId) {
  if (sectionId === "cursos" || sectionId === "contacto") {
    menu.classList.remove("menu-light");
    menu.classList.add("menu-dark");
    logosNegros.forEach(el => el.style.display = "none");
    logosBlancos.forEach(el => el.style.display = "inline");
  } else {
    menu.classList.remove("menu-dark");
    menu.classList.add("menu-light");
    logosNegros.forEach(el => el.style.display = "inline");
    logosBlancos.forEach(el => el.style.display = "none");
  }
}

function highlightMenuLink(sectionId) {
  menuLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${sectionId}`) {
      link.classList.add("active");
    }
  });
}

function onScroll() {
  const scrollY = window.scrollY + window.innerHeight / 3;

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollY >= top && scrollY < bottom) {
      updateMenuVisual(id);
      highlightMenuLink(id);
    }
  });
}

window.addEventListener("scroll", onScroll);
window.addEventListener("load", onScroll);

menuLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute("href").substring(1);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    highlightMenuLink(sectionId);
  });
});


const hamburgerBtns = document.querySelectorAll('.hamburger-btn');
const hamburgerIcon = document.getElementById('hamburgerIcon');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');

function toggleMenu() {
  mobileMenu.classList.toggle('active');
  mobileOverlay.classList.toggle('active');
}

hamburgerBtns.forEach(btn => {
  btn.addEventListener('click', toggleMenu);
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', toggleMenu);
});

mobileOverlay.addEventListener('click', toggleMenu);

function updateHamburgerIcon(sectionId) {
  const isDark = menu.classList.contains('menu-dark');
  if (hamburgerIcon) {
    hamburgerIcon.src = isDark
      ? 'img/ICONOS/Menu-white.svg'
      : 'img/ICONOS/Menu-black.svg';
  }
}

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + window.innerHeight / 4;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < bottom) {
      updateHamburgerIcon(id);
    }
  });
});

window.addEventListener("load", () => {
  updateHamburgerIcon();
});
setTimeout(onScroll, 100);
