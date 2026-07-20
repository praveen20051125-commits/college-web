// ============================================================================
// 1. WEBGL ENGINE INITIALIZATION & PARTICLE CONFIGURATIONS
// ============================================================================
const spatialCanvas = document.getElementById('spatial-canvas');
const systemScene = new THREE.Scene();
const mainCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const webglRenderer = new THREE.WebGLRenderer({ canvas: spatialCanvas, antialias: true, alpha: true });

webglRenderer.setSize(window.innerWidth, window.innerHeight);
webglRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const particleGeometry = new THREE.BufferGeometry();
const particlePopulation = 1400; 
const positionMatrix = new Float32Array(particlePopulation * 3);

for(let i = 0; i < particlePopulation * 3; i++) {
    positionMatrix[i] = (Math.random() - 0.5) * 12;
}
particleGeometry.setAttribute('position', new THREE.BufferAttribute(positionMatrix, 3));

const designMaterial = new THREE.PointsMaterial({
    size: 0.007,
    color: 0xd4af37, // Matching the Academic Gold Accent Palette
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending
});

const spatialPointsMesh = new THREE.Points(particleGeometry, designMaterial);
systemScene.add(spatialPointsMesh);
mainCamera.position.z = 4;

let cursorX = 0, cursorY = 0;
window.addEventListener('mousemove', (event) => {
    cursorX = (event.clientX / window.innerWidth) - 0.5;
    cursorY = (event.clientY / window.innerHeight) - 0.5;

    const activeLight = document.getElementById('cursor-light');
    activeLight.style.transform = `translate3d(calc(${event.clientX}px - 50%), calc(${event.clientY}px - 50%), 0)`;
});

const activeClock = new THREE.Clock();
const renderExecutionLoop = () => {
    const timeDelta = activeClock.getElapsedTime();
    spatialPointsMesh.rotation.y = timeDelta * 0.02;
    
    spatialPointsMesh.rotation.x += (-cursorY * 0.15 - spatialPointsMesh.rotation.x) * 0.05;
    spatialPointsMesh.rotation.y += (cursorX * 0.15 - spatialPointsMesh.rotation.y) * 0.05;

    webglRenderer.render(systemScene, mainCamera);
    window.requestAnimationFrame(renderExecutionLoop);
};
renderExecutionLoop();

window.addEventListener('resize', () => {
    mainCamera.aspect = window.innerWidth / window.innerHeight;
    mainCamera.updateProjectionMatrix();
    webglRenderer.setSize(window.innerWidth, window.innerHeight);
});

// ============================================================================
// 2. ELEMENT TILT PARAMETERS
// ============================================================================
const structuralCards = document.querySelectorAll('.tilt-target');
structuralCards.forEach(targetCard => {
    targetCard.addEventListener('mousemove', (event) => {
        const boundingBoxes = targetCard.getBoundingClientRect();
        const absoluteX = event.clientX - boundingBoxes.left;
        const absoluteY = event.clientY - boundingBoxes.top;

        const vectorOrientationX = ((absoluteY / boundingBoxes.height) - 0.5) * -8;
        const vectorOrientationY = ((absoluteX / boundingBoxes.width) - 0.5) * 8;

        targetCard.style.transform = `rotateX(${vectorOrientationX}deg) rotateY(${vectorOrientationY}deg) scale(1.01)`;
    });

    targetCard.addEventListener('mouseleave', () => {
        targetCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
});

// ============================================================================
// 3. STATISTICAL INCREMENT COMPUTATIONS
// ============================================================================
const computationalCounters = document.querySelectorAll('.counter-display');
const observerOptions = { threshold: 0.7 };

const analyticalObserver = new IntersectionObserver((monitoredElements, engineSelf) => {
    monitoredElements.forEach(activeEntry => {
        if(activeEntry.isIntersecting) {
            const rawNode = activeEntry.target;
            const numericLimit = parseInt(rawNode.getAttribute('data-target'), 10);
            let structuralStart = 0;
            const computationalSteps = 100;
            const mathematicalIncrement = numericLimit / computationalSteps;

            const calculationCycle = () => {
                structuralStart += mathematicalIncrement;
                if(structuralStart < numericLimit) {
                    rawNode.innerText = Math.floor(structuralStart).toLocaleString() + "+";
                    requestAnimationFrame(calculationCycle);
                } else {
                    rawNode.innerText = numericLimit.toLocaleString() + "+";
                }
            };
            calculationCycle();
            engineSelf.unobserve(rawNode);
        }
    });
}, observerOptions);

computationalCounters.forEach(targetNode => analyticalObserver.observe(targetNode));