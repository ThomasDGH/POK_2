const items = document.querySelectorAll('.slider');
const nbSlide = items.length;
const suivant = document.querySelector('.right');
const precedent = document.querySelector('.left');
let count = 0;

function slideSuivante(){
    items[count].classList.remove('active');

    if(count < nbSlide - 1){
        count++;
    } else {
        count = 0;
    }

    items[count].classList.add('active')
    console.log(count);
    
}

if (document.querySelector("body").classList.contains("dev") || document.querySelector("body").classList.contains("data")){ 
    suivant.addEventListener('click', slideSuivante)
}


function slidePrecedente(){
    items[count].classList.remove('active');

    if(count > 0){
        count--;
    } else {
        count = nbSlide - 1;
    }

    items[count].classList.add('active')
    // console.log(count);
    
}

if (document.querySelector("body").classList.contains("dev") || document.querySelector("body").classList.contains("data")){
    precedent.addEventListener('click', slidePrecedente)
}

function keyPress(e){
    console.log(e);
    
    if(e.keyCode === 37){
        slidePrecedente();
    } else if(e.keyCode === 39){
        slideSuivante();
    }
}

document.addEventListener('keydown', keyPress);

const rq_data = document.getElementsByClassName('rq_data')[0];
const rq_dev = document.getElementsByClassName('rq_dev')[0];

function createDivs(data){

    data.forEach(item => {

        const newDiv= document.createElement('div');
        newDiv.classList.add("proposition")

        if (item.type_projet=== "data"){

            newDiv.innerHTML = 'Le sujet DATA/IA suivant : ' + `"${item.titre}"` + ", m'a été proposé par " + item.prénom + " " + item.nom + ".";

            rq_data.appendChild(newDiv);
        }

        else{

            newDiv.innerHTML = 'Le sujet DEV suivant : ' + `"${item.titre}"` + ", m'a été proposé par " + item.prénom + " " + item.nom + ".";

            rq_dev.appendChild(newDiv);
        }
        
    });

}


if (document.querySelector("body").classList.contains("request")){
    fetch('http://localhost:3000/api/requests')
        .then(response => response.json())
        .then(data => {
            createDivs(data);
        })
        .catch(error => {
        console.error('Error:', error);
    });
}



function getData(form) {
    var formData = new FormData(form);
  
    for (var pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
  
    return Object.fromEntries(formData);
  }



function postForm(form){
    fetch("http://localhost:3000/api/requests", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(form)
    }).then(res => {location.reload()})
}

document.getElementById("myForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const data = getData(e.target);
    postForm(data);
    // location.reload();
  });
