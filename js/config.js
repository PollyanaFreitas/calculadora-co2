// Configurações gerais da aplicação

const CONFIG = {
    // Fatores de emissão de CO2 por km (em kg de CO2)
    emissionFactors: {
        bicycle: 0,
        car: 0.192,      // 192g de CO2 por km
        bus: 0.089,      // 89g de CO2 por km
        truck: 0.256     // 256g de CO2 por km
    },
    
    // Equivalências para comparação
    equivalences: {
        treesToPlant: 21.77,      // kg de CO2 por árvore plantada por ano
        kmByElectricCar: 0.050,   // kg de CO2 por km em carro elétrico
        carbonOffset: 1000        // kg de CO2 que 1 ton de crédito de carbono compensa
    },
    
    // Velocidade média por tipo de transporte (km/h)
    averageSpeeds: {
        bicycle: 20,
        car: 80,
        bus: 60,
        truck: 70
    },
    
    // Custos aproximados por km
    costs: {
        bicycle: 0,
        car: 0.50,        // R$ 0.50 por km
        bus: 0.15,        // R$ 0.15 por km
        truck: 0.80       // R$ 0.80 por km
    }
};

// Nomes para exibição em português
const TRANSPORT_NAMES = {
    bicycle: 'Bicicleta',
    car: 'Carro',
    bus: 'Ônibus',
    truck: 'Caminhão'
};
