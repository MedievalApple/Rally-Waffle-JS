var Counter = 1;

function addScore(playerName, Score) {
    if (Counter <= 20) {
        let score = document.createElement("p");
        score.innerText = Counter + " | " + playerName + ": " + Score;
        score.className = "scoreItem";
        document.getElementById("score").append(score);
        Counter++;
    }
}