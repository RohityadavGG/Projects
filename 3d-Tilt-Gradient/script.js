// Holographic Effect Core
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.wrapper-pokemon-card');
    const holoEffects = document.querySelectorAll('.gradient-holo.mbm-color-dodge');
    
    // Configuration for each card
    const cardConfigs = [
        {   // Left card
            rotateXMax: 5,  // <-- Change this value to adjust vertical tilt (mouse up/down) for left card
            rotateYMax: 5,  // <-- Change this value to adjust horizontal tilt (mouse left/right) for left card
            perspective: 1000,
            gradientMin: -120,
            gradientMax: 110
        },
        {   // Middle card
            rotateXMax: 5,  // <-- Change this value to adjust vertical tilt (mouse up/down) for middle card
            rotateYMax: 5,  // <-- Change this value to adjust horizontal tilt (mouse left/right) for middle card
            perspective: 1000,
            gradientMin: -130,
            gradientMax: 120
        },
        {   // Right card
            rotateXMax: 5,  // <-- Change this value to adjust vertical tilt (mouse up/down) for right card
            rotateYMax: 5,  // <-- Change this value to adjust horizontal tilt (mouse left/right) for right card
            perspective: 1000,
            gradientMin: -120,
            gradientMax: 110
        }
    ];

    // Note: Higher values = more tilt, Lower values = less tilt
    // Recommended range: 5-15 degrees
    // Example: 
    // - 5 = subtle tilt
    // - 10 = moderate tilt
    // - 15 = dramatic tilt

    // Initialize all cards
    cards.forEach((card, index) => {
        const holoEffect = holoEffects[index];
        
        // Initialize card styles
        card.style.transformStyle = 'preserve-3d';
        card.style.perspective = `${cardConfigs[index].perspective}px`;
        card.style.transition = 'transform 0.2s ease-out';
        card.style.willChange = 'transform';

        // Initialize holo effect styles
        holoEffect.style.transformStyle = 'preserve-3d';
        holoEffect.style.willChange = 'transform';
        holoEffect.style.opacity = '0'; // Start hidden
        holoEffect.style.transition = 'opacity 0.3s ease-out'; // Smooth transition for opacity
    });

    // Mouse movement handler for the entire document
    function handleMouseMove(event) {
        // Calculate section boundaries based on card positions
        const firstCard = cards[0].getBoundingClientRect();
        const lastCard = cards[2].getBoundingClientRect();
        const totalWidth = lastCard.right - firstCard.left;
        const sectionWidth = totalWidth / 3;
        const startX = firstCard.left;
        const zoneAdjustment = 20; // Amount to adjust zones by

        cards.forEach((card, index) => {
            const holoEffect = holoEffects[index];
            const rect = card.getBoundingClientRect();
            const config = cardConfigs[index];
            
            // Calculate section boundaries based on card positions
            let sectionStart = startX + (index * sectionWidth);
            let sectionEnd = sectionStart + sectionWidth;

            // Adjust zones based on card position
            if (index === 0) { // First card
                sectionEnd -= zoneAdjustment; // Shrink right side
            } else if (index === 1) { // Middle card
                sectionStart -= zoneAdjustment; // Expand left
                sectionEnd += zoneAdjustment;   // Expand right
            } else if (index === 2) { // Last card
                sectionStart += zoneAdjustment; // Shrink left side
            }
            
            const isInSection = event.clientX >= sectionStart && event.clientX < sectionEnd;
            
            if (isInSection) {
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                // Calculate rotation based on mouse position relative to card center
                const rotateY = ((event.clientX - centerX) / (sectionWidth / 3)) * config.rotateYMax;
                const rotateX = -((event.clientY - centerY) / (window.innerHeight / 3)) * config.rotateXMax;
                
                // Apply card rotation
                card.style.transform = `
                    perspective(${config.perspective}px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                `;

                // Show gradient effect
                holoEffect.style.opacity = '1';

                // Calculate holographic effect movement
                const sectionProgress = (event.clientX - sectionStart) / (sectionEnd - sectionStart);
                const movePercentage = config.gradientMin + 
                    sectionProgress * (config.gradientMax - config.gradientMin);
                
                // Apply holographic effect transform
                holoEffect.style.transform = `
                    translate3d(${movePercentage}%, 0px, 0px)
                    scale3d(1, 1, 1)
                    rotateX(0deg)
                    rotateY(0deg)
                    rotateZ(0deg)
                    skew(0deg, 0deg)
                `;
            } else {
                // Reset card if mouse is not in its section
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
                // Hide gradient effect
                holoEffect.style.opacity = '0';
                holoEffect.style.transform = `
                    translate3d(0%, 0px, 0px)
                    scale3d(1, 1, 1)
                    rotateX(0deg)
                    rotateY(0deg)
                    rotateZ(0deg)
                    skew(0deg, 0deg)
                `;
            }
        });
    }

    // Reset transform when cursor leaves the window
    function handleMouseLeave() {
        cards.forEach((card, index) => {
            const holoEffect = holoEffects[index];
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            // Hide gradient effect
            holoEffect.style.opacity = '0';
            holoEffect.style.transform = `
                translate3d(0%, 0px, 0px)
                scale3d(1, 1, 1)
                rotateX(0deg)
                rotateY(0deg)
                rotateZ(0deg)
                skew(0deg, 0deg)
            `;
        });
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
});