class Category {
    constructor(row) {
        this.name = row["Nom"];
        this.nbPlayer = row["Nb joueurs"];
        this.duration = row["Duree"];
        let allPlayers = Object.keys(row).filter(k=>"Nom"!== k && "Nb joueurs"!== k && "Duree"!== k);
        this.players = allPlayers.filter(p=>row[p]==1);
    }
    toString() {
        return `• Catégorie : ${this.name} - Joueurs : ${this.players}`;  
    }
}

class Sketch {
    constructor(category, players){
        this.categoryName = category.name;
        this.players = players;
    }
    toString() {
        return `• Catégorie : ${this.categoryName} - Joueurs : ${this.players}`;  
    }
}


function generateCategories(){
    return data.map(row=>new Category(row));   
}

function selectRandomPlayers(category, forbidenPlayers){
    let candidates = category.players.filter(c=>!forbidenPlayers.includes(c));
    let shuffled = candidates.sort(()=>0.5 - Math.random());
    if(candidates.length >= category.nbPlayer){
        return shuffled.slice(0,category.nbPlayer);
    } else {
        return false;
    }
}

function countOccurrences(list) {
    const counts = {};
    for (const item of list) {
        if (counts[item]) {
            counts[item]++;
        } else {
            counts[item] = 1;
        }
    }
    return counts;
}

function nbApparitionIsInTolerance (nbPassagePourUnActeur){
let nbPassages = parseInt(document.getElementById("nbPassages").value);
let tolerance = parseInt(document.getElementById("tolerance").value);
let ecart = Math.abs(nbPassages - nbPassagePourUnActeur);
return ecart <= tolerance
}

function isOk(sketchList){
    let apparitions = sketchList.map(s=>s.players).flatMap(x=>x);
    let nbSketchs = parseInt(document.getElementById("nbSketchs").value);
    return sketchList.length == nbSketchs 
    && Object.values(countOccurrences(apparitions)).filter(nbApparition=> !(nbApparitionIsInTolerance(nbApparition))).length == 0;
}



function generateSketchList(){
    let categories = generateCategories();
    let sketchList = [];
    let essais = 0;
    while(!isOk(sketchList) && essais<500000){
        essais ++
        sketchList = [];
        let forbidenPlayers = [];
        let randomCategories = categories.sort(()=>0.5 - Math.random());
            
        for(let category of randomCategories)
        {
            nextPlayers = selectRandomPlayers(category,forbidenPlayers);
            if(nextPlayers != false){
                sketchList.push(new Sketch(category, nextPlayers));
            } else {
                break;
            }
            forbidenPlayers = sketchList[sketchList.length-1].players;
        }
    }
       if(essais<500000){
            return sketchList.map(s=>s.toString()).join("<br>") 
            + '<br>' 
            + '<br>' 
            + JSON.stringify(countOccurrences(sketchList.map(s=>s.players).flatMap(x=>x)))
            + '<br>'
            + 'généré en ' + essais + 'esssais';
            } else {
               return "Sorry, je n'ai pas réussi à traiter votre demande malgré 500 000 essais... Il se peut que cette configuration ne fonctionne pas !"
        }
}

function generateShow() {
    document.getElementById('output').innerHTML = generateSketchList();
}   

function deleteOutput(){
    document.getElementById('output').innerHTML = "";
}