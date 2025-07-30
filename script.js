const rainingContainer = document.getElementById('raining-container');
const factPopup = document.getElementById('fact-popup');
const factText = document.getElementById('fact-text');
const closePopupButton = document.getElementById('close-popup');

const FACT_API_URL = 'https://uselessfacts.jsph.pl/random.json?language=en';
const MAX_DOUGHNUTS = 30;
let lastFocusedElement;

function createDoughnut() {
    const doughnut = document.createElement('div');
    doughnut.classList.add('doughnut');
    doughnut.setAttribute('role', 'button');
    doughnut.setAttribute('tabindex', '0');
    doughnut.setAttribute('aria-label', 'A falling doughnut, click to get a fact');

    // Randomize starting position, size, and animation duration
    doughnut.style.left = `${Math.random() * 100}vw`;
    const size = Math.random() * 30 + 20; // Size between 20px and 50px
    doughnut.style.width = `${size}px`;
    doughnut.style.height = `${size}px`;
    const duration = Math.random() * 5 + 5; // Duration between 5s and 10s
    doughnut.style.animationDuration = `${duration}s`;

    const showFact = async () => {
        lastFocusedElement = document.activeElement;
        try {
            const response = await fetch(FACT_API_URL);
            const data = await response.json();
            factText.textContent = data.text;
            factPopup.classList.remove('hidden');
            factPopup.setAttribute('aria-hidden', 'false');
            closePopupButton.focus();
        } catch (error) {
            console.error('Error fetching fact:', error);
            factText.textContent = 'Could not fetch a fact. Please try again!';
            factPopup.classList.remove('hidden');
            factPopup.setAttribute('aria-hidden', 'false');
            closePopupButton.focus();
        }
    };

    doughnut.addEventListener('click', showFact);
    doughnut.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            showFact();
        }
    });

    rainingContainer.appendChild(doughnut);

    // Remove doughnut from DOM when the animation ends
    doughnut.addEventListener('animationend', () => {
        doughnut.remove();
    });
}

function hideFact() {
    factPopup.classList.add('hidden');
    factPopup.setAttribute('aria-hidden', 'true');
    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}

closePopupButton.addEventListener('click', hideFact);

factPopup.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        hideFact();
    }
});


// Create a new doughnut every 500ms, if not too many
setInterval(() => {
    const doughnutCount = rainingContainer.getElementsByClassName('doughnut').length;
    if (doughnutCount < MAX_DOUGHNUTS) {
        createDoughnut();
    }
}, 500);
