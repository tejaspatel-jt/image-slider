let slideIndex = 1;

/**
 * Configure your slider images and caption here
 */
const images = [
    { src: "assets/img/image1.png", caption: "Image 1" },
    { src: "assets/img/image2.png", caption: "Image 2" },
    { src: "assets/img/image3.png", caption: "Jignect Technologies" },
    { src: "assets/img/image4.png", caption: "Image 4" },
    { src: "assets/img/image5.png", caption: "Image 5" },
    { src: "assets/img/image6.jpg", caption: "Image 6" },
    // Add more images as needed
];

function initSlider() {
    createSlides(); // Create slides from the images array
    showSlides(slideIndex); // Show the first slide

    // Auto start slider
    setInterval(() => {
        changeSlide(1);
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

        slide.appendChild(imgElement);
        slide.appendChild(captionElement);

        slidesContainer.appendChild(slide);
    });
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
        pagination.appendChild(dot);
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
        changeSlide(-1); // Navigate to the previous slide
    } else if (event.key === "ArrowRight") {
        changeSlide(1); // Navigate to the next slide
    }
});

