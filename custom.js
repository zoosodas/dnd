document.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('playerinfo');






const town = document.querySelector("#town");
const arena = document.querySelector("#arena");
const toArenaBtn = document.querySelector('#toArena')
const toTownBtn = document.querySelector("#toTown")


//MOVING BETWEEN TOWN AND ARENA (adding and removing classes)
toArenaBtn.addEventListener('click', () => {
    town.classList.remove("d-block")
    arena.classList.remove("d-none")
    town.classList.add("d-none")
    arena.classList.add("d-block")
})

toTownBtn.addEventListener('click', () => {
    town.classList.remove("d-none")
    arena.classList.remove("d-block")
    town.classList.add("d-block")
    arena.classList.add("d-none")
})

// PLAYER AND CREATURE INFO //

let playerCard = {
    name: "",
    level: 1,
    attack: 5,
    defense: 5,
    hitpoints: 10,
    exp: 0,
}

let creatures = [{
    name: "Orc",
    attack: 5,
    defense: 5,
    hp: 6,
    level: 1
}, {
    name: "Goblin",
    attack: 4,
    defense: 4,
    hp: 7,
    level: 1
}, {
    name: "Ogre",
    attack: 10,
    defense: 10,
    hp: 7,
    level: 2
}]

let creature = []

function findCreature() {
    for (let i = 0; i < creatures.length; i++) {
        if (creatures[i].level === playerCard.level) {
            creature.push(creatures[i])
        }
    }
}

findCreature()


console.log(creature)
let playerAttack = playerCard.attack;
let playerDefense = playerCard.defense;
let playerHP = playerCard.hitpoints;


let creatureName = creature[0].name;
let creatureAttack = creature[0].attack;
let creatureDefense = creature[0].defense;
let creatureHP = creature[0].hp;

function playerInfo() {
    document.querySelector('#playerInfo').innerHTML =
        `Player name:${playerCard.name}<br>
 Hit Poins: ${playerHP} <br>
 Attack Points: ${playerAttack} <br>
 Defensive Points: ${playerDefense}<br>`
}

function creatureInfo() {
    document.querySelector('#creatureInfo').innerHTML =
        `Creature:${creatureName}<br>
 Hit Poins: ${creatureHP} <br>
 Attack Points: ${creatureAttack} <br>
 Defensive Points: ${creatureDefense}<br>`
}

playerInfo()

// arena
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;


function chalangeMonster() {

    let attackCheck = playerAttack + random(1, 5)
    let defenseCheck = creatureDefense + random(1, 5)
    if (attackCheck < defenseCheck) {
        let damage = creatureAttack + random(1, 3)
        creatureHP = creatureHP - playerAttack + random(1, 3)
        document.querySelector('#PlayerAtt').innerHTML = `Player HIT ${damage}<br>`
    } else {
        document.querySelector('#PlayerAtt').innerHTML = `Player Missed <br>`
    }

    let creatureAttackCheck = creatureAttack + random(1, 5)
    let playerDefenseCheck = playerDefense + random(1, 5)
    if (creatureAttackCheck > playerDefenseCheck) {
        let damage = creatureAttack + random(1, 3)
        playerHP = playerHP - damage
        document.querySelector('#MonsterAtt').innerHTML = `Creature HIT ${damage} <br>`
    } else {
        document.querySelector('#MonsterAtt').innerHTML = `Monster Missed <br>`
    }
    if (creatureHP === 0) {
        creature.shift()
    }
    toTownBtn.disabled = true;
    creatureHP <= 0 ? toTownBtn.disabled = false : null;

    localStorage.setItem('playerinfo', JSON.stringify(playerCard))
    playerInfo()
    creatureInfo()
}

document.querySelector("#attak").addEventListener('click', chalangeMonster)


    if (savedData) {
        playerCard = JSON.parse(savedData);
        playerInfo()
    }
})