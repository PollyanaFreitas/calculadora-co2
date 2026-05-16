// Dados de cidades e rotas para exemplo
const CITIES_DATA = [
    'São Paulo',
    'Rio de Janeiro',
    'Belo Horizonte',
    'Brasília',
    'Salvador',
    'Fortaleza',
    'Recife',
    'Manaus',
    'Curitiba',
    'Porto Alegre',
    'Goiânia',
    'Belém',
    'Campinas',
    'Guarulhos',
    'São Bernardo do Campo'
];

// Dados de distâncias entre cidades (em km)
const ROUTES_DATA = {
    'São Paulo-Rio de Janeiro': 430,
    'São Paulo-Belo Horizonte': 586,
    'São Paulo-Brasília': 1014,
    'São Paulo-Salvador': 2161,
    'Rio de Janeiro-Belo Horizonte': 435,
    'Rio de Janeiro-Brasília': 1145,
    'Belo Horizonte-Brasília': 716,
    'Brasília-Salvador': 1656,
    'Brasília-Goiânia': 209,
    'Curitiba-São Paulo': 408,
    'Porto Alegre-Curitiba': 710,
    'Campinas-São Paulo': 100
};

// Função para buscar distância entre cidades
function getDistance(origin, destination) {
    const key1 = `${origin}-${destination}`;
    const key2 = `${destination}-${origin}`;
    
    if (ROUTES_DATA[key1]) return ROUTES_DATA[key1];
    if (ROUTES_DATA[key2]) return ROUTES_DATA[key2];
    
    return null;
}

// Função para obter lista de cidades
function getCitiesList() {
    return CITIES_DATA;
}
