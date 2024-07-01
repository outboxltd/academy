const typewriterElement = document.getElementById('typewriter');
const phrases = [
    "ברוכים הבאים לעולם הסייבר",
    "גלו את סודות ההאקינג האתי",
    "למדו להגן על מידע רגיש",
    "פתחו את הדלת לקריירה מרתקת",
    "קורס סייבר לחופש הגדול"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeWriter, 1000); // Pause at end of phrase
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeWriter, 500); // Pause before next phrase
    } else {
        setTimeout(typeWriter, isDeleting ? 50 : 100);
    }
}

typeWriter();
