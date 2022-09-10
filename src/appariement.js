class Army {
    name = '';
    scoreTable = [0, 0, 0, 0, 0, 0];
    id = 0;
    avgScore = 0;

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

const scoreTable = [];
let bestScore = ['', 0];
let averageScore = 0;
let averageScore_t1 = [0, 0, 0, 0, 0, 0];

function dataToString(data) {
    let a = friendlyArmies.armyList[data[0]].name + " VS ";
    a += opponentArmies.armyList[data[1]].name + ";<br>";
    a += friendlyArmies.armyList[data[3]].name + " VS ";
    a += opponentArmies.armyList[data[4]].name + ";<br>";
    a += friendlyArmies.armyList[data[6]].name + " VS ";
    a += opponentArmies.armyList[data[7]].name + ";<br>";
    a += friendlyArmies.armyList[data[9]].name + " VS ";
    a += opponentArmies.armyList[data[10]].name + ";<br>";
    a += friendlyArmies.armyList[data[12]].name + " VS ";
    a += opponentArmies.armyList[data[13]].name + ";<br>";
    a += friendlyArmies.armyList[data[15]].name + " VS ";
    a += opponentArmies.armyList[data[16]].name + ";<br>";
    return a;
}

function initArmies() {
    // Build the two armies object
    let i = -1;
    while (++i < 6) {
        friendlyArmies.armyList[i].name = document.getElementById(`friend${i}`).value;
        opponentArmies.armyList[i].name = document.getElementById(`oppone${i}`).value;
        document.getElementById(`t1_a${i}`).innerHTML = document.getElementById(`friend${i}`).value;
        document.getElementById(`t1_o${i}`).innerHTML = document.getElementById(`oppone${i}`).value;
    }
}

// Save armies config, switch to score
document.getElementById('army_entry').onsubmit = (function (e) {
    e.preventDefault();

    initArmies();

    // We hide previous form
    document.getElementById('army_entry').hidden = true;
    document.getElementById('help-message').hidden = true;

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

// Save score config, switch to job itself
document.getElementById('score_list').onsubmit = (async function (e) {
    e.preventDefault();
    document.getElementById('loading_text_720').hidden = false;
    document.getElementById('score_list').hidden = true;
    await new Promise(r => setTimeout(r, 100));

    let i = 0;
    while (i < 6) {
        let j = 0;
        while (j < 6) {
            friendlyArmies.armyList[i].scoreTable[j] = parseInt(document.getElementById(`army${i}_score${j}`).value);
            friendlyArmies.armyList[i].avgScore += friendlyArmies.armyList[i].scoreTable[j];
            opponentArmies.armyList[j].avgScore += 20 - friendlyArmies.armyList[i].scoreTable[j];
            j++;
        }
        i++;
    }
    i = 0
    while (i < 6) {
        friendlyArmies.armyList[i].avgScore = friendlyArmies.armyList[i].avgScore / 6;
        opponentArmies.armyList[i].avgScore = opponentArmies.armyList[i].avgScore / 6;
        i++;
    } 
    console.log(friendlyArmies);
    console.log(opponentArmies);

    return;


});

document.getElementById('turn1').onsubmit = (async function (e) {
    e.preventDefault();
});
