const rateItems = document.querySelectorAll('.rate-item');

// Ajoute un événement de clic à chaque case de taux
rateItems.forEach(rateItem => {
    rateItem.addEventListener('click', () => {
        // Récupère le taux depuis l'attribut data-rate
        const selectedRate = rateItem.getAttribute('data-rate');

        // Met à jour le champ "Taux d'intérêt" dans la calculette
        document.getElementById('loan-rate').value = selectedRate;

        // Lance le calcul automatique avec le taux mis à jour
        calculateLoan();
    });
});

// calculette.js
function calculateLoan() {
    const loanAmount = parseFloat(document.getElementById('loan').value);
    const duration = parseInt(document.getElementById('duration').value);
    const loanRate = parseFloat(document.getElementById('loan-rate').value);

    // Vérification des entrées pour éviter les erreurs
    if (isNaN(loanAmount) || isNaN(duration) || isNaN(loanRate) || loanAmount <= 0 || duration <= 0 || loanRate <= 0) {
        document.getElementById('payment-amount').textContent = "0 €";
        return;
    }

    // Calcul de la mensualité avec la formule de prêt à taux fixe
    const monthlyRate = loanRate / 100 / 12;  // Taux mensuel
    const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -duration));

    // Formatage du montant avec une virgule comme séparateur décimal
    const formattedPayment = monthlyPayment.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Mise à jour de l'élément avec le montant des mensualités et ajout de "/mois"
    document.getElementById('payment-amount').innerHTML = `${formattedPayment} <span id="per-month">/mois</span>`;
}

// Attacher des événements 'input' pour déclencher le calcul automatique à chaque modification
document.getElementById('loan').addEventListener('input', calculateLoan);
document.getElementById('duration').addEventListener('input', calculateLoan);
document.getElementById('loan-rate').addEventListener('input', calculateLoan);


// Sélectionner tous les éléments avec la classe fade-in
const fadeInElements = document.querySelectorAll('.fade-in');

// Fonction pour vérifier si un élément est visible dans la vue
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}




// Fonction pour déclencher l'animation
function handleScrollAnimation() {
    fadeInElements.forEach(el => {
        if (isInViewport(el)) {
            el.classList.add('visible'); // Ajoute une classe pour lancer l'animation
        }
    });
}

// Ajouter un écouteur d'événement au défilement
window.addEventListener('scroll', handleScrollAnimation);

// Lancer l'animation pour les éléments visibles dès le chargement
handleScrollAnimation();

// Récupérer l'élément du compteur de progression
const scrollProgress = document.getElementById('scroll-progress');

// Fonction pour mettre à jour le pourcentage de défilement
function updateScrollProgress() {
    const scrollTop = window.scrollY; // Position verticale actuelle
    const docHeight = document.documentElement.scrollHeight - window.innerHeight; // Hauteur totale défilable
    const scrollPercent = Math.round((scrollTop / docHeight) * 100); // Calcul du pourcentage
    scrollProgress.textContent = `${scrollPercent}%`; // Mettre à jour le texte
}

// Écouter l'événement de défilement pour mettre à jour le compteur
window.addEventListener('scroll', updateScrollProgress);

// Mettre à jour le compteur au chargement initial
updateScrollProgress();

// Liste des images pour chaque section
const images = {
    "Acquisition résidence principale": "img/En-tête (58) 1.png",
    "Rachat de soulte": "img/En-tête (58) 1.png",
    "Investissement locatif": "img/En-tête (58) 1.png",
    "Résidence secondaire": "img/En-tête (58) 1.png",
    "Regroupement de crédits": "img/En-tête (58) 1.png",
    "Renégociation de crédit(s)": "img/En-tête (58) 1.png",
    "Courtier en assurance": "img/En-tête (58) 1.png",
    "Défiscalisation": "img/En-tête (58) 1.png",
};

document.querySelectorAll('.toggle-button').forEach(button => {
    button.addEventListener('click', () => {
        const listItem = button.closest('.list-item');
        const h2 = listItem.querySelector('h2');
        const serviceImage = document.getElementById('service-image');
        const listItems = Array.from(document.querySelectorAll('.list-item'));
        const index = listItems.indexOf(listItem); // Obtenir l'index de l'élément cliqué

        // Fermez les autres sections si nécessaire
        document.querySelectorAll('.list-item.expanded').forEach(item => {
            if (item !== listItem) {
                item.classList.remove('expanded');
                item.querySelector('.toggle-button').textContent = '+';
            }
        });

        // Toggle the current section
        if (listItem.classList.contains('expanded')) {
            listItem.classList.remove('expanded');
            button.textContent = '+';
        } else {
            listItem.classList.add('expanded');
            button.textContent = '-';

            // Change the image based on the clicked section
            const newImage = images[h2.textContent.trim()];
            if (newImage) {
                serviceImage.src = newImage;
            }

            // Move the image dynamically
            const translateYValue = index * 4; // Calculez la position basée sur l'index
            serviceImage.style.transform = `translateY(${translateYValue}em)`;
        }
    });
});
