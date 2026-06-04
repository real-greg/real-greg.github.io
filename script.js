document.addEventListener("DOMContentLoaded", function() {
    // RUNTIME VELOCITY CONFIGURATIONS (Adjust in milliseconds to match file duration)
    const BUBBLE_GIF_DURATION = 2500; 
    const DOOR_GIF_DURATION = 1500;   

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

    // Make sure bubble container is hidden at absolute load so it doesn't leak through white screen
    bubbleContainer.style.display = 'none';

    // ==========================================
    // ACTION INITIALIZER: CLICK ENTER
    // ==========================================
    startBtn.addEventListener('click', function() {
        // 1. Drop the white curtain screen instantly.
        // The island is already standing perfectly still beneath it!
        startScreen.style.display = 'none';
        
        // 2. Turn on the bubble overlay container right away over the static island
        bubbleContainer.style.display = 'flex';
        
        // 3. Play bubble audio sound effect
        audioBubble.play();

        // 4. Flush frame caching loops to start GIF processing on absolute frame 0
        bubbleGif.src = bubbleGif.src; 

        // 5. Wait for bubble animation runtime to conclude
        setTimeout(function() {
            // Fade out ONLY the bubble overlay container over 1 second smoothly
            bubbleContainer.classList.add('fade-out');

            setTimeout(function() {
                // Completely hide bubble code when transparency animation concludes
                bubbleContainer.style.display = 'none';
                
                // Spin up background audio tracks safely
                audioSeaweed.volume = 0.4;
                audioSeaweed.play().catch(e => console.log("Ambient audio lock caught:", e));
            }, 1000); // Matches the 1.0s .fade-out CSS duration

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

        // Fire mechanical action door creak track
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
