class Category {
    constructor(row) {
        this.name = row["Nom"];
        this.nbPlayer = row["Nb joueurs"];
        this.duration = row["Duree"];
        let allPlayers = Object.keys(row).filter(k=>"Nom"!== k && "Nb joueurs"!== k && "Duree"!== k);
        this.players = allPlayers.filter(p=>row[p]==1);
    }
}

class Sketch {
    constructor(category, players){
        this.categoryName = category.name;
        this.players = players;
    }
}


function generateCategories(){
    return data.map(row=>new Category(row));   
}

function selectRandomPlayers(category, forbidenPlayers){
    const shuffled = category.players.sort(()=>0.5 - Math.random());
    return shuffled.slice(0,category.nbPlayer);
}

function generateSketch(){
    let categories = generateCategories();
    return new Sketch(categories[0], selectRandomPlayers(categories[0],[]));

}



function generateShow() {
    document.getElementById('output').textContent = JSON.stringify(generateSketch());
}