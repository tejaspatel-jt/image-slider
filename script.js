let slideIndex = 1;
let isPaused = false; // Variable to track pause state
let slideInterval; // Variable to hold setInterval reference

/**
 * Configure your slider images and caption here
 */
const images = [
    { src: "assets/img/image_1.jpg", caption: "That Guy Craig" },
    { src: "assets/img/image_2.jpg", caption: "AXP Photography" },
    { src: "assets/img/image_3.jpg", caption: "Simon 73" },
    { src: "assets/img/image_4.jpg", caption: "Daejeung" },
    { src: "assets/img/image_5.jpg", caption: "Felix Mitter Meier" },
    { src: "assets/img/image_6.jpg", caption: "philippedonn" },
    { src: "assets/img/image_7.jpg", caption: "Francesco Ungaro" },

    // Add more images as needed
];

function initSlider() {
    createSlides(); // Create slides from the images array
    showSlides(slideIndex); // Show the first slide
    startAutoSlide();
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        if (!isPaused) {
            changeSlide(1);
        }
    }, 2000);
}

function createSlides() {
    const slidesContainer = document.querySelector('.slides');

    images.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';

        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.caption;

        const captionElement = document.createElement('div');
        captionElement.className = 'caption';
        captionElement.textContent = image.caption;

        // Make the caption focusable
        captionElement.tabIndex = 0;

        // Add click event to pause/resume on image click
        imgElement.addEventListener('click', function () {

            togglePlayPause();
        });

        slide.appendChild(imgElement);
        slide.appendChild(captionElement);

        slidesContainer.appendChild(slide);
    });
}
 
/**
 * This will handle play and pause of slider along with updating pagination dot states based on it.
 */
function togglePlayPause(){

            isPaused = !isPaused; // Toggle pause state
            
            // this.style.cursor = isPaused ? 'default' : 'pointer';
            
            updatePagination(images.length);

            // Get the currnet image 
            const currentImage = document.querySelector(`.slide:nth-child(${slideIndex}) img`);

            // Update aria-label for accessibility
            if (isPaused) {
                currentImage.setAttribute('aria-label', 'Slider paused. Click to resume.');
            } else {
                currentImage.setAttribute('aria-label', 'Slider playing.');
            }

}

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");

    // Ensure slideIndex is within bounds
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Show the current slide
    slides[slideIndex - 1].style.display = "block";

    // set focus to current slide and its caption
    slides[slideIndex - 1].focus();

    // Update pagination dots
    updatePagination(slides.length);
}

function updatePagination(numSlides) {
    const pagination = document.getElementById("pagination");

    // Clear existing dots
    pagination.innerHTML = '';

    // Create new dots based on the number of slides
    for (let i = 0; i < numSlides; i++) {
        const dot = document.createElement("span");
        dot.className = "dot";
        dot.onclick = () => currentSlide(i + 1); // Set onclick for each dot

        // Make dots focusable
        dot.tabIndex = 0;

        // If paused and this is the active slide, add a play icon
        if (isPaused && i === (slideIndex - 1)) {
            dot.innerHTML = '&#9658;'; // Play icon (triangle)
            dot.classList.add('play'); // Optional class for styling
        } else {
            dot.innerHTML = ''; // No icon when not paused
        }

        pagination.appendChild(dot);

        // Add keyboard accessibility for dots
        dot.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') { // Allow Enter or Space to activate the dot
                currentSlide(i + 1);
            }
        });

    }

    // Set the active class on the current dot
    const dots = pagination.getElementsByClassName("dot");
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active"); // Remove active class from all dots
    }

    dots[slideIndex - 1].classList.add("active"); // Add active class to the current dot
}

// Initialize the slider when the page loads
window.onload = initSlider;

// A11y

// Add event listener for keyboard navigation
document.addEventListener('keydown', function (event) {
    if (event.key === "ArrowLeft") {
        changeSlide(-1);
    } else if (event.key === "ArrowRight") {
        changeSlide(1);
    } else if (event.key === " ") {  // SPACE BAR
        event.preventDefault(); // Prevent scrolling when space is pressed
        togglePlayPause();
    }
});

