document.addEventListener("DOMContentLoaded", function() {
    const BUBBLE_GIF_DURATION = 2500;
    const HALF_POINT = 700;
    const DOOR_GIF_DURATION = 2000;
    const CREAK_DELAY = 1150;
    const DRAMATIC_IMPACT_DURATION = 3500;
    const POST_DRAMATIC_DELAY = 1000;

    const startScreen = document.getElementById('start-screen');
    const startBtn = document.getElementById('start-btn');
    const bubbleContainer = document.getElementById('bubble-gif-container');
    const bubbleGif = document.getElementById('bubble-gif');
    const exteriorView = document.getElementById('exterior-view');
    const clickableDoor = document.getElementById('clickable-door');
    const interiorView = document.getElementById('interior-view');
    const doorOverlay = document.getElementById('door-transition-overlay');
    const doorGif = document.getElementById('door-gif');
    const backBtn = document.getElementById('back-btn');

    const audioStreetRag = document.getElementById('audio-street-rag');
    const audioSeaweed = document.getElementById('audio-seaweed');
    const audioBubble = document.getElementById('audio-bubble');
    const audioCreak = document.getElementById('audio-creak');
    const audioDramatic = document.getElementById('audio-dramatic');
    const audioWoodenBear = document.getElementById('audio-wooden-bear');

    let doorClicked = false;
    let exteriorRevealed = false;
    let transitionStarted = false;
    let interiorFullyReady = false;
    let isReturningFromInterior = false;
    let woodenBearTimeout = null;
    
    exteriorView.style.transition = 'none';
    exteriorView.style.animation = 'none';
    exteriorView.style.opacity = '1';
    exteriorView.style.visibility = 'visible';
    exteriorView.classList.add('hidden');
    
    backBtn.classList.add('hidden');
    
    audioWoodenBear.volume = 0.4;
    audioWoodenBear.loop = true;
    audioSeaweed.volume = 0.4;
    audioSeaweed.loop = true;
    audioDramatic.volume = 0.7;
    
    function stopInteriorAudio() {
        audioWoodenBear.pause();
        audioWoodenBear.currentTime = 0;
        audioDramatic.pause();
        audioDramatic.currentTime = 0;
        audioCreak.pause();
        audioCreak.currentTime = 0;
        if (woodenBearTimeout) {
            clearTimeout(woodenBearTimeout);
            woodenBearTimeout = null;
        }
    }
    
    function stopExteriorAudio() {
        audioSeaweed.pause();
        audioSeaweed.currentTime = 0;
    }
    
    let streetRagStarted = false;
    function attemptStreetRag() {
        if (!streetRagStarted && startScreen && !startScreen.classList.contains('hidden')) {
            audioStreetRag.play().then(() => {
                streetRagStarted = true;
                console.log("street_rag playing on home screen");
            }).catch(e => console.log("waiting for user interaction"));
        }
    }
    attemptStreetRag();
    startScreen.addEventListener('click', function() {
        if (!streetRagStarted) {
            audioStreetRag.play().catch(e => console.log);
            streetRagStarted = true;
        }
    });
    
    startBtn.addEventListener('click', function() {
        if (transitionStarted) return;
        transitionStarted = true;
        
        audioStreetRag.pause();
        audioStreetRag.currentTime = 0;
        
        bubbleContainer.classList.remove('hidden');
        bubbleGif.src = bubbleGif.src;
        
        audioBubble.currentTime = 0;
        audioBubble.play().catch(e => console.log("bubble audio:", e));
        
        setTimeout(function() {
            if (!exteriorRevealed) {
                exteriorRevealed = true;
                exteriorView.classList.remove('hidden');
                exteriorView.style.zIndex = "2500";
                exteriorView.style.opacity = "1";
                audioSeaweed.currentTime = 0;
                audioSeaweed.play().catch(e => console.log("seaweed ambient:", e));
            }
        }, HALF_POINT);
        
        setTimeout(function() {
            bubbleContainer.classList.add('hidden');
        }, BUBBLE_GIF_DURATION);
    });
    
    clickableDoor.addEventListener('click', function(event) {
        event.preventDefault();
        if (doorClicked) return;
        doorClicked = true;
        
        startScreen.style.display = 'none';
        
        audioSeaweed.pause();
        audioSeaweed.currentTime = 0;
        
        const gifSrc = doorGif.src;
        doorGif.src = '';
        doorGif.src = gifSrc;
        doorGif.removeAttribute('loop');
        doorGif.removeAttribute('data-loop');
        
        doorOverlay.classList.remove('hidden');
        
        exteriorView.classList.add('hidden');
        
        interiorView.classList.remove('hidden');
        
        setTimeout(function() {
            audioCreak.currentTime = 0;
            audioCreak.play().catch(e => console.log("creak:", e));
        }, CREAK_DELAY);
        
        setTimeout(function() {
            doorOverlay.classList.add('hidden');
            
            audioDramatic.currentTime = 0;
            audioDramatic.play().catch(e => console.log("dramatic impact:", e));
            
            const totalDelay = DRAMATIC_IMPACT_DURATION + POST_DRAMATIC_DELAY;
            
            woodenBearTimeout = setTimeout(function() {
                audioWoodenBear.currentTime = 0;
                audioWoodenBear.volume = 0.4;
                audioWoodenBear.play().catch(e => console.log("wooden bear:", e));
                interiorFullyReady = true;
                backBtn.classList.remove('hidden');
                woodenBearTimeout = null;
            }, totalDelay);
            
        }, DOOR_GIF_DURATION);
    });
    
    clickableDoor.addEventListener('dragstart', function(e) {
        e.preventDefault();
    });
    
    backBtn.addEventListener('click', function() {
        if (isReturningFromInterior) return;
        isReturningFromInterior = true;
        
        audioWoodenBear.pause();
        audioWoodenBear.currentTime = 0;
        audioDramatic.pause();
        audioDramatic.currentTime = 0;
        audioCreak.pause();
        audioCreak.currentTime = 0;
        
        if (woodenBearTimeout) {
            clearTimeout(woodenBearTimeout);
            woodenBearTimeout = null;
        }
        
        bubbleContainer.classList.remove('hidden');
        bubbleGif.src = bubbleGif.src;
        audioBubble.currentTime = 0;
        audioBubble.play().catch(e => console.log("bubble back:", e));
        
        setTimeout(function() {
            exteriorView.classList.remove('hidden');
            exteriorView.style.zIndex = "2500";
            exteriorView.style.opacity = "1";
            audioSeaweed.currentTime = 0;
            audioSeaweed.play().catch(e => console.log("seaweed resume:", e));
            
            interiorView.classList.add('hidden');
            
            doorClicked = false;
            
            backBtn.classList.add('hidden');
        }, HALF_POINT);
        
        setTimeout(function() {
            bubbleContainer.classList.add('hidden');
            isReturningFromInterior = false;
            doorOverlay.classList.add('hidden');
            interiorFullyReady = false;
        }, BUBBLE_GIF_DURATION);
    });
    
});
