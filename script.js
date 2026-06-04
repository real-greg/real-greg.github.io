document.addEventListener("DOMContentLoaded", function() {
    // RUNTIME VELOCITY CONFIGURATIONS
    const BUBBLE_GIF_DURATION = 2500; 
    const DOOR_GIF_DURATION = 1000;   // 🌟 CHANGED: Explicitly set to 1000ms (1 second)

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

    // ==========================================
    // ACTION INITIALIZER: CLICK ENTER
    // ==========================================
    startBtn.addEventListener('click', function() {
        startScreen.style.display = 'none';
        exteriorView.classList.remove('hidden'); 
        bubbleContainer.style.display = 'flex';
        
        audioBubble.play();
        bubbleGif.src = bubbleGif.src; // Frame 0 reset

        setTimeout(function() {
            bubbleContainer.classList.add('fade-out');

            setTimeout(function() {
                bubbleContainer.style.display = 'none';
                audioSeaweed.volume = 0.4;
                audioSeaweed.play().catch(e => console.log("Ambient audio lock caught:", e));
            }, 1000); 

        }, BUBBLE_GIF_DURATION);
    });

    // ==========================================
    // INTERACTIVE NODE MAPPING: DOOR CLICK
    // ==========================================
    clickableDoor.addEventListener('click', function(event) {
        event.preventDefault(); 

        // Stop background ambient loop tracks
        audioSeaweed.pause();
        audioSeaweed.currentTime = 0;

        // 1. Play the door creak track (1 second sound effect)
        audioCreak.play();
        doorGif.src = doorGif.src; // Frame 0 reset

        // 2. Instantly jump from exterior view to interior view
        exteriorView.classList.add('hidden');
        interiorView.classList.remove('hidden');
        
        // 3. Unhide the door opening GIF overlay inside the bedroom scene
        doorOverlay.classList.remove('hidden');

        // 4. Wait exactly 1 second (matching the SFX and GIF timeline limits)
        setTimeout(function() {
            // Remove the door animation layer completely
            doorOverlay.style.display = 'none';
            
            // Trigger the dramatic impact sting sound
            audioDramatic.play();
            

        }, DOOR_GIF_DURATION);
    });
});
