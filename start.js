function startGame() {
    const username = document.getElementById("nameInput").value;
    
    if (!username == "" && !username == " " && username.length <= 3) {
        localStorage.setItem("username", username.toUpperCase());
        localStorage.setItem("uploadScores", document.getElementById("uploadCheck").checked);
        window.location.replace("rally");
        

        
    }

}
