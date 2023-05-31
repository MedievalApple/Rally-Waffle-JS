function startGame() {
    const username = document.getElementById("nameInput").value;
    console.log(username.length);
    if(!username == "" && !username == " " && username.length <= 3){
        localStorage.setItem("username", username);
        localStorage.setItem("uploadScores", document.getElementById("uploadCheck").checked);
        window.location.replace("rally.html");
    }
}