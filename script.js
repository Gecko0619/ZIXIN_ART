// Set the exact date and time we are counting down to
// You can adjust the time (currently midnight) if you need to!
const countDownDate = new Date("Apr 28, 2026 00:00:00").getTime();
let timerInterval;

// Grab our HTML elements
const timerBackground = document.getElementById('timer-background');
const timeDisplay = document.getElementById('time-display');
const infoSections = document.querySelectorAll('.info-section');

// Function to calculate and update the timer
function updateTimer() {
    // Get today's exact date and time in milliseconds
    const now = new Date().getTime();

    // Find the distance between right now and the target date
    const distance = countDownDate - now;

    // If the countdown is finished, stop the timer
    if (distance < 0) {
        clearInterval(timerInterval);
        timeDisplay.textContent = "00:00:00:00";
        return; // Stop running the rest of the math
    }

    // Time calculations for days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');

    // Display the result (Days : Hours : Minutes : Seconds)
    timeDisplay.textContent = `${days}:${hours}:${minutes}:${seconds}`;
}

// 1. Start everything automatically when the page loads
window.onload = () => {
    // Trigger CSS animations to reveal the background
    timerBackground.classList.add('active');
    
    // Run the timer update immediately so there is no 1-second blank delay
    updateTimer();

    // Update the count down every 1 second (1000 milliseconds)
    timerInterval = setInterval(updateTimer, 1000);
};

// 2. The "Scroll Up and Stick" animation
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    // Calculate how far the text needs to move to hit the top of the screen.
    const topPadding = 30; // Keeps it 30px away from the very top edge
    const maxMoveUp = (window.innerHeight - timeDisplay.offsetHeight) / 2 - topPadding;
    
    // Move the timer up as we scroll down
    let moveY = -scrolled;
    
    // If the scroll distance is greater than the space it has to move, freeze it!
    if (scrolled > maxMoveUp) {
        moveY = -maxMoveUp;
    }

    // Apply the movement to the timer
    timeDisplay.style.transform = `translateY(${moveY}px)`;

    // Reveal info sections smoothly as they enter the viewport
    infoSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // If the section is scrolled into view, make it visible
        if (sectionTop < windowHeight * 0.85) {
            section.classList.add('visible');
        }
    });
});

// =========================================
// BALLOON GENERATOR LOGIC
// =========================================

const balloonBtn = document.getElementById('balloon-btn');

// A mix of theme colors for the balloons (Gold, Dark Gray, White, Light Gold)
const balloonColors = ['#b8860b', '#333333', '#f9f9f9', '#f9d423'];

if (balloonBtn) {
    balloonBtn.addEventListener('click', () => {
        // Create 30 balloons when clicked
        for (let i = 0; i < 30; i++) {
            // Use a slight delay so they don't all appear at the exact same millisecond
            setTimeout(createBalloon, i * 80); 
        }
    });
}

function createBalloon() {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');

    // 1. Randomize the horizontal position (0% to 100% of screen width)
    const leftPosition = Math.random() * 100;
    
    // 2. Pick a random color from our array
    const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
    
    // 3. Randomize the size (scale from 0.8x to 1.5x)
    const size = Math.random() * 0.7 + 0.8; 
    
    // 4. Randomize how fast it floats up (between 4 and 8 seconds)
    const duration = Math.random() * 4 + 4; 

    // Apply the random values to the balloon's CSS
    balloon.style.left = `${leftPosition}vw`;
    balloon.style.backgroundColor = color;
    balloon.style.animationDuration = `${duration}s`;
    
    // Scale the balloon to its random size
    balloon.style.transform = `scale(${size})`;

    // Create the little tied knot at the bottom of the balloon
    const knot = document.createElement('div');
    knot.style.position = 'absolute';
    knot.style.bottom = '-8px';
    knot.style.left = '50%';
    knot.style.transform = 'translateX(-50%)';
    knot.style.borderLeft = '5px solid transparent';
    knot.style.borderRight = '5px solid transparent';
    knot.style.borderBottom = `10px solid ${color}`; // Match the balloon color
    balloon.appendChild(knot);

    // Add the balloon to the page
    document.body.appendChild(balloon);

    // Clean up: Remove the balloon from the code after it finishes floating
    // This stops the website from lagging if they click the button 100 times!
    setTimeout(() => {
        balloon.remove();
    }, duration * 1000);
}