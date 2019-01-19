let sound = null;
let currentBtn = '';

function changeActivation(id){
    if (currentBtn != id){
        let attClass = null;
        if (currentBtn !== ''){
            let oldBtn = document.getElementById(currentBtn);
            attClass = oldBtn.getAttributeNode('class');
            attClass.value = "btn btn-success btn-sm m-1 col-3";
            oldBtn.setAttributeNode(attClass);
        }

        let curBtn = document.getElementById(id);
        attClass = curBtn.getAttributeNode('class');
        attClass.value = "btn btn-outline-success btn-sm m-1 col-3"
        curBtn.setAttributeNode(attClass);
        currentBtn = id;
    }
}

function initRadioButtons() {
    let btnsDiv = document.getElementById('stations');
    for (let i = 0; i < stations.length; i++) {
        let btn = document.createElement('button');
        let textOfBtn = document.createTextNode(stations[i].name);
        let attBtn = document.createAttribute("class");
        let attId = document.createAttribute("id");
        attBtn.value = "btn btn-success btn-sm m-1 col-3";
        attId.value = "button"+i;
        btn.setAttributeNode(attBtn);
        btn.setAttributeNode(attId);
        btn.addEventListener("click", function () {
            changeActivation(attId.value);
            playLocalMusic(stations[i].url);
        });
        btn.appendChild(textOfBtn);
        btnsDiv.appendChild(btn);
    }
    setCaptionByUrl('');
}

function playLocalMusic(url) {
    let lastUrl = '';
    if (sound) {
        sound.stop();
        lastUrl = sound._src
        sound = null;
    }
    if (lastUrl != url) {
        setCaptionByUrl(url);
        sound = new Howl({
            src: [url],
            html5: true
        });
        sound.play();
    } else {
        setCaptionByUrl('');
    }
}

function setCaptionByUrl(url) {
    let name = '';
    if (url.length === 0){
        name = 'Stoped';
    } else {
        for (let i = 0; i < stations.length; i++) {
            if (stations[i].url === url) {
                name = stations[i].name;
                break;
            }
        }
    }
    
    document.getElementById('caption').innerHTML = name;
}

document.onload = initRadioButtons();