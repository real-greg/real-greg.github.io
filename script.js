document.addEventListener("DOMContentLoaded", function() {
    // RUNTIME VELOCITY CONFIGURATIONS (Adjust in milliseconds to match file duration)
    const BUBBLE_GIF_DURATION = 2500; 
    const DOOR_GIF_DURATION = 1500;   

    // INTERFACE CAPTURE DOM OBJECTS
    const startScreen = document.getElementById('start-screen');
    const startBtn = document.getElementById('start-btn');
    const bubbleContainer = document.getElementById('bubble-gif-container');
    const bubbleGif = document.getElementById('bubble-gif');
    
    const introOverlay = document.getElementById('intro-overlay');
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

    // ==========================================
    // ACTION INITIALIZER: TAP TO COMPLY WITH SECURITY
    // ==========================================
    startBtn.addEventListener('click', function() {
        // Drop the curtain screen
        startScreen.style.display = 'none';
        
        // REVEAL BOTH SIMULTANEOUSLY: Island image background + transparent bubble GIF canvas on top
        exteriorView.classList.remove('hidden'); 
        bubbleContainer.classList.remove('hidden');
        
        // Wake sound layer instantly synced to bubble visual layout
        audioBubble.play();

        // Flush frame caching loops to start GIF processing on absolute frame 0
        bubbleGif.src = bubbleGif.src; 

        // Monitor run cycle to drop bubbles when asset timeline wraps up
        setTimeout(function() {
            // Initiate fade out pipeline matching layout variables
            introOverlay.classList.add('fade-out');

            // Purge layer nodes to establish runtime memory management
            setTimeout(function() {
                introOverlay.style.display = 'none';
                
                // Initialize background loops safely
                audioSeaweed.volume = 0.4;
                audioSeaweed.play().catch(e => console.log("Ambient lock tripped:", e));
            }, 1200); // Matches the .fade-out CSS duration configuration

        }, BUBBLE_GIF_DURATION);
    });

    // ==========================================
    // INTERACTIVE NODE MAPPING: EXTERIOR TO INTERNAL
    // ==========================================
    clickableDoor.addEventListener('click', function(event) {
        event.preventDefault(); 

        // Flush active background ambient channels out of operational cache
        audioSeaweed.pause();
        audioSeaweed.currentTime = 0;

        // Fire mechanical action audio track
        audioCreak.play();
        doorGif.src = doorGif.src; // Flush transition frames straight to Frame 1

        // Drop background layer elements out of current display pipeline
        exteriorView.classList.add('hidden');
        doorOverlay.classList.remove('hidden');

        // Watch cutscene animation sequence limit bounds
        setTimeout(function() {
            // Cut overlay layer blocks
            doorOverlay.classList.add('hidden');
            
            // Present bedroom array layout configuration frame structures
            interiorView.classList.remove('hidden');
            interiorView.classList.add('fade-in');

            // Fire musical hit frame audio stings
            audioDramatic.play();
            
            // Uncover the localized header block styling profiles
            interiorText.classList.add('show');

        }, DOOR_GIF_DURATION);
    });
});
