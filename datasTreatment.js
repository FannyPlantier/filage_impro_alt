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
    if(candidates.length >= category.nbPlayer){
        return shuffled.slice(0,category.nbPlayer);
    } else {
        return false;
    }
}

function generateSketchList(){
    let categories = generateCategories();
    let sketchList = [];
    let forbidenPlayers = [];
    for(let category of categories)
    {
        nextPlayers = selectRandomPlayers(category,forbidenPlayers);
        if(nextPlayers != false){
            sketchList.push(new Sketch(category, nextPlayers));
        } else {
            break;
        }
        forbidenPlayers = sketchList[sketchList.length-1].players;
    }
    return sketchList;
}

function generateShow() {
    document.getElementById('output').textContent = JSON.stringify(generateSketchList());
}