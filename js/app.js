// Arquivo principal da aplicação

let calculator;
let uiManager;

// Inicializa a aplicação
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o Calculator e UIManager
    calculator = new Calculator(CONFIG);
    uiManager = new UIManager();

    // Popula datalist com cidades usando a configuração
    CONFIG.populadateDatalist();
    CONFIG.setupDistanceAutofull();

    // Event Listeners
    setupEventListeners();
});

/**
 * Configura os event listeners
 */
function setupEventListeners() {
    // Evento do checkbox de distância manual
    uiManager.manualDistanceCheckbox.addEventListener('change', (e) => {
        uiManager.toggleManualDistance(e.target.checked);
    });

    // Evento quando origem ou destino mudam
    uiManager.originInput.addEventListener('input', updateDistance);
    uiManager.originInput.addEventListener('change', updateDistance);
    uiManager.originInput.addEventListener('blur', updateDistance);
    uiManager.destinationInput.addEventListener('input', updateDistance);
    uiManager.destinationInput.addEventListener('change', updateDistance);
    uiManager.destinationInput.addEventListener('blur', updateDistance);

    // Evento quando distância é alterada manualmente
    uiManager.distanceInput.addEventListener('input', (e) => {
        if (uiManager.manualDistanceCheckbox.checked && e.target.value) {
            uiManager.hideResults();
        }
    });

    // Evento do formulário
    uiManager.form.addEventListener('submit', handleFormSubmit);
}

/**
 * Atualiza a distância automaticamente
 */
function updateDistance() {
    if (uiManager.manualDistanceCheckbox.checked) {
        return; // Se modo manual está ativo, não atualiza
    }

    const origin = uiManager.originInput.value;
    const destination = uiManager.destinationInput.value;

    if (origin && destination && origin !== destination) {
        const distance = getDistance(origin, destination);
        if (distance) {
            uiManager.setDistance(distance);
            attemptAutoCalculate();
        } else {
            uiManager.setDistance('');
            uiManager.hideResults();
        }
    } else {
        uiManager.setDistance('');
        uiManager.hideResults();
    }
}

function attemptAutoCalculate() {
    if (uiManager.manualDistanceCheckbox.checked) {
        return;
    }

    const origin = uiManager.originInput.value;
    const destination = uiManager.destinationInput.value;
    const distance = uiManager.distanceInput.value;

    if (!origin || !destination || !distance || origin === destination) {
        return;
    }

    if (!uiManager.validateForm()) {
        return;
    }

    const formData = uiManager.getFormData();
    const emission = calculator.calculateEmission(formData.distance, formData.transport);
    const comparisons = calculator.calculateComparison(formData.distance, formData.transport);
    const credits = calculator.calculateCarbonCredits(emission.emissionKg);

    const resultsHTML = uiManager.generateResultsHTML(emission, calculator);
    const comparisonHTML = uiManager.generateComparisonHTML(comparisons);
    const creditsHTML = uiManager.generateCarbonCreditsHTML(emission.emissionKg, credits);

    uiManager.showResults(resultsHTML);
    uiManager.showComparison(comparisonHTML);
    uiManager.showCarbonCredits(creditsHTML);
}

/**
 * Manipula o envio do formulário
 */
function handleFormSubmit(e) {
    e.preventDefault();

    // Valida o formulário
    if (!uiManager.validateForm()) {
        return;
    }

    // Obtém dados do formulário
    const formData = uiManager.getFormData();

    // Calcula emissão
    const emission = calculator.calculateEmission(formData.distance, formData.transport);

    // Calcula comparação
    const comparisons = calculator.calculateComparison(formData.distance, formData.transport);

    // Calcula créditos de carbono
    const credits = calculator.calculateCarbonCredits(emission.emissionKg);

    // Gera HTMLs
    const resultsHTML = uiManager.generateResultsHTML(emission, calculator);
    const comparisonHTML = uiManager.generateComparisonHTML(comparisons);
    const creditsHTML = uiManager.generateCarbonCreditsHTML(emission.emissionKg, credits);

    // Exibe resultados
    uiManager.showResults(resultsHTML);
    uiManager.showComparison(comparisonHTML);
    uiManager.showCarbonCredits(creditsHTML);

    // Log para debug
    console.log('Emissão:', emission);
    console.log('Comparação:', comparisons);
    console.log('Créditos:', credits);
}
