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
    var candidates = category.players.filter(c=>!forbidenPlayers.includes(c));
    const shuffled = candidates.sort(()=>0.5 - Math.random());
    return shuffled.slice(0,category.nbPlayer);
}

function generateSketchList(){
    let categories = generateCategories();
    let sketchList = [];
    let forbidenPlayers = [];
    categories.forEach((category)=>{
        sketchList.push(new Sketch(category, selectRandomPlayers(category,forbidenPlayers)));
        forbidenPlayers = sketchList[sketchList.length-1].players;
    });
    return sketchList;
}

function generateShow() {
    document.getElementById('output').textContent = JSON.stringify(generateSketchList());
}