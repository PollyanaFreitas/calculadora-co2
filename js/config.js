// Configurações gerais da aplicação

const TRANSPORT_MODES = {
    bicycle: { label: 'Bicicleta', emoji: '🚴' },
    car: { label: 'Carro', emoji: '🚗' },
    bus: { label: 'Ônibus', emoji: '🚌' },
    truck: { label: 'Caminhão', emoji: '🚚' }
};

const TRANSPORT_NAMES = {
    bicycle: TRANSPORT_MODES.bicycle.label,
    car: TRANSPORT_MODES.car.label,
    bus: TRANSPORT_MODES.bus.label,
    truck: TRANSPORT_MODES.truck.label
};

const CARBON_CREDIT = {
    KG_PER_CREDIT: 1000,
    PRICE_MIN_BRL: 50,
    PRICE_MAX_BRL: 150
};

var CONFIG = {
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
    },

    carbonCredit: CARBON_CREDIT,

    populadateDatalist: function() {
        const cities = RouteDB.getAllCities();
        const datalist = document.getElementById('cities-list');
        if (!datalist || !Array.isArray(cities)) {
            return;
        }

        datalist.innerHTML = '';
        cities.forEach((city) => {
            const option = document.createElement('option');
            option.value = city;
            datalist.appendChild(option);
        });
    },

    setupDistanceAutofull: function() {
        const originInput = document.getElementById('origin');
        const destinationInput = document.getElementById('destination');
        const distanceInput = document.getElementById('distance');
        const manualCheckbox = document.getElementById('manual-distance');
        const helperText = document.querySelector('.calculator__helper-text');

        if (!originInput || !destinationInput || !distanceInput || !manualCheckbox) {
            return;
        }

        const setHelperText = (text) => {
            if (helperText) {
                helperText.textContent = text;
            }
        };

        const fillDistance = () => {
            if (manualCheckbox.checked) {
                setHelperText('Insira a distância manualmente.');
                return;
            }

            const origin = originInput.value.trim();
            const destination = destinationInput.value.trim();

            if (!origin || !destination || origin === destination) {
                distanceInput.value = '';
                setHelperText('A distância será preenchida automaticamente');
                return;
            }

            const distance = getDistance(origin, destination);
            if (distance) {
                distanceInput.value = distance;
                setHelperText('A distância será preenchida automaticamente');
            } else {
                distanceInput.value = '';
                setHelperText('Rota não encontrada para esse par de cidades. Insira manualmente.');
            }
        };

        originInput.addEventListener('input', fillDistance);
        originInput.addEventListener('change', fillDistance);
        originInput.addEventListener('blur', fillDistance);
        originInput.addEventListener('focusout', fillDistance);
        destinationInput.addEventListener('input', fillDistance);
        destinationInput.addEventListener('change', fillDistance);
        destinationInput.addEventListener('blur', fillDistance);
        destinationInput.addEventListener('focusout', fillDistance);
        manualCheckbox.addEventListener('change', () => {
            if (!manualCheckbox.checked) {
                fillDistance();
            }
        });

        // Tenta preencher a distância uma vez após a configuração inicial
        fillDistance();
    }
};
