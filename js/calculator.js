// Lógica de cálculo da emissão de CO2

class Calculator {
    constructor(config) {
        this.config = config;
    }

    /**
     * Calcula a emissão de CO2
     * @param {number} distance - Distância em km
     * @param {string} transport - Tipo de transporte
     * @returns {object} Objeto com dados da emissão
     */
    calculateEmission(distance, transport) {
        const factor = this.config.emissionFactors[transport] || 0;
        const emissionKg = Number((distance * factor).toFixed(3));
        
        return {
            emissionKg,
            emissionG: Number((emissionKg * 1000).toFixed(0)),
            emissionTons: Number((emissionKg / 1000).toFixed(3)),
            transport,
            distance,
            factor
        };
    }

    /**
     * Calcula comparação com outros transportes
     * @param {number} distance - Distância em km
     * @param {string} transport - Tipo de transporte
     * @returns {object} Comparações com outros transportes
     */
    calculateComparison(distance, transport) {
        const currentEmission = this.calculateEmission(distance, transport);
        const comparisons = {};

        Object.keys(this.config.emissionFactors).forEach(transportMode => {
            const emission = this.calculateEmission(distance, transportMode);
            const differenceKg = Number((currentEmission.emissionKg - emission.emissionKg).toFixed(3));
            const percentageDifference = currentEmission.emissionKg === 0
                ? null
                : Number(((differenceKg / currentEmission.emissionKg) * 100).toFixed(2));

            comparisons[transportMode] = {
                emissionKg: emission.emissionKg,
                emissionG: emission.emissionG,
                emissionTons: emission.emissionTons,
                cost: this.calculateTravelCost(distance, transportMode),
                differenceKg,
                percentageDifference,
                savings: differenceKg > 0 ? differenceKg : 0
            };
        });

        return comparisons;
    }

    /**
     * Calcula créditos de carbono necessários
     * @param {number} emissionKg - Emissão em kg
     * @returns {object} Dados de crédito de carbono
     */
    calculateCarbonCredits(emissionKg) {
        const creditsKg = emissionKg;
        const creditsTons = Number((creditsKg / this.config.carbonCredit.KG_PER_CREDIT).toFixed(3));
        const creditsUnits = Math.ceil(creditsKg / this.config.carbonCredit.KG_PER_CREDIT);
        const costMin = creditsUnits * this.config.carbonCredit.PRICE_MIN_BRL;
        const costMax = creditsUnits * this.config.carbonCredit.PRICE_MAX_BRL;
        
        // Quantas árvores precisam ser plantadas
        const treesToPlant = Math.ceil(creditsKg / this.config.equivalences.treesToPlant);
        
        // Distância equivalente em carro elétrico
        const kmElectricCar = Math.round(creditsKg / this.config.equivalences.kmByElectricCar);

        return {
            creditsKg,
            creditsTons,
            creditsUnits,
            costMin,
            costMax,
            costRange: `R$ ${costMin.toFixed(2)} - R$ ${costMax.toFixed(2)}`,
            treesToPlant,
            kmElectricCar,
            carbonCreditsNeeded: creditsUnits
        };
    }

    /**
     * Calcula tempo de viagem
     * @param {number} distance - Distância em km
     * @param {string} transport - Tipo de transporte
     * @returns {number} Tempo em horas
     */
    calculateTravelTime(distance, transport) {
        const speed = this.config.averageSpeeds[transport] || 60;
        return (distance / speed);
    }

    /**
     * Calcula custo da viagem
     * @param {number} distance - Distância em km
     * @param {string} transport - Tipo de transporte
     * @returns {number} Custo em reais
     */
    calculateTravelCost(distance, transport) {
        const costPerKm = this.config.costs[transport] || 0;
        return (distance * costPerKm);
    }

    /**
     * Converte horas em horas e minutos
     * @param {number} hours - Horas
     * @returns {object} Objeto com horas e minutos
     */
    formatTime(hours) {
        const h = Math.floor(hours);
        const m = Math.round((hours - h) * 60);
        return { hours: h, minutes: m };
    }
}
