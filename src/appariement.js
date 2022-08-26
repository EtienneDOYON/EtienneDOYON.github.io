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
    army1: new Army(1),
    army2: new Army(2),
    army3: new Army(3),
    army4: new Army(4),
    army5: new Army(5),
    army6: new Army(6),
}

const opponentArmies = {
    army1: new Army(1),
    army2: new Army(2),
    army3: new Army(3),
    army4: new Army(4),
    army5: new Army(5),
    army6: new Army(6),
}

$('#army_entry').submit(function (e) {
    e.preventDefault();

    // Build the two armies object
    friendlyArmies.army1.name = document.getElementById('friend1').value;
    friendlyArmies.army2.name = document.getElementById('friend2').value;
    friendlyArmies.army3.name = document.getElementById('friend3').value;
    friendlyArmies.army4.name = document.getElementById('friend4').value;
    friendlyArmies.army5.name = document.getElementById('friend5').value;
    friendlyArmies.army6.name = document.getElementById('friend6').value;

    opponentArmies.army1.name = document.getElementById('oppone1').value;
    opponentArmies.army2.name = document.getElementById('oppone2').value;
    opponentArmies.army3.name = document.getElementById('oppone3').value;
    opponentArmies.army4.name = document.getElementById('oppone4').value;
    opponentArmies.army5.name = document.getElementById('oppone5').value;
    opponentArmies.army6.name = document.getElementById('oppone6').value;

    // Now we want user to enter new data
    location.href = 'score';
    console.log('friend = ', friendlyArmies);
    console.log('opp = ', opponentArmies);
});

