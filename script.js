// Check if audio state is stored in session storage
var isAudioPlaying = sessionStorage.getItem('isAudioPlaying');

// If audio state is not set or is set to 'true', play the audio
if (isAudioPlaying === null || isAudioPlaying === 'true') {
    var audio = document.getElementById('backgroundAudio');
    audio.play().catch(function(error) {
        console.error('Failed to play audio:', error);
    });
}

// Function to toggle audio playback
function toggleAudio() {
    var audio = document.getElementById('backgroundAudio');
    if (audio.paused) {
        audio.play().catch(function(error) {
            console.error('Failed to play audio:', error);
        });
        sessionStorage.setItem('isAudioPlaying', 'true');
    } else {
        audio.pause();
        sessionStorage.setItem('isAudioPlaying', 'false');
    }
}

// Save audio state when the page is unloaded
window.onbeforeunload = function() {
    sessionStorage.setItem('isAudioPlaying', document.getElementById('backgroundAudio').paused ? 'false' : 'true');
};

// Function to create a raindrop element
function createRaindrop() {
    var raindrop = document.createElement('div');
    raindrop.classList.add('drop');

    var stem = document.createElement('div');
    stem.classList.add('stem');

    var splat = document.createElement('div');
    splat.classList.add('splat');

    raindrop.appendChild(stem);
    raindrop.appendChild(splat);

    return raindrop;
}

// Function to generate raindrops
function generateRain() {
    console.log('Generating rain...'); // Log a message to indicate that the function is being called

    var frontRow = document.querySelector('.rain.front-row');
    var backRow = document.querySelector('.rain.back-row');

    // Clear previous raindrops
    frontRow.innerHTML = '';
    backRow.innerHTML = '';

    // Generate new raindrops
    for (var i = 0; i < 100; i++) {
        var raindrop = createRaindrop();
        var delay = Math.floor(Math.random() * 100) / 100;
        var duration = Math.floor(Math.random() * 5 + 2) / 10;

        raindrop.style.left = Math.floor(Math.random() * 100) + '%';
        raindrop.style.animationDelay = delay + 's';
        raindrop.style.animationDuration = duration + 's';

        if (i % 2 === 0) {
            frontRow.appendChild(raindrop);
        } else {
            backRow.appendChild(raindrop);
        }
    }
    console.log('Rain generated successfully.'); // Log a message to indicate that the function execution is complete
}

// Call generateRain when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded.'); // Log a message to indicate that the DOM content is loaded

    // Get the popup element
    var popup = document.getElementById('popup');

    // Get the buttons to enable/disable audio
    var enableAudioBtn = document.getElementById('enableAudioBtn');
    var disableAudioBtn = document.getElementById('disableAudioBtn');

    // Show the popup
    popup.style.display = 'block';

    // Add event listeners to the buttons
    enableAudioBtn.addEventListener('click', function() {
        // Code to enable autoplay audio
        // For example, play background audio
        document.getElementById('backgroundAudio').play().catch(function(error) {
            console.error('Failed to play audio:', error);
        });
        // Hide the popup
        popup.style.display = 'none';
    });

    disableAudioBtn.addEventListener('click', function() {
        // Hide the popup without playing audio
        popup.style.display = 'none';
    });

    generateRain(); // Generate rain after the DOM content is loaded
});

// Generate rain on window resize (optional)
window.addEventListener('resize', function() {
    console.log('Window resized.'); // Log a message to indicate that the window is resized
    generateRain();
});

// Function to update flashlight position based on mouse movement
function updateFlashlightPosition(event) {
    var flashlight = document.getElementById('flashlight');
    var flashlightRadius = flashlight.offsetWidth / 2;

    flashlight.style.left = event.clientX - flashlightRadius + 'px';
    flashlight.style.top = event.clientY - flashlightRadius + 'px';

    // Update the overlay position
    var overlay = document.querySelector('.overlay');
    overlay.style.setProperty('--cursorXPos', `${event.clientX}px`);
    overlay.style.setProperty('--cursorYPos', `${event.clientY}px`);
}

// Add event listener for mousemove to continuously update flashlight position
document.addEventListener('mousemove', updateFlashlightPosition);

// Add event listener to enable audio after user interaction
var enableAudioBtn = document.getElementById('enableAudioBtn');
enableAudioBtn.addEventListener('click', function() {
    // Play the background audio
    var audio = document.getElementById('backgroundAudio');
    audio.play().catch(function(error) {
        console.error('Failed to play audio:', error);
    });
    // Hide the popup
    var popup = document.getElementById('popup');
    popup.style.display = 'none';
    // Generate rain animation
    generateRain();
});
