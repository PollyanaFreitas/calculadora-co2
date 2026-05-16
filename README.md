# 🍃 Calculadora de Emissão de CO₂

Uma aplicação web interativa para calcular a pegada de carbono do seu trajeto e descobrir formas de contribuir para um planeta mais sustentável.

## 📋 Características

✅ **Cálculo de Emissão de CO₂** - Calcula automaticamente a emissão baseada no trajeto e modo de transporte  
✅ **Múltiplos Modos de Transporte** - Bicicleta, Carro, Ônibus e Caminhão  
✅ **Distância Automática** - Busca automática de distância entre cidades  
✅ **Modo Manual** - Permite inserir distância manualmente  
✅ **Comparação de Transportes** - Compara emissões entre diferentes modos  
✅ **Créditos de Carbono** - Sugestões de compensação  
✅ **Design Responsivo** - Interface moderna e mobile-friendly  

## 🚀 Como Usar

### 1. Abrir a Aplicação
Abra o arquivo `index.html` em seu navegador web.

### 2. Preencher o Formulário

1. **Origem**: Selecione a cidade de partida na lista de autocompletar
2. **Destino**: Selecione a cidade de chegada
3. **Distância**: A distância será preenchida automaticamente
   - Para inserir manualmente, marque o checkbox "Inserir distância manualmente"
4. **Modo de Transporte**: Escolha entre:
   - 🚴 Bicicleta
   - 🚗 Carro (padrão)
   - 🚌 Ônibus
   - 🚚 Caminhão

### 3. Calcular
Clique no botão "Calcular Emissão" para ver os resultados.

### 4. Visualizar Resultados
- **Emissão**: Quantidade de CO₂ em kg/gramas
- **Comparação**: Comparativo com outros transportes
- **Compensação**: Sugestões de compensação de carbono

## 📁 Estrutura do Projeto

```
ProjetoDio/
├── index.html              # Arquivo principal HTML
├── css/
│   └── style.css          # Estilos CSS com BEM
└── js/
    ├── routes-data.js     # Dados de rotas e cidades
    ├── config.js          # Configurações da aplicação
    ├── calculator.js      # Lógica de cálculos
    ├── ui.js              # Gerenciador de interface
    └── app.js             # Arquivo principal JavaScript
```

## 🎨 Componentes

### HTML
- Formulário com inputs e radio buttons
- Seções de resultados (hidden por padrão)
- Footer com créditos

### CSS
- Convenção BEM para nomes de classes
- Design responsivo com variáveis CSS
- Animações suaves
- Paleta de cores com verde (sustentabilidade)

### JavaScript
- `Calculator`: Classe com métodos de cálculo
- `UIManager`: Gerencia a interface e eventos
- Dados de cidades e rotas predefinidos

## 📊 Fatores de Emissão

| Transporte | Emissão (kg CO₂/km) |
|-----------|-------------------|
| Bicicleta | 0 kg              |
| Ônibus    | 0.089 kg          |
| Carro     | 0.192 kg          |
| Caminhão  | 0.256 kg          |

## 🌍 Dados de Cidades

Cidades disponíveis para seleção:
- São Paulo
- Rio de Janeiro
- Belo Horizonte
- Brasília
- Salvador
- Fortaleza
- Recife
- Manaus
- Curitiba
- Porto Alegre
- Goiânia
- Belém
- Campinas
- Guarulhos
- São Bernardo do Campo

## 🛠️ Personalização

### Adicionar Novas Cidades
Edite o array `CITIES_DATA` em `js/routes-data.js`

### Adicionar Novas Rotas
Adicione pares de cidades em `ROUTES_DATA` em `js/routes-data.js`

### Alterar Fatores de Emissão
Modifique o objeto `emissionFactors` em `js/config.js`

## 📱 Responsividade

A aplicação é totalmente responsiva:
- Desktop: Layout em coluna única
- Tablet: Grid de 2 colunas para transportes
- Mobile: Layout otimizado com controles acessíveis

## ♿ Acessibilidade

- Labels associados aos inputs
- Datalist para autocompletar
- Contraste de cores adequado
- Fonte legível e bem estruturada

## 📝 Notas

- Os dados de distância são pré-configurados entre principais cidades
- Para adicionar mais rotas, insira os dados em `js/routes-data.js`
- A aplicação roda 100% no cliente (sem backend necessário)

## 👨‍💻 Desenvolvido para Aprender

Desenvolvendo pra aprender ❤️ | Projeto GitHub Copilot

---

**Versão**: 1.0  
**Data**: Maio de 2026  
**Licença**: Livre para uso educacional
