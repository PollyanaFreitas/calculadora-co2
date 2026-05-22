// Manipulação da interface do usuário

class UIManager {
    constructor() {
        this.form = document.getElementById('calculator-form');
        this.originInput = document.getElementById('origin');
        this.destinationInput = document.getElementById('destination');
        this.distanceInput = document.getElementById('distance');
        this.manualDistanceCheckbox = document.getElementById('manual-distance');
        this.transportRadios = document.querySelectorAll('input[name="transport"]');
        this.citiesList = document.getElementById('cities-list');
        
        this.resultsSection = document.getElementById('results');
        this.resultsContent = document.getElementById('results-content');
        this.comparisonSection = document.getElementById('comparison');
        this.comparisonContent = document.getElementById('comparation-content');
        this.carbonCreditsSection = document.getElementById('carbon-credits');
        this.carbonCreditsContent = document.getElementById('carbon-credits-content');
    }

    /**
     * Popula a datalist com cidades
     * @param {array} cities - Lista de cidades
     */
    populateCitiesList(cities) {
        this.citiesList.innerHTML = '';
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            this.citiesList.appendChild(option);
        });
    }

    /**
     * Ativa/desativa o campo de distância manual
     * @param {boolean} isManual - Se deve ativar modo manual
     */
    toggleManualDistance(isManual) {
        this.distanceInput.readOnly = !isManual;
        if (isManual) {
            this.distanceInput.classList.remove('calculator__input--readonly');
        } else {
            this.distanceInput.classList.add('calculator__input--readonly');
            this.distanceInput.value = '';
        }
    }

    /**
     * Define o valor da distância
     * @param {number} distance - Distância em km
     */
    setDistance(distance) {
        this.distanceInput.value = distance || '';
    }

    /**
     * Obtém os dados do formulário
     * @returns {object} Dados do formulário
     */
    getFormData() {
        const selectedTransport = document.querySelector('input[name="transport"]:checked');
        
        return {
            origin: this.originInput.value,
            destination: this.destinationInput.value,
            distance: parseFloat(this.distanceInput.value),
            transport: selectedTransport ? selectedTransport.value : 'car',
            isManualDistance: this.manualDistanceCheckbox.checked
        };
    }

    /**
     * Valida o formulário
     * @returns {boolean} Se o formulário é válido
     */
    validateForm() {
        const data = this.getFormData();
        
        if (!data.origin || !data.destination) {
            this.showError('Por favor, selecione origem e destino');
            return false;
        }

        if (!data.distance || data.distance <= 0) {
            this.showError('Por favor, insira uma distância válida');
            return false;
        }

        if (data.origin === data.destination) {
            this.showError('Origem e destino não podem ser iguais');
            return false;
        }

        return true;
    }

    /**
     * Exibe mensagem de erro
     * @param {string} message - Mensagem de erro
     */
    showError(message) {
        alert(message);
    }

    /**
     * Mostra seção de resultados
     * @param {string} content - Conteúdo HTML
     */
    showResults(content) {
        this.resultsContent.innerHTML = content;
        this.resultsSection.classList.remove('hidden');
        this.resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    /**
     * Mostra seção de comparação
     * @param {string} content - Conteúdo HTML
     */
    showComparison(content) {
        this.comparisonContent.innerHTML = content;
        this.comparisonSection.classList.remove('hidden');
    }

    /**
     * Mostra seção de créditos de carbono
     * @param {string} content - Conteúdo HTML
     */
    showCarbonCredits(content) {
        this.carbonCreditsContent.innerHTML = content;
        this.carbonCreditsSection.classList.remove('hidden');
    }

    /**
     * Esconde todas as seções de resultado
     */
    hideResults() {
        this.resultsSection.classList.add('hidden');
        this.comparisonSection.classList.add('hidden');
        this.carbonCreditsSection.classList.add('hidden');
    }

    /**
     * Formata número para exibição
     * @param {number} num - Número a formatar
     * @param {number} decimals - Número de casas decimais
     * @returns {string} Número formatado
     */
    formatNumber(num, decimals = 2) {
        return num.toLocaleString('pt-BR', { 
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals 
        });
    }

    /**
     * Gera HTML para resultado de emissão
     * @param {object} emission - Dados de emissão
     * @param {object} calculator - Instância do calculator
     * @returns {string} HTML do resultado
     */
    generateResultsHTML(emission, calculator) {
        const travelTime = calculator.calculateTravelTime(emission.distance, emission.transport);
        const travelCost = calculator.calculateTravelCost(emission.distance, emission.transport);
        const timeFormatted = calculator.formatTime(travelTime);
        const transportData = TRANSPORT_MODES[emission.transport] || { label: emission.transport, emoji: '' };

        return `
            <div class="result-card">
                <h2>📊 Resultado da Emissão</h2>
                <div class="result-item">
                    <label>Trajeto:</label>
                    <p>${emission.distance} km via ${transportData.emoji} ${transportData.label}</p>
                </div>
                <div class="result-item">
                    <label>CO₂ Emitido:</label>
                    <p class="result-highlight">${this.formatNumber(emission.emissionKg)} kg (${this.formatNumber(emission.emissionG)} g)</p>
                </div>
                <div class="result-item">
                    <label>Tempo Estimado:</label>
                    <p>${timeFormatted.hours}h ${timeFormatted.minutes}min</p>
                </div>
                ${travelCost > 0 ? `
                    <div class="result-item">
                        <label>Custo Estimado:</label>
                        <p>R$ ${this.formatNumber(travelCost)}</p>
                    </div>
                ` : ''}
            </div>
        `;
    }

    /**
     * Gera HTML para comparação
     * @param {object} comparisons - Dados de comparação
     * @returns {string} HTML da comparação
     */
    generateComparisonHTML(comparisons) {
        const items = Object.keys(comparisons).map(transport => {
            const data = comparisons[transport];
            const transportData = TRANSPORT_MODES[transport] || { label: transport, emoji: '' };

            return `
                <div class="comparison-item">
                    <div class="comparison-icon">${transportData.emoji}</div>
                    <div class="comparison-info">
                        <h4>${transportData.label}</h4>
                        <p>${this.formatNumber(data.emissionKg)} kg CO₂</p>
                        <p>R$ ${this.formatNumber(data.cost)}</p>
                        ${data.differenceKg !== 0 ? `
                            <p class="comparison-difference ${data.differenceKg > 0 ? 'positive' : 'negative'}">
                                ${data.differenceKg > 0 ? '+' : ''}${this.formatNumber(data.differenceKg)} kg
                                (${data.percentageDifference !== null ? `${data.percentageDifference > 0 ? '+' : ''}${this.formatNumber(data.percentageDifference)}%` : '—'})
                            </p>
                        ` : '<p class="comparison-difference">Igual</p>'}
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="comparison-card">
                <h2>🔄 Comparação com Outros Transportes</h2>
                <div class="comparison-grid">
                    ${items}
                </div>
            </div>
        `;
    }

    /**
     * Gera HTML para créditos de carbono
     * @param {number} emissionKg - Emissão em kg
     * @param {object} credits - Dados de créditos
     * @returns {string} HTML de créditos
     */
    generateCarbonCreditsHTML(emissionKg, credits) {
        return `
            <div class="credits-card">
                <h2>🌱 Compensação de Carbono</h2>
                <div class="credits-item">
                    <label>Árvores para Plantar:</label>
                    <p class="credits-value">${credits.treesToPlant} árvores</p>
                    <p class="credits-subtitle">Para compensar a emissão total</p>
                </div>
                <div class="credits-item">
                    <label>Equivalente em Carro Elétrico:</label>
                    <p class="credits-value">${credits.kmElectricCar} km</p>
                    <p class="credits-subtitle">Distância equivalente sem emissão</p>
                </div>
                <div class="credits-item">
                    <label>Créditos de Carbono:</label>
                    <p class="credits-value">${credits.carbonCreditsNeeded} créditos</p>
                    <p class="credits-subtitle">Unidades para neutralizar a emissão</p>
                </div>
                <div class="credits-item">
                    <label>Valor Estimado:</label>
                    <p class="credits-value">${credits.costRange}</p>
                    <p class="credits-subtitle">Com base no preço mínimo e máximo</p>
                </div>
            </div>
        `;
    }
}
