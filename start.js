function startGame() {
    const username = document.getElementById("nameInput").value;
    localStorage.setItem("username", username);
    window.location.replace("rally.html");
}