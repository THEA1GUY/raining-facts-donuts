const rainingContainer = document.getElementById('raining-container');
const factPopup = document.getElementById('fact-popup');
const factText = document.getElementById('fact-text');
const closePopupButton = document.getElementById('close-popup');

const FACT_API_URL = 'https://uselessfacts.jsph.pl/random.json?language=en';

function createDoughnut() {
    const doughnut = document.createElement('div');
    doughnut.classList.add('doughnut');

    // Randomize starting position, size, and animation duration
    doughnut.style.left = `${Math.random() * 100}vw`;
    const size = Math.random() * 30 + 20; // Size between 20px and 50px
    doughnut.style.width = `${size}px`;
    doughnut.style.height = `${size}px`;
    const duration = Math.random() * 5 + 5; // Duration between 5s and 10s
    doughnut.style.animationDuration = `${duration}s`;

    doughnut.addEventListener('click', async () => {
        try {
            const response = await fetch(FACT_API_URL);
            const data = await response.json();
            factText.textContent = data.text;
            factPopup.classList.remove('hidden');
        } catch (error) {
            console.error('Error fetching fact:', error);
            factText.textContent = 'Could not fetch a fact. Please try again!';
            factPopup.classList.remove('hidden');
        }
    });

    rainingContainer.appendChild(doughnut);

    // Remove doughnut from DOM after it falls out of view
    setTimeout(() => {
        doughnut.remove();
    }, duration * 1000);
}

closePopupButton.addEventListener('click', () => {
    factPopup.classList.add('hidden');
});

// Create a new doughnut every 500ms
setInterval(createDoughnut, 500);
