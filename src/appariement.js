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

const scoreTable = [];

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

// Save armies config, switch to score
document.getElementById('army_entry').onsubmit = (function (e) {
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

// Save score config, switch to job itself
document.getElementById('score_list').onsubmit = (function (e) {
    e.preventDefault();
    document.getElementById('loading_text_720').hidden = false;

    let i = 0;
    while (i < 6) {
        let j = 0;
        while (j < 6) {
            friendlyArmies.armyList[i].scoreTable[j] = document.getElementById(`army${i}_score${j}`).value;
            opponentArmies.armyList[j].scoreTable[i] = document.getElementById(`army${i}_score${j}`).value;
            j++;
        }
        i++;
    }

    let t1f = -1;
    while (++t1f < 6) {
        // On pose l'armée t1f sur la table.  
        let t1o = -1;
        while (++t1o < 6) {
            // L'adversaire pose l'armée t1o face cachée
            let t2f1 = -1;
            while (++t2f1 < 6) {
                if (t2f1 == t1f) continue; // Armée déjà jouée
                let t2f2 = -1;
                while (++t2f2 < 6) {
                    if (t2f2 == t2f1 || t2f2 == t1f) continue; // Armée déjà jouée
                    // On a joué contre t1o les armées t2f1 et t2f2.
                    let t2o1 = -1;
                    while (++t2o1 < 6) {
                        if (t2o1 == t1o) continue;
                        let t2o2 = -1;
                        while (++t2o2 < 6) {
                            if (t2o2 == t1o || t2o2 == t2o1) continue;
                            let t3f_helper = -1;
                            let t3f, t2f, t3o, t2o;
                            while (++t3f_helper < 2) {
                                if (t3f_helper = 0) {
                                    t3f = t2f2;
                                    t2f = t2f1;
                                } else {
                                    t3f = t2f1;
                                    t2f = t2f2;
                                }
                                let t3o_helper = -1;
                                while (++t3o_helper < 2) {
                                    if (t3o_helper = 0) {
                                        t3o = t2o2;
                                        t2o = t2o1;
                                    } else {
                                        t3o = t2o1;
                                        t2o = t2o2;
                                    }
                                    let totalScore = friendlyArmies.armyList[t1f].scoreTable[t2o];
                                    totalScore += friendlyArmies.armyList[t2f].scoreTable[t1o];
                                    totalScore += friendlyArmies.armyList[t3f].scoreTable[t3o];
                                    scoreTable.push([`Match 1 : ${t1f} VS ${t2o}; Match 2 : ${t2f} VS ${t1o}; Match 3 : ${t3f} VS ${t3o}`, totalScore]);

                                    // L'adversaire va jouer les armées t2o1 et t2o2 face cachée
                                    // On va en choisir une, qu'on va nommer t2o. Il va choisir une des notres aussi, nommée t2f.
                                    // La non choisie sera t3o / t3f
                                    // Matchs finaux de ce tour = t1o VS t2f, t1f VS t2o, t3f VS t3o.
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    console.log(scoreTable);

    document.getElementById('loading_text_720').hidden = true;
    document.getElementById('success_text').hidden = false;
});