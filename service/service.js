// Automatic Slide Show
let slideIndex = 0;

const slides = document.querySelectorAll('.slides img');
const totalSlides = slides.length;

function showSlides() {
    slideIndex++;
    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    }
    updateSlides();
}

function updateSlides() {
    const slideWidth = slides[0].clientWidth;
    document.querySelector('.slides').style.transform = `translateX(-${slideIndex * slideWidth}px)`;
}

document.getElementById('next').addEventListener('click', () => {
    slideIndex++;
    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    }
    updateSlides();
});

document.getElementById('prev').addEventListener('click', () => {
    slideIndex--;
    if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
    }
    updateSlides();
});

setInterval(showSlides, 3000); // Change image every 3 seconds
