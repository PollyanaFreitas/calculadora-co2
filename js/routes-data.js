var RouteDB = {
    routes: [
        { origin: 'São Paulo,SP', destination: 'Rio de Janeiro,RJ', distanceKM: 430 },
        { origin: 'São Paulo,SP', destination: 'Rio de Janeiro,RJ', distanceKM: 445 },
        { origin: 'São Paulo,SP', destination: 'Brasília,DF', distanceKM: 1015 },
        { origin: 'São Paulo,SP', destination: 'Brasília,DF', distanceKM: 1040 },
        { origin: 'São Paulo,SP', destination: 'Campinas,SP', distanceKM: 95 },
        { origin: 'São Paulo,SP', destination: 'Guarulhos,SP', distanceKM: 25 },
        { origin: 'São Paulo,SP', destination: 'São Bernardo do Campo,SP', distanceKM: 35 },
        { origin: 'São Paulo,SP', destination: 'São José dos Campos,SP', distanceKM: 100 },
        { origin: 'São Paulo,SP', destination: 'Jundiaí,SP', distanceKM: 60 },
        { origin: 'São Paulo,SP', destination: 'Ribeirão Preto,SP', distanceKM: 315 },
        { origin: 'São Paulo,SP', destination: 'Belo Horizonte,MG', distanceKM: 586 },
        { origin: 'São Paulo,SP', destination: 'Curitiba,PR', distanceKM: 408 },
        { origin: 'São Paulo,SP', destination: 'Porto Alegre,RS', distanceKM: 1130 },
        { origin: 'Rio de Janeiro,RJ', destination: 'Belo Horizonte,MG', distanceKM: 435 },
        { origin: 'Rio de Janeiro,RJ', destination: 'Vitória,ES', distanceKM: 520 },
        { origin: 'Rio de Janeiro,RJ', destination: 'Curitiba,PR', distanceKM: 700 },
        { origin: 'Rio de Janeiro,RJ', destination: 'Brasília,DF', distanceKM: 1145 },
        { origin: 'Rio de Janeiro,RJ', destination: 'Salvador,BA', distanceKM: 1630 },
        { origin: 'Rio de Janeiro,RJ', destination: 'Recife,PE', distanceKM: 2300 },
        { origin: 'Rio de Janeiro,RJ', destination: 'Porto Alegre,RS', distanceKM: 1140 },
        { origin: 'Belo Horizonte,MG', destination: 'Brasília,DF', distanceKM: 716 },
        { origin: 'Belo Horizonte,MG', destination: 'Salvador,BA', distanceKM: 1600 },
        { origin: 'Belo Horizonte,MG', destination: 'Uberlândia,MG', distanceKM: 540 },
        { origin: 'Belo Horizonte,MG', destination: 'Vitória,ES', distanceKM: 540 },
        { origin: 'Brasília,DF', destination: 'Goiânia,GO', distanceKM: 209 },
        { origin: 'Brasília,DF', destination: 'Salvador,BA', distanceKM: 1656 },
        { origin: 'Brasília,DF', destination: 'Fortaleza,CE', distanceKM: 2415 },
        { origin: 'Brasília,DF', destination: 'Manaus,AM', distanceKM: 4350 },
        { origin: 'Brasília,DF', destination: 'Belém,PA', distanceKM: 1700 },
        { origin: 'Salvador,BA', destination: 'Recife,PE', distanceKM: 808 },
        { origin: 'Salvador,BA', destination: 'Fortaleza,CE', distanceKM: 1230 },
        { origin: 'Salvador,BA', destination: 'Maceió,AL', distanceKM: 640 },
        { origin: 'Salvador,BA', destination: 'Aracaju,SE', distanceKM: 350 },
        { origin: 'Fortaleza,CE', destination: 'Natal,RN', distanceKM: 310 },
        { origin: 'Fortaleza,CE', destination: 'João Pessoa,PB', distanceKM: 555 },
        { origin: 'Fortaleza,CE', destination: 'Teresina,PI', distanceKM: 640 },
        { origin: 'Recife,PE', destination: 'João Pessoa,PB', distanceKM: 120 },
        { origin: 'Recife,PE', destination: 'Maceió,AL', distanceKM: 280 },
        { origin: 'Recife,PE', destination: 'Aracaju,SE', distanceKM: 520 },
        { origin: 'Recife,PE', destination: 'Belém,PA', distanceKM: 2860 },
        { origin: 'Manaus,AM', destination: 'Belém,PA', distanceKM: 1850 },
        { origin: 'Manaus,AM', destination: 'Cuiabá,MT', distanceKM: 1860 },
        { origin: 'Curitiba,PR', destination: 'Florianópolis,SC', distanceKM: 300 },
        { origin: 'Curitiba,PR', destination: 'Porto Alegre,RS', distanceKM: 710 },
        { origin: 'Porto Alegre,RS', destination: 'Florianópolis,SC', distanceKM: 460 },
        { origin: 'Porto Alegre,RS', destination: 'Cuiabá,MT', distanceKM: 1750 },
        { origin: 'Goiânia,GO', destination: 'Campo Grande,MS', distanceKM: 840 },
        { origin: 'Campo Grande,MS', destination: 'Cuiabá,MT', distanceKM: 750 },
        { origin: 'Cuiabá,MT', destination: 'Palmas,TO', distanceKM: 840 },
        { origin: 'Palmas,TO', destination: 'Belém,PA', distanceKM: 1020 },
        { origin: 'Aracaju,SE', destination: 'Maceió,AL', distanceKM: 220 },
        { origin: 'Teresina,PI', destination: 'São Luís,MA', distanceKM: 340 },
        { origin: 'São Paulo,SP', destination: 'Ribeirão Preto,SP', distanceKM: 315 },
        { origin: 'São Paulo,SP', destination: 'Bauru,SP', distanceKM: 245 },
        { origin: 'São Paulo,SP', destination: 'São José dos Campos,SP', distanceKM: 100 },
        { origin: 'São Paulo,SP', destination: 'Jundiaí,SP', distanceKM: 60 },
        { origin: 'São Paulo,SP', destination: 'Salvador,BA', distanceKM: 2420 },
        { origin: 'São Paulo,SP', destination: 'Recife,PE', distanceKM: 2770 },
        { origin: 'São Paulo,SP', destination: 'Fortaleza,CE', distanceKM: 3080 },
        { origin: 'São Paulo,SP', destination: 'Maceió,AL', distanceKM: 2550 },
        { origin: 'São Paulo,SP', destination: 'Belém,PA', distanceKM: 3250 },
        { origin: 'Rio de Janeiro,RJ', destination: 'Manaus,AM', distanceKM: 4710 },
        { origin: 'Rio de Janeiro,RJ', destination: 'Curitiba,PR', distanceKM: 700 },
        { origin: 'Belo Horizonte,MG', destination: 'Goiânia,GO', distanceKM: 780 },
        { origin: 'Belo Horizonte,MG', destination: 'Campo Grande,MS', distanceKM: 1060 },
        { origin: 'Curitiba,PR', destination: 'São Paulo,SP', distanceKM: 408 },
        { origin: 'Fortaleza,CE', destination: 'Salvador,BA', distanceKM: 1690 },
        { origin: 'Recife,PE', destination: 'Fortaleza,CE', distanceKM: 1920 },
        { origin: 'Porto Alegre,RS', destination: 'São Paulo,SP', distanceKM: 1130 }
    ],

    getAllCities: function() {
        const cities = new Set();
        this.routes.forEach((route) => {
            cities.add(route.origin);
            cities.add(route.destination);
        });
        return Array.from(cities).sort((a, b) => a.localeCompare(b, 'pt-BR'));
    },

    normalizeCity: function(city) {
        if (!city || typeof city !== 'string') {
            return '';
        }
        return city
            .trim()
            .replace(/\s*,\s*/g, ',')
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .toLowerCase();
    },

    extractCityName: function(city) {
        const normalized = this.normalizeCity(city);
        return normalized.split(',')[0] || normalized;
    },

    getDistance: function(origin, destination) {
        const originNorm = this.normalizeCity(origin);
        const destinationNorm = this.normalizeCity(destination);
        const originCity = this.extractCityName(origin);
        const destinationCity = this.extractCityName(destination);

        const matches = this.routes.filter((item) => {
            const itemOrigin = this.normalizeCity(item.origin);
            const itemDestination = this.normalizeCity(item.destination);
            const itemOriginCity = this.extractCityName(item.origin);
            const itemDestinationCity = this.extractCityName(item.destination);

            const exactMatch = (
                (itemOrigin === originNorm && itemDestination === destinationNorm) ||
                (itemOrigin === destinationNorm && itemDestination === originNorm)
            );

            const cityNameMatch = (
                (itemOriginCity === originCity && itemDestinationCity === destinationCity) ||
                (itemOriginCity === destinationCity && itemDestinationCity === originCity)
            );

            return exactMatch || cityNameMatch;
        });

        if (!matches.length) {
            return null;
        }

        return matches.reduce((best, current) => {
            return current.distanceKM < best.distanceKM ? current : best;
        }).distanceKM;
    },

    getRoutesByCities: function(origin, destination) {
        const originNorm = this.normalizeCity(origin);
        const destinationNorm = this.normalizeCity(destination);
        const originCity = this.extractCityName(origin);
        const destinationCity = this.extractCityName(destination);

        return this.routes.filter((item) => {
            const itemOrigin = this.normalizeCity(item.origin);
            const itemDestination = this.normalizeCity(item.destination);
            const itemOriginCity = this.extractCityName(item.origin);
            const itemDestinationCity = this.extractCityName(item.destination);

            return (
                (itemOrigin === originNorm && itemDestination === destinationNorm) ||
                (itemOrigin === destinationNorm && itemDestination === originNorm) ||
                (itemOriginCity === originCity && itemDestinationCity === destinationCity) ||
                (itemOriginCity === destinationCity && itemDestinationCity === originCity)
            );
        });
    },

    getLowestCarbonRoute: function(origin, destination) {
        const matches = this.getRoutesByCities(origin, destination);
        if (!matches.length) {
            return null;
        }
        return matches.reduce((best, current) => {
            return current.distanceKM < best.distanceKM ? current : best;
        });
    }
};

function getCitiesList() {
    return RouteDB.getAllCities();
}

function getDistance(origin, destination) {
    return RouteDB.getDistance(origin, destination);
}
