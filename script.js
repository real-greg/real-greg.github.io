document.addEventListener("DOMContentLoaded", function() {
    // RUNTIME VELOCITY CONFIGURATIONS
    const BUBBLE_GIF_DURATION = 2500; 
    const DOOR_GIF_DURATION = 1000;   // Door opening GIF duration (1 second)

    // INTERFACE CAPTURE DOM OBJECTS
    const startScreen = document.getElementById('start-screen');
    const startBtn = document.getElementById('start-btn');
    const bubbleContainer = document.getElementById('bubble-gif-container');
    const bubbleGif = document.getElementById('bubble-gif');
    
    const exteriorView = document.getElementById('exterior-view');
    const doorOverlay = document.getElementById('door-transition-overlay');
    const doorGif = document.getElementById('door-gif');
    const interiorView = document.getElementById('interior-view');
    const clickableDoor = document.getElementById('clickable-door');
    const interiorText = document.getElementById('interior-text');

    // NATIVE HARDWARE CONTROLLERS
    const audioBubble = document.getElementById('audio-bubble');
    const audioSeaweed = document.getElementById('audio-seaweed');
    const audioCreak = document.getElementById('audio-creak');
    const audioDramatic = document.getElementById('audio-dramatic');

    // Hide bubble container at raw initial load
    bubbleContainer.style.display = 'none';
    bubbleContainer.classList.remove('visible');

    // ==========================================
    // ACTION INITIALIZER: CLICK ENTER
    // Bubbles play with fading in of exterior island image
    // ==========================================
    startBtn.addEventListener('click', function() {
        // Fade out start screen
        startScreen.style.opacity = '0';
        startScreen.style.transition = 'opacity 0.5s ease-out';
        
        setTimeout(() => {
            startScreen.style.display = 'none';
            
            // Show exterior view with fade in
            exteriorView.classList.remove('hidden');
            exteriorView.style.opacity = '0';
            
            // Trigger fade in animation for exterior view
            setTimeout(() => {
                exteriorView.style.opacity = '1';
            }, 50);
            
            // Show bubble container with fade in
            bubbleContainer.style.display = 'flex';
            bubbleContainer.style.opacity = '0';
            
            setTimeout(() => {
                bubbleContainer.style.opacity = '1';
            }, 100);
            
            // Play bubble sound effect
            audioBubble.currentTime = 0;
            audioBubble.play().catch(e => console.log("Bubble audio error:", e));
            
            // Reset GIF to start
            bubbleGif.src = bubbleGif.src;
            
            // After bubble GIF duration, fade out bubbles
            setTimeout(function() {
                bubbleContainer.style.opacity = '0';
                bubbleContainer.style.transition = 'opacity 1s ease-out';
                
                // Start ambient background music after bubbles fade
                setTimeout(function() {
                    bubbleContainer.style.display = 'none';
                    audioSeaweed.volume = 0.4;
                    audioSeaweed.currentTime = 0;
                    audioSeaweed.play().catch(e => console.log("Ambient audio error:", e));
                }, 1000);
                
            }, BUBBLE_GIF_DURATION);
            
        }, 500);
    });

    // ==========================================
    // INTERACTIVE NODE MAPPING: DOOR CLICK
    // Door opening GIF plays as a layer above interior image
    // Dramatic impact plays AFTER GIF finishes
    // ==========================================
    clickableDoor.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        // Check if door is already animating to prevent multiple triggers
        if (doorOverlay.classList.contains('visible') || interiorView.classList.contains('visible')) {
            return;
        }
        
        // Store reference to avoid race conditions
        let animationTimeout = null;
        let gifLoadTimeout = null;
        
        // Stop background ambient loop tracks
        audioSeaweed.pause();
        audioSeaweed.currentTime = 0;
        
        // Reset GIF to ensure it plays from start
        doorGif.src = doorGif.src;
        
        // Force reload GIF to ensure animation plays
        const currentSrc = doorGif.src;
        doorGif.src = '';
        doorGif.src = currentSrc;
        
        // Hide exterior, show interior first (interior image is behind the overlay)
        exteriorView.classList.add('hidden');
        exteriorView.style.opacity = '0';
        
        // Show interior view with fade in
        interiorView.classList.remove('hidden');
        interiorView.style.opacity = '0';
        
        setTimeout(() => {
            interiorView.style.opacity = '1';
        }, 50);
        
        // Show door overlay layer above interior image
        doorOverlay.classList.remove('hidden');
        doorOverlay.style.opacity = '0';
        
        setTimeout(() => {
            doorOverlay.style.opacity = '1';
            doorOverlay.classList.add('visible');
        }, 50);
        
        // Play door creak sound effect
        audioCreak.currentTime = 0;
        audioCreak.play().catch(e => console.log("Door creak audio error:", e));
        
        // Set timeout for GIF duration - 1 second
        animationTimeout = setTimeout(function() {
            // Fade out the door overlay smoothly
            doorOverlay.style.opacity = '0';
            doorOverlay.style.transition = 'opacity 0.3s ease-out';
            
            setTimeout(function() {
                doorOverlay.classList.add('hidden');
                doorOverlay.classList.remove('visible');
                doorOverlay.style.display = 'none';
                
                // CRITICAL: Dramatic impact sound plays AFTER GIF finishes
                audioDramatic.currentTime = 0;
                audioDramatic.play().catch(e => console.log("Dramatic impact audio error:", e));
                
                // Show "COME HERE" text animation
                interiorText.classList.remove('show');
                // Force reflow to restart animation
                void interiorText.offsetWidth;
                interiorText.classList.add('show');
                
                // Clean up text animation class after animation completes
                setTimeout(() => {
                    interiorText.classList.remove('show');
                }, 1000);
                
            }, 300);
            
        }, DOOR_GIF_DURATION);
        
        // Ensure cleanup if GIF takes too long to load
        gifLoadTimeout = setTimeout(() => {
            if (animationTimeout) {
                clearTimeout(animationTimeout);
                animationTimeout = null;
                // Fallback: trigger dramatic sound anyway
                doorOverlay.style.opacity = '0';
                setTimeout(() => {
                    doorOverlay.classList.add('hidden');
                    doorOverlay.classList.remove('visible');
                    doorOverlay.style.display = 'none';
                    audioDramatic.currentTime = 0;
                    audioDramatic.play().catch(e => console.log("Fallback dramatic audio error:", e));
                    interiorText.classList.add('show');
                    setTimeout(() => {
                        interiorText.classList.remove('show');
                    }, 1000);
                }, 300);
            }
        }, 1500);
        
        // Store timeouts for potential cleanup
        clickableDoor._animationTimeout = animationTimeout;
        clickableDoor._gifLoadTimeout = gifLoadTimeout;
    });
    
    // Cleanup function to prevent memory leaks
    window.addEventListener('beforeunload', function() {
        if (clickableDoor._animationTimeout) {
            clearTimeout(clickableDoor._animationTimeout);
        }
        if (clickableDoor._gifLoadTimeout) {
            clearTimeout(clickableDoor._gifLoadTimeout);
        }
    });
});
