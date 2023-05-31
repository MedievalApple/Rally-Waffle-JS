function startGame() {
    const username = document.getElementById("nameInput").value;
    if(username == "" || username == " "){
        localStorage.setItem("username", username);
        window.location.replace("rally.html");
    }
}