class Army {
    name = '';
    scoreTable = [0, 0, 0, 0, 0, 0];
    id = 0;

    constructor(id, name = '') {
        this.id = id;
        this.name = name;
    }
}

const friendlyArmies = {
    armyList: [new Army(0), new Army(1), new Army(2), new Army(3), new Army(4), new Army(5)]
}

const opponentArmies = {
    armyList: [new Army(0), new Army(1), new Army(2), new Army(3), new Army(4), new Army(5)]
}

function initArmies() {
    // Build the two armies object
    friendlyArmies.armyList[0].name = document.getElementById('friend1').value;
    friendlyArmies.armyList[1].name = document.getElementById('friend2').value;
    friendlyArmies.armyList[2].name = document.getElementById('friend3').value;
    friendlyArmies.armyList[3].name = document.getElementById('friend4').value;
    friendlyArmies.armyList[4].name = document.getElementById('friend5').value;
    friendlyArmies.armyList[5].name = document.getElementById('friend6').value;

    opponentArmies.armyList[0].name = document.getElementById('oppone1').value;
    opponentArmies.armyList[1].name = document.getElementById('oppone2').value;
    opponentArmies.armyList[2].name = document.getElementById('oppone3').value;
    opponentArmies.armyList[3].name = document.getElementById('oppone4').value;
    opponentArmies.armyList[4].name = document.getElementById('oppone5').value;
    opponentArmies.armyList[5].name = document.getElementById('oppone6').value;
}

document.getElementById('army_entry').onsubmit = (function(e) {
    e.preventDefault();

    initArmies();

    // We hide previous form
    document.getElementById('army_entry').hidden = true;

    // We prepare the next one, then display it
    let i = 0;
    while (i < 6) {
        document.getElementById(`army${i}`).innerHTML = friendlyArmies.armyList[i].name;
        let j = 0;
        while (j < 6) {
            document.getElementById(`army${i}_score${j}`).placeholder = opponentArmies.armyList[j].name;
            j++;
        }
        i++;
    }
    document.getElementById('score_list').hidden = false;
});

