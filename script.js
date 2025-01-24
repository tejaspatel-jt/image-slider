let slideIndex = 1;

function initSlider() {
    const slides = document.getElementsByClassName("slide");
    updatePagination(slides.length); // Initialize pagination on load
    showSlides(slideIndex); // Show the first slide
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
