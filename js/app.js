// Arquivo principal da aplicação
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        // Inicialização da aplicação quando o DOM estiver pronto
        CONFIG.populadateDatalist();
        CONFIG.setupDistanceAutofull();

        const calculator = new Calculator(CONFIG);
        const calculatorForm = document.getElementById('calculator-form');

        if (!calculatorForm) {
            console.error('Formulário calculator-form não encontrado.');
            return;
        }

        calculatorForm.addEventListener('submit', handleCalculatorSubmit);

        console.log('Calculador inicializada!');

        /**
         * Manipula o envio do formulário de cálculo
         * @param {Event} event
         */
        function handleCalculatorSubmit(event) {
            event.preventDefault();

            const originValue = UI.originInput ? UI.originInput.value.trim() : '';
            const destinationValue = UI.destinationInput ? UI.destinationInput.value.trim() : '';
            const distanceValue = UI.distanceInput ? parseFloat(UI.distanceInput.value) : 0;
            const selectedTransportInput = document.querySelector('input[name="transport"]:checked');
            const transportMode = selectedTransportInput ? selectedTransportInput.value : 'car';
            const submitButton = calculatorForm.querySelector('button[type="submit"]');

            if (!originValue || !destinationValue || !UI.distanceInput.value) {
                alert('Preencha origem, destino e distância antes de calcular.');
                return;
            }

            if (Number.isNaN(distanceValue) || distanceValue <= 0) {
                alert('A distância deve ser um número maior que zero.');
                return;
            }

            UI.showLoading(submitButton);
            UI.hideElement(UI.resultsSection);
            UI.hideElement(UI.comparisonSection);
            UI.hideElement(UI.carbonCreditsSection);

            setTimeout(() => {
                try {
                    const routeEmission = calculator.calculateEmission(distanceValue, transportMode);
                    const carBaselineEmission = calculator.calculateEmission(distanceValue, 'car');
                    const comparisonResults = calculator.calculateComparison(distanceValue, transportMode);
                    const carbonCredits = calculator.calculateCarbonCredits(routeEmission.emissionKg);

                    const resultsHTML = UI.generateResultsHTML(routeEmission, calculator);
                    const comparisonHTML = UI.renderComparison(comparisonResults);
                    const creditsHTML = UI.renderCarbonCredits(routeEmission.emissionKg, carbonCredits);

                    UI.resultsContent.innerHTML = resultsHTML;
                    UI.comparisonContent.innerHTML = comparisonHTML;
                    UI.carbonCreditsContent.innerHTML = creditsHTML;

                    UI.showElement(UI.resultsSection);
                    UI.showElement(UI.comparisonSection);
                    UI.showElement(UI.carbonCreditsSection);
                    UI.scrollToElement(UI.resultsSection);

                    console.log('Emissão de referência (carro):', carBaselineEmission);
                } catch (error) {
                    console.error('Erro ao processar o cálculo:', error);
                    alert('Ocorreu um erro ao calcular as emissões. Tente novamente.');
                } finally {
                    UI.hideLoading(submitButton);
                }
            }, 1500);
        }
    });
})();
