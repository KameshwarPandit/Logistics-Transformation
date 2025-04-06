// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map tracker
    const mapTracker = new MapTracker('map-tracker', 'your_mapbox_access_token');
    // Animate feature cards on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Simple network visualization animation
    const networkVisualization = document.querySelector('.network-visualization');
    if (networkVisualization) {
        // Create moving nodes for visualization
        for (let i = 0; i < 15; i++) {
            const node = document.createElement('div');
            node.className = 'network-node';
            node.style.left = `${Math.random() * 100}%`;
            node.style.top = `${Math.random() * 100}%`;
            node.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 70%)`;
            networkVisualization.appendChild(node);
        }

        // Animate nodes
        const nodes = document.querySelectorAll('.network-node');
        nodes.forEach(node => {
            animateNode(node);
        });
    }

    // CTA button interaction
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            alert('Thank you for your interest! Our solutions will be available soon.');
        });
    }
});

function animateNode(node) {
    const duration = 3000 + Math.random() * 4000;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    node.animate([
        { left: node.style.left, top: node.style.top },
        { left: `${x}%`, top: `${y}%` }
    ], {
        duration: duration,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out'
    });

    // Create connections between nodes
    setTimeout(() => {
        const parent = node.parentNode;
        const nodes = parent.querySelectorAll('.network-node');
        
        nodes.forEach(otherNode => {
            if (node !== otherNode && Math.random() > 0.7) {
                createConnection(node, otherNode);
            }
        });
    }, 1000);
}

function createConnection(node1, node2) {
    const line = document.createElement('div');
    line.className = 'network-line';
    node1.parentNode.appendChild(line);
    
    function updateLine() {
        const rect1 = node1.getBoundingClientRect();
        const rect2 = node2.getBoundingClientRect();
        const parentRect = node1.parentNode.getBoundingClientRect();
        
        const x1 = rect1.left + rect1.width/2 - parentRect.left;
        const y1 = rect1.top + rect1.height/2 - parentRect.top;
        const x2 = rect2.left + rect2.width/2 - parentRect.left;
        const y2 = rect2.top + rect2.height/2 - parentRect.top;
        
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        line.style.width = `${length}px`;
        line.style.height = '2px';
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        line.style.transformOrigin = '0 0';
        line.style.transform = `rotate(${angle}deg)`;
        line.style.backgroundColor = 'rgba(42, 157, 143, 0.3)';
        line.style.position = 'absolute';
    }
    
    updateLine();
    window.addEventListener('resize', updateLine);
}