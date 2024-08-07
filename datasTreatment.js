// import { data } from './readDatasFile.js';
class Category {
    constructor(row) {
        this.name = row["Nom"];
        this.nbPlayer = row["Nb joueurs"];
        this.duration = row["Duree"];
        let allPlayers = Object.keys(row).filter(k=>"Nom"!== k && "Nb joueurs"!== k && "Duree"!== k);
        this.players = allPlayers.filter(p=>row[p]==1);
    }
}

function generateCategories(){
    return data.map(row=>new Category(row));   
}

function generateShow() {
    document.getElementById('output').textContent = JSON.stringify(generateCategories());
}