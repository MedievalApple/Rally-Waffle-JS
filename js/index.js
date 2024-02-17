if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/js/sw.js");
}
  
function startGame() {
    const username = document.getElementById("nameInput").value;
    
    if (!username == "" && !username == " " && username.length <= 3) {
        localStorage.setItem("username", username.toUpperCase());
        localStorage.setItem("uploadScores", document.getElementById("uploadCheck").checked);
        window.location.replace("rally");
    }

}

window.addEventListener("load", (event) => {
    if(localStorage.getItem("bg") == 0){
        bgNone();
        document.getElementById("none").checked = true;
    }
    else if(localStorage.getItem("bg") == 1){
        bgGrass();
        document.getElementById("grass").checked = true;
    }
    else if(localStorage.getItem("bg") == 2){
        bgCity();
        document.getElementById("city").checked = true;
    }
    else if(localStorage.getItem("bg") == 3){
        bgRainbow();
        document.getElementById("rainbow").checked = true;
    }

    if(localStorage.getItem("sync") == 1){
        document.getElementById("bgCheck").checked = true;
    }
});

function bgNone(){
    document.getElementById("dropdown-image").src = "";
    var body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = 'url(\'\')';
    localStorage.setItem("bg", 0);
}

function bgGrass(){
    document.getElementById("dropdown-image").src = "/assets/map/grass.png";
    var body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = 'url(\'/assets/map/grass.png\')';
    localStorage.setItem("bg", 1);
}

function bgCity(){
    document.getElementById("dropdown-image").src = "/assets/map/citybw.png";
    var body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = 'url(\'/assets/map/citybw.png\')';
    localStorage.setItem("bg", 2);
}

function bgRainbow(){
    document.getElementById("dropdown-image").src = "/assets/map/city.png";
    var body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = 'url(\'/assets/map/city.png\')';
    localStorage.setItem("bg", 3);
}

function bgDisable(){
    check = document.getElementById("bgCheck");
    if(check.checked){ 
        localStorage.setItem("sync", 1);
    }
    else{
        localStorage.setItem("sync", 0);
    }
}
