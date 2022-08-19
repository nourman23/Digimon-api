
//  Constructor
function Digimon(Name, Level ,Image  ){
  this.name = Name;
  this.level = Level;
  this.image =Image;
}

let searchBtn = document.getElementById("searchBtn");



searchBtn.addEventListener("click" , CardBySearch);
function CardBySearch(){
    const input= document.getElementById("searchInp").value;
    if(input==""){
        alert("Please type digimon name to search for .");
    }
    else{
        fetch("https://digimon-api.vercel.app/api/digimon/name/" +input)
        .then((response) => response.json())
        .then((data) => {
            let newDigimon = new Digimon(data[0].name , data[0].level , data[0].img)
            console.log(newDigimon)
            makeCard(newDigimon);
        }).catch( () => alert("The name dosen't match any digimon."));

    }
   
}

let Digimons=[];

    fetch("https://digimon-api.vercel.app/api/digimon")
        .then((response) => response.json())
        .then((data) => {
        for(let i=0 ; i<20 ;i++){
            let newDigimon = new Digimon(data[i].name , data[i].level , data[i].img)
            Digimons.push(newDigimon);
        }
        Digimons.map(makeCard);
        });


// Create card 
let cardsSec = document.getElementById("cardsSec");
function makeCard(cards){
    let div = document.createElement("div");
    div.setAttribute("id" , "card")
    cardsSec.appendChild(div);
    
    let img = document.createElement("img");
    img.setAttribute("src" , cards.image);
    img.setAttribute("id" , "digmonImg");
    
    let cardName = document.createElement("p");
    cardName.setAttribute("id" , "digmonName")
    cardName.appendChild(document.createTextNode(cards.name));

    let cardLevel = document.createElement("p");
    cardLevel.setAttribute("id" , "digmonLev")
    let levT = document.createElement("span");
    levT.setAttribute("id" , "levT")
    levT.appendChild(document.createTextNode("Level : "));
    cardLevel.appendChild(levT);
    cardLevel.appendChild(document.createTextNode(cards.level));
    
 
    div.appendChild(img);
    div.appendChild(cardName);
    div.appendChild(cardLevel);
    }