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
let averageScorePlayed = {};

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
        document.getElementById(`t2f1_a${i}`).innerHTML = document.getElementById(`friend${i}`).value;
        document.getElementById(`t2f2_a${i}`).innerHTML = document.getElementById(`friend${i}`).value;
        document.getElementById(`t1_o${i}`).innerHTML = document.getElementById(`oppone${i}`).value;
        document.getElementById(`t2o1_a${i}`).innerHTML = document.getElementById(`oppone${i}`).value;
        document.getElementById(`t2o2_a${i}`).innerHTML = document.getElementById(`oppone${i}`).value;
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
            opponentArmies.armyList[j].avgScore += friendlyArmies.armyList[i].scoreTable[j];
            j++;
        }
        i++;
    }
    i = 0;
    let bestAverageFriend = 0;
    let bestAverageFriendScore = 0;
    let bestAverageOpnt = 0;
    let bestAverageOpntScore = 0;

    while (i < 6) {
        friendlyArmies.armyList[i].avgScore = friendlyArmies.armyList[i].avgScore / 6;
        opponentArmies.armyList[i].avgScore = opponentArmies.armyList[i].avgScore / 6;

        if (friendlyArmies.armyList[i].avgScore > bestAverageFriendScore) {
            bestAverageFriendScore = friendlyArmies.armyList[i].avgScore;
            bestAverageFriend = i;
        }
        if (friendlyArmies.armyList[i].avgScore > bestAverageOpntScore) {
            bestAverageOpntScore = friendlyArmies.armyList[i].avgScore;
            bestAverageOpnt = i;
        }
        i++;
    }

    const t1f = bestAverageFriend;
    const t1o = bestAverageOpnt;

    let t2f1 = -1;
    while (++t2f1 < 6) {
        if (t2f1 == t1f) continue; // Armée déjà jouée
        let t2f2 = t2f1;
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
                    let t2f, t2o;
                    while (++t3f_helper < 2) {
                        if (t3f_helper == 0) {
                            t2f = t2f1;
                        } else {
                            t2f = t2f2;
                        }
                        let t3o_helper = -1;
                        while (++t3o_helper < 2) {
                            if (t3o_helper == 0) {
                                t2o = t2o1;
                            } else {
                                t2o = t2o2;
                            }
                            // Matchs finaux de ce tour = t1o VS t2f, t1f VS t2o.
                            // Les armées non choisies retournent dans la pioche. Il reste 4 matchs a décider.
                            let t4f = -1;
                            while (++t4f < 6) {
                                if (t4f == t1f || t4f == t2f) continue;
                                // t4f face cachée
                                let t4o = -1;
                                while (++t4o < 6) {
                                    if (t4o == t1o || t4o == t2o) continue;
                                    // t4o face cachée
                                    let t5f1 = -1;
                                    while (++t5f1 < 6) {
                                        if (t5f1 == t1f || t5f1 == t2f || t5f1 == t4f) continue;
                                        let t5f2 = -1;
                                        while (++t5f2 < 6) {
                                            if (t5f2 == t1f || t5f2 == t2f || t5f2 == t4f || t5f2 == t5f1) continue;
                                            let t5o1 = -1;
                                            while (++t5o1 < 6) {
                                                if (t5o1 == t1o || t5o1 == t2o || t5o1 == t4o) continue;
                                                let t5o2 = -1;
                                                while (++t5o2 < 6) {
                                                    if (t5o2 == t1o || t5o2 == t2o || t5o2 == t4o || t5o2 == t5o1) continue;
                                                    let t5f_helper = -1;
                                                    let t5f, t6f, t5o, t6o;
                                                    while (++t5f_helper < 2) {
                                                        if (t5f_helper == 0) {
                                                            t6f = t5f2;
                                                            t5f = t5f1;
                                                        } else {
                                                            t6f = t5f1;
                                                            t5f = t5f2;
                                                        }
                                                        let t5o_helper = -1;
                                                        while (++t5o_helper < 2) {
                                                            if (t5o_helper == 0) {
                                                                t6o = t5o2;
                                                                t5o = t5o1;
                                                            } else {
                                                                t6o = t5o1;
                                                                t5o = t5o2;
                                                            }

                                                            let t7f = 0;
                                                            let t7o = 0;

                                                            while (t7f == t1f || t7f == t2f || t7f == t4f || t7f == t5f || t7f == t6f) t7f++;
                                                            while (t7o == t1o || t7o == t2o || t7o == t4o || t7o == t5o || t7o == t6o) t7o++;

                                                            // We finished a fight !!!
                                                            let totalScore = parseInt(friendlyArmies.armyList[t1f].scoreTable[t2o]);
                                                            totalScore += parseInt(friendlyArmies.armyList[t2f].scoreTable[t1o]);
                                                            totalScore += parseInt(friendlyArmies.armyList[t4f].scoreTable[t5o]);
                                                            totalScore += parseInt(friendlyArmies.armyList[t5f].scoreTable[t4o]);
                                                            totalScore += parseInt(friendlyArmies.armyList[t6f].scoreTable[t6o]);
                                                            totalScore += parseInt(friendlyArmies.armyList[t7f].scoreTable[t7o]);
                                                            const newVal = [`${t1f}${t2o};${t2f}${t1o};${t4f}${t5o};${t5f}${t4o};${t6f}${t6o};${t7f}${t7o}`, totalScore];
                                                            scoreTable.push(newVal);

                                                            if (bestScore[1] < totalScore) bestScore = newVal;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // Cleanup of t1 score
    let clean = 0;
    while (clean < 12) {
        document.getElementById('t1_tip').innerHTML += `L'armée ${friendlyArmies.armyList[clean / 2].name} gagne en moyenne ${friendlyArmies.armyList[clean / 2].avgScore} points.<br>`;
        clean += 2;
    }

    document.getElementById('t1_tip').innerHTML += `<br>Par conséquent, il est recommandé de jouer l'armée ${friendlyArmies.armyList[bestAverageFriend].name}<br>`

    document.getElementById('loading_text_720').hidden = true;
    document.getElementById('success_text').hidden = false;
    document.getElementById('best_matchup').hidden = false;
    document.getElementById('best_matchup').innerHTML = `Meilleurs matchs : <br>${dataToString(bestScore[0])}<br>Score total : ${bestScore[1]}`;
    document.getElementById('turn1').hidden = false;
});

document.getElementById('turn1').onsubmit = (async function (e) {
    bestScore = ['', 0];
    e.preventDefault();
    document.getElementById('turn1').hidden = true;
    document.getElementById('best_matchup').hidden = true;
    document.getElementById('success_text').hidden = true;
    document.getElementById('update_result').hidden = false;
    await new Promise(r => setTimeout(r, 100));

    const t1f = parseInt(document.getElementById('play_t1f').value);
    const t1o = parseInt(document.getElementById('play_t1o').value);

    // Impossible de choisir les armées qui ont déjà été jouées
    document.getElementById('t2f1_a' + document.getElementById('play_t1f').value).disabled = true;
    document.getElementById('t2f2_a' + document.getElementById('play_t1f').value).disabled = true;
    document.getElementById('t2o1_a' + document.getElementById('play_t1o').value).disabled = true;
    document.getElementById('t2o2_a' + document.getElementById('play_t1o').value).disabled = true;

    let t2f1 = -1;
    while (++t2f1 < 6) {
        if (t2f1 == t1f) continue; // Armée déjà jouée
        let t2f2 = t2f1;
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
                    let t2f, t2o;
                    while (++t3f_helper < 2) {
                        if (t3f_helper == 0) {
                            t2f = t2f1;
                        } else {
                            t2f = t2f2;
                        }
                        let t3o_helper = -1;
                        while (++t3o_helper < 2) {
                            if (t3o_helper == 0) {
                                t2o = t2o1;
                            } else {
                                t2o = t2o2;
                            }
                            // Matchs finaux de ce tour = t1o VS t2f, t1f VS t2o.
                            // Les armées non choisies retournent dans la pioche. Il reste 4 matchs a décider.
                            let t4f = -1;
                            while (++t4f < 6) {
                                if (t4f == t1f || t4f == t2f) continue;
                                // t4f face cachée
                                let t4o = -1;
                                while (++t4o < 6) {
                                    if (t4o == t1o || t4o == t2o) continue;
                                    // t4o face cachée
                                    let t5f1 = -1;
                                    while (++t5f1 < 6) {
                                        if (t5f1 == t1f || t5f1 == t2f || t5f1 == t4f) continue;
                                        let t5f2 = -1;
                                        while (++t5f2 < 6) {
                                            if (t5f2 == t1f || t5f2 == t2f || t5f2 == t4f || t5f2 == t5f1) continue;
                                            let t5o1 = -1;
                                            while (++t5o1 < 6) {
                                                if (t5o1 == t1o || t5o1 == t2o || t5o1 == t4o) continue;
                                                let t5o2 = -1;
                                                while (++t5o2 < 6) {
                                                    if (t5o2 == t1o || t5o2 == t2o || t5o2 == t4o || t5o2 == t5o1) continue;
                                                    let t5f_helper = -1;
                                                    let t5f, t6f, t5o, t6o;
                                                    while (++t5f_helper < 2) {
                                                        if (t5f_helper == 0) {
                                                            t6f = t5f2;
                                                            t5f = t5f1;
                                                        } else {
                                                            t6f = t5f1;
                                                            t5f = t5f2;
                                                        }
                                                        let t5o_helper = -1;
                                                        while (++t5o_helper < 2) {
                                                            if (t5o_helper == 0) {
                                                                t6o = t5o2;
                                                                t5o = t5o1;
                                                            } else {
                                                                t6o = t5o1;
                                                                t5o = t5o2;
                                                            }

                                                            let t7f = 0;
                                                            let t7o = 0;

                                                            while (t7f == t1f || t7f == t2f || t7f == t4f || t7f == t5f || t7f == t6f) t7f++;
                                                            while (t7o == t1o || t7o == t2o || t7o == t4o || t7o == t5o || t7o == t6o) t7o++;

                                                            // We finished a fight !!!
                                                            let totalScore = parseInt(friendlyArmies.armyList[t1f].scoreTable[t2o]);
                                                            totalScore += parseInt(friendlyArmies.armyList[t2f].scoreTable[t1o]);
                                                            totalScore += parseInt(friendlyArmies.armyList[t4f].scoreTable[t5o]);
                                                            totalScore += parseInt(friendlyArmies.armyList[t5f].scoreTable[t4o]);
                                                            totalScore += parseInt(friendlyArmies.armyList[t6f].scoreTable[t6o]);
                                                            totalScore += parseInt(friendlyArmies.armyList[t7f].scoreTable[t7o]);
                                                            const newVal = [`${t1f}${t2o};${t2f}${t1o};${t4f}${t5o};${t5f}${t4o};${t6f}${t6o};${t7f}${t7o}`, totalScore];
                                                            scoreTable.push(newVal);

                                                            if (!averageScorePlayed[t2f1.toString() + t2f2.toString()]) {
                                                                averageScorePlayed[t2f1.toString() + t2f2.toString()] = 0;
                                                            }
                                                            averageScorePlayed[t2f1.toString() + t2f2.toString()] += totalScore;

                                                            if (bestScore[1] < totalScore) bestScore = newVal;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    // 18432 résultats dans chaque calcul, il semble.
    // On a maintenant simulé tous les matchs. On veut choisir un duo d'armées a poser. Donc, il faut que je calcule la moyenne du score B+C (t2f1 & t2f2)

    let t2BestResult = 0;
    let t2BestPlay = "";
    for (const key in averageScorePlayed) {
        if (averageScorePlayed[key] > t2BestResult) {
            t2BestResult = averageScorePlayed[key];
            t2BestPlay = key;
        }
    }

    document.getElementById('t2_tip').innerHTML = `Il est donc recommandé de jouer les armées suivantes  : <br>- ${friendlyArmies.armyList[parseInt(t2BestPlay[0])].name}<br>- ${friendlyArmies.armyList[parseInt(t2BestPlay[1])].name}<br>`;

    // Cleanup of t1 score
    document.getElementById('success_text').hidden = false;

    document.getElementById('best_matchup').innerHTML = `Meilleurs matchs : <br>${dataToString(bestScore[0])}<br>Score total : ${bestScore[1]}`;

    document.getElementById('best_matchup').hidden = false;
    document.getElementById('update_result').hidden = true;
    document.getElementById('turn2').hidden = false;
});

document.getElementById('turn2').onsubmit = (async function (e) {
    e.preventDefault();

    const t1f = parseInt(document.getElementById('play_t1f').value);
    const t2f1 = parseInt(document.getElementById('play_t2f1').value);
    const t2f2 = parseInt(document.getElementById('play_t2f2').value);
    const t1o = parseInt(document.getElementById('play_t1o').value);
    const t2o1 = parseInt(document.getElementById('play_t2o1').value);
    const t2o2 = parseInt(document.getElementById('play_t2o2').value);

    if (t2f1 == t2f2 || t2o1 == t2o2) {
        document.getElementById('t2-error-message').hidden = false;
        return;
    }

    document.getElementById('t2-error-message').hidden = true;
    document.getElementById('turn2').hidden = true;
    document.getElementById('best_matchup').hidden = true;
    document.getElementById('success_text').hidden = true;
    document.getElementById('update_result').hidden = false;
    await new Promise(r => setTimeout(r, 100));

    bestScore = ['', 0];
    averageScorePlayed = {};

    let t3f_helper = -1;
    let t2f, t2o;
    while (++t3f_helper < 2) {
        if (t3f_helper == 0) {
            t2f = t2f1;
        } else {
            t2f = t2f2;
        }
        let t3o_helper = -1;
        while (++t3o_helper < 2) {
            if (t3o_helper == 0) {
                t2o = t2o1;
            } else {
                t2o = t2o2;
            }
            // Matchs finaux de ce tour = t1o VS t2f, t1f VS t2o.
            // Les armées non choisies retournent dans la pioche. Il reste 4 matchs a décider.
            let t4f = -1;
            while (++t4f < 6) {
                if (t4f == t1f || t4f == t2f) continue;
                // t4f face cachée
                let t4o = -1;
                while (++t4o < 6) {
                    if (t4o == t1o || t4o == t2o) continue;
                    // t4o face cachée
                    let t5f1 = -1;
                    while (++t5f1 < 6) {
                        if (t5f1 == t1f || t5f1 == t2f || t5f1 == t4f) continue;
                        let t5f2 = -1;
                        while (++t5f2 < 6) {
                            if (t5f2 == t1f || t5f2 == t2f || t5f2 == t4f || t5f2 == t5f1) continue;
                            let t5o1 = -1;
                            while (++t5o1 < 6) {
                                if (t5o1 == t1o || t5o1 == t2o || t5o1 == t4o) continue;
                                let t5o2 = -1;
                                while (++t5o2 < 6) {
                                    if (t5o2 == t1o || t5o2 == t2o || t5o2 == t4o || t5o2 == t5o1) continue;
                                    let t5f_helper = -1;
                                    let t5f, t6f, t5o, t6o;
                                    while (++t5f_helper < 2) {
                                        if (t5f_helper == 0) {
                                            t6f = t5f2;
                                            t5f = t5f1;
                                        } else {
                                            t6f = t5f1;
                                            t5f = t5f2;
                                        }
                                        let t5o_helper = -1;
                                        while (++t5o_helper < 2) {
                                            if (t5o_helper == 0) {
                                                t6o = t5o2;
                                                t5o = t5o1;
                                            } else {
                                                t6o = t5o1;
                                                t5o = t5o2;
                                            }

                                            let t7f = 0;
                                            let t7o = 0;

                                            while (t7f == t1f || t7f == t2f || t7f == t4f || t7f == t5f || t7f == t6f) t7f++;
                                            while (t7o == t1o || t7o == t2o || t7o == t4o || t7o == t5o || t7o == t6o) t7o++;

                                            // We finished a fight !!!
                                            let totalScore = parseInt(friendlyArmies.armyList[t1f].scoreTable[t2o]);
                                            totalScore += parseInt(friendlyArmies.armyList[t2f].scoreTable[t1o]);
                                            totalScore += parseInt(friendlyArmies.armyList[t4f].scoreTable[t5o]);
                                            totalScore += parseInt(friendlyArmies.armyList[t5f].scoreTable[t4o]);
                                            totalScore += parseInt(friendlyArmies.armyList[t6f].scoreTable[t6o]);
                                            totalScore += parseInt(friendlyArmies.armyList[t7f].scoreTable[t7o]);
                                            const newVal = [`${t1f}${t2o};${t2f}${t1o};${t4f}${t5o};${t5f}${t4o};${t6f}${t6o};${t7f}${t7o}`, totalScore];
                                            scoreTable.push(newVal);

                                            if (!averageScorePlayed[t2f.toString()]) {
                                                averageScorePlayed[t2f.toString()] = 0;
                                            }
                                            averageScorePlayed[t2f.toString()] += totalScore;

                                            if (bestScore[1] < totalScore) bestScore = newVal;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    console.log(averageScorePlayed);
    document.getElementById('success_text').hidden = false;

    document.getElementById('best_matchup').innerHTML = `Meilleurs matchs : <br>${dataToString(bestScore[0])}<br>Score total : ${bestScore[1]}`;

    
});
