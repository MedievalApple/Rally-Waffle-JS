window.addEventListener("load", (event) => {
    if(localStorage.getItem("sync") == 1){
        if(localStorage.getItem("bg") == 0){
            bgNone();
        }
        else if(localStorage.getItem("bg") == 1){
            bgGrass();
        }
        else if(localStorage.getItem("bg") == 2){
            bgCity();
        }
        else if(localStorage.getItem("bg") == 3){
            bgRainbow();
        }
    }
});

function bgNone(){
    var body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = 'url(\'\')';
}

function bgGrass(){
    var body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = 'url(\'/assets/map/grass.png\')';
}

function bgCity(){
    var body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = 'url(\'/assets/map/citybw.png\')';
}

function bgRainbow(){
    var body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = 'url(\'/assets/map/city.png\')';
}