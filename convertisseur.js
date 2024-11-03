const API_KEY = 'b9c0204374c396a3b508de8e';  // Replace with your actual API key
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

async function obtenirTauxDeChange() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.conversion_rates;
    } catch (error) {
        console.error("Erreur lors de la récupération des taux de change :", error);
    }
}

// 3. Fonction de conversion de devise
async function convertirDevise(montant, deviseOrigine, deviseCible) {
    const tauxDeChange = await obtenirTauxDeChange();
    if (!tauxDeChange) {
        console.error("Impossible de récupérer les taux de change.");
        return;
    }
    
    const tauxOrigine = tauxDeChange[deviseOrigine];
    const tauxCible = tauxDeChange[deviseCible];
    
    if (!tauxOrigine || !tauxCible) {
        console.error("Devises non valides ou non disponibles dans les taux de change.");
        return;
    }
    
    const montantConverti = (montant / tauxOrigine) * tauxCible;
    return montantConverti;
}

// 4. Fonction pour afficher le résultat sur la page
async function convertir() {
    let montant = parseFloat(document.getElementById('amount').value);
    let deviseOrigine = document.getElementById('fromCurrency').value;
    let deviseCible = document.getElementById('toCurrency').value;

    if (isNaN(montant) || montant <= 0) {
        document.getElementById('result').innerText = "Veuillez entrer un montant valide.";
        return;
    }

    const prixConverti = await convertirDevise(montant, deviseOrigine, deviseCible);
    if (prixConverti !== undefined) {
        document.getElementById('result').innerText = `Le prix converti est : ${prixConverti.toFixed(2)} ${deviseCible}`;
    } else {
        document.getElementById('result').innerText = "Erreur lors de la conversion.";
    }
    
}
