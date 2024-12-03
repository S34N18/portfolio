document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect for the background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        document.body.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    });

    // Dynamic mist effect (optional)
    const mistContainer = document.createElement('div');
    mistContainer.className = 'mist';
    document.body.appendChild(mistContainer);

    for (let i = 0; i < 2; i++) {
        const mistLayer = document.createElement('div');
        mistLayer.className = 'mist-layer';
        mistContainer.appendChild(mistLayer);
    }

    function updateMist() {
        const mistLayers = document.querySelectorAll('.mist-layer');
        mistLayers.forEach((layer, index) => {
            const speed = index === 0 ? 0.2 : 0.1;
            const currentPosition = (Date.now() * speed) % 100;
            layer.style.transform = `translateX(-${currentPosition}%)`;
        });
        requestAnimationFrame(updateMist);
    }

    updateMist();

    // Smooth scroll for navigation links (if you add any)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});