var listOfScores = [];

function refreshScores() {
    if(localStorage.getItem("scores") != null){
        listOfScores = JSON.parse(localStorage.getItem("scores"));
    }
    var existingScores = document.getElementsByClassName("scoreItem");
    for(let i = existingScores.length-1; i>=0; i--) {
        existingScores[i].remove();
    }
    for(let counter = 0; counter < listOfScores.length&&counter<20; counter++) {
        let score = document.createElement("p");
        score.innerText = (counter+1) + " | " + listOfScores[counter].name + ": " + listOfScores[counter].score;
        score.className = "scoreItem";
        document.getElementById("score").append(score);
    }
}

function addScore(playerName, Score) {
    listOfScores.push({ "name": playerName, "score": Score });
    localStorage.setItem("scores", JSON.stringify(listOfScores));
    sortScores(listOfScores);
    refreshScores();
}

function sortScores(scores) {
    scores.sort((a, b) => {
        const time1 = a.score.split(":").join('')
        const time2 = b.score.split(":").join('')
        return parseInt(time1) - parseInt(time2)
    });
}