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

        this.loadingElement = this.createLoadingElement();
    }

    /**
     * Cria elemento de carregamento global
     * @returns {HTMLElement}
     */
    createLoadingElement() {
        const overlay = document.createElement('div');
        overlay.id = 'ui-loading-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.display = 'none';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.35)';
        overlay.style.zIndex = '9999';
        overlay.innerHTML = `
            <div style="background: #ffffff; padding: 22px 28px; border-radius: 16px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); max-width: 320px; text-align:center;">
                <strong style="display:block; margin-bottom: 10px; font-size:1rem; color:#111;">Carregando informação...</strong>
                <span id="ui-loading-message" style="font-size:0.95rem; color:#444"></span>
            </div>
        `;
        document.body.appendChild(overlay);
        return overlay;
    }

    /**
     * Exibe a camada de carregamento
     * @param {HTMLElement} [button] - Botão que disparou o carregamento
     * @param {string} [message] - Texto de carregamento
     */
    showLoading(button, message = 'Carregando informação...') {
        if (button instanceof HTMLElement) {
            button.disabled = true;
            if (!button.dataset.originalText) {
                button.dataset.originalText = button.textContent;
            }
            button.textContent = 'Processando...';
        }
        const messageSpan = this.loadingElement.querySelector('#ui-loading-message');
        if (messageSpan) {
            messageSpan.textContent = message;
        }
        this.loadingElement.style.display = 'flex';
    }

    /**
     * Oculta a camada de carregamento
     * @param {HTMLElement} [button] - Botão para reativar após o carregamento
     */
    hideLoading(button) {
        if (button instanceof HTMLElement) {
            button.disabled = false;
            if (button.dataset.originalText) {
                button.textContent = button.dataset.originalText;
                delete button.dataset.originalText;
            }
        }
        this.loadingElement.style.display = 'none';
    }

    /**
     * Mostra um elemento DOM
     * @param {HTMLElement} element - Elemento a ser exibido
     */
    showElement(element) {
        if (!element) return;
        element.classList.remove('hidden');
    }

    /**
     * Esconde um elemento DOM
     * @param {HTMLElement} element - Elemento a ser escondido
     */
    hideElement(element) {
        if (!element) return;
        element.classList.add('hidden');
    }

    /**
     * Move a visualização até um elemento do DOM
     * @param {HTMLElement} element - Elemento de destino
     */
    scrollToElement(element) {
        if (!element) return;
        element.scrollIntoView({ behavior: 'smooth' });
    }

    /**
     * Popula a datalist com cidades
     * @param {array} cities - Lista de cidades
     */
    populateCitiesList(cities) {
        if (!this.citiesList) return;
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
        if (!this.distanceInput) return;
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
     * @param {number|string} distance - Distância em km
     */
    setDistance(distance) {
        if (!this.distanceInput) return;
        this.distanceInput.value = distance || '';
    }

    /**
     * Obtém os dados do formulário
     * @returns {object} Dados do formulário
     */
    getFormData() {
        const selectedTransport = document.querySelector('input[name="transport"]:checked');
        return {
            origin: this.originInput ? this.originInput.value.trim() : '',
            destination: this.destinationInput ? this.destinationInput.value.trim() : '',
            distance: this.distanceInput ? parseFloat(this.distanceInput.value) : 0,
            transport: selectedTransport ? selectedTransport.value : 'car',
            isManualDistance: this.manualDistanceCheckbox ? this.manualDistanceCheckbox.checked : false
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
     * Exibe mensagem de erro simples
     * @param {string} message - Mensagem de erro
     */
    showError(message) {
        alert(message);
    }

    /**
     * Formata número com separador de milhares e casas decimais
     * @param {number|string} value - Valor a formater
     * @param {number} decimals - Casas decimais
     * @returns {string} Valor formatado
     */
    formaterNumber(value, decimals = 2) {
        let number = Number(value);
        if (Number.isNaN(number)) {
            number = 0;
        }
        const fixed = number.toFixed(decimals);
        const parts = fixed.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return parts.join(',');
    }

    /**
     * Alias para formaterNumber
     */
    formatterNumber(value, decimals = 2) {
        return this.formaterNumber(value, decimals);
    }

    /**
     * Formata valor monetário em reais
     * @param {number|string} value - Valor monetário
     * @param {number} decimals - Casas decimais
     * @returns {string} Valor formatado em moeda
     */
    formatterCurrency(value, decimals = 2) {
        return `R$ ${this.formaterNumber(value, decimals)}`;
    }

    /**
     * Cria HTML de um card genérico
     * @param {string} title - Título do card
     * @param {string} content - Conteúdo HTML do card
     * @returns {string}
     */
    createCardHtml(title, content) {
        return `
            <article class="ui-card">
                <header class="ui-card__header"><h3>${title}</h3></header>
                <div class="ui-card__body">${content}</div>
            </article>
        `;
    }

    /**
     * Gera HTML de cards para rotas
     * @param {Array} routes - Rotas encontradas
     * @returns {string} HTML de cards de rota
     */
    renderRouteCards(routes = []) {
        if (!Array.isArray(routes) || routes.length === 0) {
            return '<p class="ui-empty">Nenhuma rota encontrada.</p>';
        }
        return routes.map((route) => `
            <div class="route-card">
                <div class="route-card__header">
                    <span class="route-card__label">${route.origin}</span>
                    <span class="route-card__label">→</span>
                    <span class="route-card__label">${route.destination}</span>
                </div>
                <div class="route-card__body">
                    <p>Distância: <strong>${this.formatterNumber(route.distanceKM, 0)} km</strong></p>
                </div>
            </div>
        `).join('');
    }

    /**
     * Gera HTML para uma seção com rotas
     * @param {Array} routes - Rotas encontradas
     * @returns {string}
     */
    renderRoutes(routes = []) {
        const title = routes.length ? 'Rotas Encontradas' : 'Rotas';
        return this.createCardHtml(title, this.renderRouteCards(routes));
    }

    /**
     * Gera HTML para cards automáticos de sugestão
     * @param {Array} cards - Lista de cartões com título e descrição
     * @returns {string}
     */
    renderAutoCards(cards = []) {
        if (!Array.isArray(cards) || cards.length === 0) {
            return '<p class="ui-empty">Nenhum card disponível no momento.</p>';
        }
        return cards.map((item) => `
            <div class="auto-card">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
        `).join('');
    }

    /**
     * Mostra resultado no HTML e exibe a seção
     * @param {string} content - Conteúdo HTML
     */
    showResults(content) {
        if (!this.resultsContent || !this.resultsSection) return;
        this.resultsContent.innerHTML = content;
        this.showElement(this.resultsSection);
        this.resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    /**
     * Mostra comparação no HTML e exibe a seção
     * @param {string} content - Conteúdo HTML
     */
    showComparison(content) {
        if (!this.comparisonContent || !this.comparisonSection) return;
        this.comparisonContent.innerHTML = content;
        this.showElement(this.comparisonSection);
    }

    /**
     * Mostra créditos de carbono no HTML e exibe a seção
     * @param {string} content - Conteúdo HTML
     */
    showCarbonCredits(content) {
        if (!this.carbonCreditsContent || !this.carbonCreditsSection) return;
        this.carbonCreditsContent.innerHTML = content;
        this.showElement(this.carbonCreditsSection);
    }

    /**
     * Esconde todas as seções de resultado e comparação
     */
    hideResults() {
        this.hideElement(this.resultsSection);
        this.hideElement(this.comparisonSection);
        this.hideElement(this.carbonCreditsSection);
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
                <div class="result-grid">
                    <!-- Rota -->
                    <div class="result-field">
                        <div class="result-field__icon">🛣️</div>
                        <div class="result-field__content">
                            <h3 class="result-field__label">Rota</h3>
                            <p class="result-field__value">${emission.origin || 'Origem'} → ${emission.destination || 'Destino'}</p>
                        </div>
                    </div>

                    <!-- Distância -->
                    <div class="result-field">
                        <div class="result-field__icon">📍</div>
                        <div class="result-field__content">
                            <h3 class="result-field__label">Distância</h3>
                            <p class="result-field__value">${this.formatterNumber(emission.distance, 0)} km</p>
                        </div>
                    </div>

                    <!-- Emissão de CO₂ -->
                    <div class="result-field">
                        <div class="result-field__icon">🌿</div>
                        <div class="result-field__content">
                            <h3 class="result-field__label">Emissão de CO₂</h3>
                            <p class="result-field__value">${this.formatterNumber(emission.emissionKg)} kg</p>
                            <p class="result-field__subtitle">(${this.formatterNumber(emission.emissionG, 0)} g)</p>
                        </div>
                    </div>

                    <!-- Meio de Transporte -->
                    <div class="result-field">
                        <div class="result-field__icon">${transportData.emoji}</div>
                        <div class="result-field__content">
                            <h3 class="result-field__label">Meio de Transporte</h3>
                            <p class="result-field__value">${transportData.label}</p>
                        </div>
                    </div>

                    <!-- Tempo Estimado (opcional) -->
                    <div class="result-field">
                        <div class="result-field__icon">⏱️</div>
                        <div class="result-field__content">
                            <h3 class="result-field__label">Tempo Estimado</h3>
                            <p class="result-field__value">${timeFormatted.hours}h ${timeFormatted.minutes}min</p>
                        </div>
                    </div>

                    ${travelCost > 0 ? `
                    <!-- Custo Estimado -->
                    <div class="result-field">
                        <div class="result-field__icon">💰</div>
                        <div class="result-field__content">
                            <h3 class="result-field__label">Custo Estimado</h3>
                            <p class="result-field__value">${this.formatterCurrency(travelCost)}</p>
                        </div>
                    </div>
                    ` : ''}
                </div>
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
            const difference = data.differenceKg;
            const percentage = data.percentageDifference;

            return `
                <div class="comparison-item">
                    <div class="comparison-icon">${transportData.emoji}</div>
                    <div class="comparison-info">
                        <h4>${transportData.label}</h4>
                        <p><strong>${this.formatterNumber(data.emissionKg)}</strong> kg CO₂</p>
                        <p><strong>${this.formatterCurrency(data.cost)}</strong></p>
                        ${difference !== 0 ? `
                            <p class="comparison-difference ${difference > 0 ? 'positive' : 'negative'}">
                                ${difference > 0 ? '+' : ''}${this.formatterNumber(difference)} kg
                                (${percentage !== null ? `${difference > 0 ? '+' : ''}${this.formatterNumber(percentage)}%` : '—'})
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
                <div class="comparison-footer">
                    <div class="comparison-tip">
                        <strong>💡 DICA:</strong>
                        <p>Bora fechar nesse desafio? Mudar nossa rotina de transporte reduz o CO₂ e dá um respiro pro planeta. Escolha a bike, a caminhada ou o ônibus e vamos juntos fazer essa engrenagem girar verde! 🚲🌍</p>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Renderiza HTML de comparação usando os dados fornecidos
     * @param {object} comparisons - Dados de comparação
     * @returns {string} HTML de comparação
     */
    renderComparison(comparisons) {
        return this.generateComparisonHTML(comparisons);
    }

    /**
     * Renderiza HTML de créditos de carbono usando os dados fornecidos
     * @param {number} emissionKg - Emissão em kg
     * @param {object} credits - Dados de créditos
     * @returns {string} HTML de créditos
     */
    renderCarbonCredits(emissionKg, credits) {
        return this.generateCarbonCreditsHTML(emissionKg, credits);
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
                <h2>💳 Créditos de Carbono</h2>
                <div class="result-grid">
                    <!-- Árvores para Plantar -->
                    <div class="result-field">
                        <div class="result-field__icon">🌳</div>
                        <div class="result-field__content">
                            <h3 class="result-field__label">Árvores</h3>
                            <p class="result-field__value">${this.formatterNumber(credits.treesToPlant, 0)}</p>
                            <p class="result-field__subtitle">Para compensar a emissão</p>
                        </div>
                    </div>

                    <!-- Distância em Carro Elétrico -->
                    <div class="result-field">
                        <div class="result-field__icon">⚡</div>
                        <div class="result-field__content">
                            <h3 class="result-field__label">Carro Elétrico</h3>
                            <p class="result-field__value">${this.formatterNumber(credits.kmElectricCar, 0)} km</p>
                            <p class="result-field__subtitle">Sem emissão equivalente</p>
                        </div>
                    </div>

                    <!-- Créditos de Carbono -->
                    <div class="result-field">
                        <div class="result-field__icon">🏆</div>
                        <div class="result-field__content">
                            <h3 class="result-field__label">Créditos</h3>
                            <p class="result-field__value">${this.formatterNumber(credits.carbonCreditsNeeded, 0)}</p>
                            <p class="result-field__subtitle">Unidades para neutralizar</p>
                        </div>
                    </div>

                    <!-- Valor Estimado -->
                    <div class="result-field">
                        <div class="result-field__icon">💰</div>
                        <div class="result-field__content">
                            <h3 class="result-field__label">Valor Estimado</h3>
                            <p class="result-field__value">${credits.costRange}</p>
                            <p class="result-field__subtitle">Preço mínimo e máximo</p>
                        </div>
                    </div>
                </div>
                <div class="credits-footer">
                    <div class="credits-tip">
                        <strong>ℹ️ O que são Créditos de Carbono?</strong>
                        <p>Créditos de carbono são certificados que representam o direito de emitir uma tonelada de CO₂. Empresas e indivíduos os usam para compensar suas emissões, financiando projetos de energia limpa, reflorestamento e preservação ambiental. 🌍 Uma forma tangível de impacto positivo no clima! ♻️</p>
                    </div>
                </div>
            </div>
        `;
    }
}

const UI = new UIManager();
window.UI = UI;
