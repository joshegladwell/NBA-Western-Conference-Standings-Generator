//declare global variables
var asTeamNames = [];
var aiTeamWins = [];
var aiTeamLosses = [];
var afTeamWinPct = [];
var aiTeamRanking = [];

function newStandings() {
    //declare local variables
    var sHoldNames;
    var iHoldWins;
    var iHoldLosses;
    var fHoldWinPct;
    var iCount1;
    var iCount2;
    var iLength = asTeamNames.length;
    var sResult = "";

    //bubble sort by win pct
    for (iCount1 = 0; iCount1 < iLength - 1; iCount1++) {
        for (iCount2 = iCount1 + 1; iCount2 < iLength; iCount2++) {
            if (afTeamWinPct[iCount1] < afTeamWinPct[iCount2]) {
                sHoldNames = asTeamNames[iCount2];
                iHoldWins = aiTeamWins[iCount2];
                iHoldLosses = aiTeamLosses[iCount2];
                fHoldWinPct = afTeamWinPct[iCount2];

                asTeamNames[iCount2] = asTeamNames[iCount1];
                aiTeamWins[iCount2] = aiTeamWins[iCount1];
                aiTeamLosses[iCount2] = aiTeamLosses[iCount1];
                afTeamWinPct[iCount2] = afTeamWinPct[iCount1];

                asTeamNames[iCount1] = sHoldNames;
                aiTeamWins[iCount1] = iHoldWins;
                aiTeamLosses[iCount1] = iHoldLosses;
                afTeamWinPct[iCount1] = fHoldWinPct;
            }
        }
    }

    //determine rankings
    for (iCount1 = 0; iCount1 < iLength; iCount1++) {
        aiTeamRanking[iCount1] = iCount1 + 1;
    }

    //construct standings into string
    for (iCount1 = 0; iCount1 < iLength; iCount1++) {
        if (iCount1 === iLength - 1) {
            sResult = sResult + aiTeamRanking[iCount1] + "   " + asTeamNames[iCount1] + " " + aiTeamWins[iCount1] + "-" + aiTeamLosses[iCount1]
                + " (" + afTeamWinPct[iCount1] + ") ";
        }
        else if (iCount1 === 7) {
            sResult = sResult + aiTeamRanking[iCount1] + "   " + asTeamNames[iCount1] + " " + aiTeamWins[iCount1] + "-" + aiTeamLosses[iCount1]
                + " (" + afTeamWinPct[iCount1] + ") " + "<br>" + "<br>";
        }
        else {
            sResult = sResult + aiTeamRanking[iCount1] + "   " + asTeamNames[iCount1] + " " + aiTeamWins[iCount1] + "-" + aiTeamLosses[iCount1]
                + " (" + afTeamWinPct[iCount1] + ") " + "<br>";
        }
    }

    //print standings
    document.getElementById("output").innerHTML = sResult;
}

class Team {
    name;
    winCount;
    lossCount;
    winPct;

    constructor(sTeamName, iWinCount, iLossCount, fWinPct) {
        this.name = sTeamName;
        this.winCount = iWinCount;
        this.lossCount = iLossCount;
        this.winPct = fWinPct;
    }
}


function dataRetriever() {
    var sTeamName = document.getElementById("teamName").value;
    var iTeamWins = parseInt(document.getElementById("teamWins").value);
    var iTeamLosses = parseInt(document.getElementById("teamLosses").value);
    var fTeamWinPct = (iTeamWins / (iTeamWins + iTeamLosses)).toFixed(3);
    var oTeam = new Team(sTeamName, iTeamWins, iTeamLosses, fTeamWinPct);

    if (sTeamName == "" || isNaN(iTeamWins) || isNaN(iTeamLosses)) {
        alert("Error")
    }
    else {
        asTeamNames.push(oTeam.name);
        aiTeamWins.push(oTeam.winCount);
        aiTeamLosses.push(oTeam.lossCount);
        afTeamWinPct.push(oTeam.winPct);

        document.getElementById("teamName").remove(document.getElementById("teamName").selectedIndex);

        document.getElementById("teamName").value = "";
        document.getElementById("teamWins").value = "";
        document.getElementById("teamLosses").value = "";
    }
}