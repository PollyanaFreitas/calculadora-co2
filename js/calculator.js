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
        const emissionKg = (distance * factor);
        
        return {
            emissionKg,
            emissionG: emissionKg * 1000,
            emissionTons: emissionKg / 1000,
            transport,
            distance
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
            comparisons[transportMode] = {
                emissionKg: emission.emissionKg,
                difference: currentEmission.emissionKg - emission.emissionKg,
                percentageDifference: ((currentEmission.emissionKg - emission.emissionKg) / currentEmission.emissionKg * 100)
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
        const creditsTons = emissionKg / 1000;
        const creditsKg = emissionKg;
        
        // Quantas árvores precisam ser plantadas
        const treesToPlant = Math.ceil(creditsKg / this.config.equivalences.treesToPlant);
        
        // Distância equivalente em carro elétrico
        const kmElectricCar = creditsKg / this.config.equivalences.kmByElectricCar;

        return {
            creditsTons,
            creditsKg,
            treesToPlant,
            kmElectricCar: Math.round(kmElectricCar),
            carbonCreditsNeeded: Math.ceil(creditsTons)
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
