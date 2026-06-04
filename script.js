document.addEventListener("DOMContentLoaded", function() {
    // TIMING VARIABLES (Adjust these paths to match your custom GIF runtimes in milliseconds)
    const BUBBLE_GIF_DURATION = 2500; 
    const DOOR_GIF_DURATION = 1500;   

    // DOM CANVAS SELECTORS
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

    // DOM AUDIO SELECTORS
    const audioBubble = document.getElementById('audio-bubble');
    const audioSeaweed = document.getElementById('audio-seaweed');
    const audioCreak = document.getElementById('audio-creak');
    const audioDramatic = document.getElementById('audio-dramatic');

    // ==========================================
    // INITIALIZATION GATEWAY: CLICK ENTER
    // ==========================================
    startBtn.addEventListener('click', function() {
        // Clear landing block and unlock media render engine
        startScreen.style.display = 'none';
        bubbleContainer.classList.remove('hidden');
        
        // Synchronize bubble sound track with canvas flip
        audioBubble.play();

        // Refresh source location parameters to anchor loop cycles cleanly to Frame 1
        bubbleGif.src = bubbleGif.src; 

        // Execute transition array after the bubble animation sequence wraps up
        setTimeout(function() {
            introOverlay.classList.add('fade-out');
            exteriorView.classList.remove('hidden');
            exteriorView.classList.add('fade-in');

            // Wipe out overlay resources completely post-fade timeline matching CSS 1.2s rule
            setTimeout(function() {
                introOverlay.style.display = 'none';
                
                // Initialize background instrumental parameters safely
                audioSeaweed.volume = 0.4;
                audioSeaweed.play().catch(e => console.log("Audio play caught:", e));
            }, 1200);

        }, BUBBLE_GIF_DURATION);
    });

    // ==========================================
    // INTERACTIVE HITBOX LAYER: DOOR CLICK
    // ==========================================
    clickableDoor.addEventListener('click', function(event) {
        event.preventDefault(); // Suspend default browser navigation bindings

        // Kill ambient loop mechanics immediately
        audioSeaweed.pause();
        audioSeaweed.currentTime = 0;

        // Discharging sound and forcing structural layout swap
        audioCreak.play();
        doorGif.src = doorGif.src; // Enforce frame reset

        exteriorView.classList.add('hidden');
        doorOverlay.classList.remove('hidden');

        // Transition sequence processing to map the final scene arrival
        setTimeout(function() {
            doorOverlay.classList.add('hidden');
            interiorView.classList.remove('hidden');
            interiorView.classList.add('fade-in');

            // Trigger the dramatic impact sound effect right as the scene pops
            audioDramatic.play();
            
            // Pop the text banner up to view parameters
            interiorText.classList.add('show');

        }, DOOR_GIF_DURATION);
    });
});