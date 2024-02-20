var listOfScores = [];

async function refreshScores() {
    if(localStorage.getItem("uploadScores") != null && localStorage.getItem("uploadScores") == "true"){
        await getData("https://rallywaffle.medievalapple.workers.dev/").then((data) => {
            listOfScores = data;
        });
    }
    else if (localStorage.getItem("scores") != null){
        listOfScores = JSON.parse(localStorage.getItem("scores"));
    }

    sortScores(listOfScores);

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

async function addScore(playerName, Score) {
    if(localStorage.getItem("uploadScores") != null && localStorage.getItem("uploadScores") == "true"){
        localScores = [];
        if(localStorage.getItem("scores") != null){
            localScores = JSON.parse(localStorage.getItem("scores"));   
        }
        localScores.push({ "name": playerName, "score": Score });
        localStorage.setItem("scores", JSON.stringify(localScores));
        await postData("https://rallywaffle.medievalapple.workers.dev/", [{ "name": playerName, "score": Score }]);
    }else{
        listOfScores.push({ "name": playerName, "score": Score });
        localStorage.setItem("scores", JSON.stringify(listOfScores));
    }
    refreshScores();
}

function sortScores(scores) {
    scores.sort((a, b) => {
        const time1 = a.score.split(":").join('')
        const time2 = b.score.split(":").join('')
        return parseInt(time1) - parseInt(time2)
    });
}

//Get Request
async function getData(url = "") {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

//Post Request
async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
