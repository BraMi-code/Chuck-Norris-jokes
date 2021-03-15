var randomBtn = document.getElementById('random');
randomBtn.addEventListener('click', showRandomJoke);
var randomJoke = document.getElementById('getAjoke');
randomJoke.addEventListener('click', getAjoke);

var url = "https://api.chucknorris.io/jokes/random";
var urlCategories = "https://api.chucknorris.io/jokes/categories";
var jokes = [];
var joke;
var unList;
var xhttpCtg = new XMLHttpRequest();
xhttpCtg.onload = function () {
    if (this.readyState == 4 && this.status == 200) {
        var responseCat = JSON.parse(this.responseText);
        console.log("Broj kategorija: " + responseCat.length);
        responseCat.forEach(function(categ) {
            unList += '<option>' + categ + '</option>';
        });
        var catContainer = document.getElementById('ctgContainer');
        catContainer.innerHTML = unList;
        catContainer.addEventListener('change', function () {
          console.log(this.value);
          showRandomJoke(this.value);
        })
        //console.log(unList);
        }
    };
 
// alert(`Loaded: ${xhttpCtg.response}` );
xhttpCtg.open("GET", urlCategories, true);
xhttpCtg.send();



function showRandomJoke (category) {
    var apiURL = "https://api.chucknorris.io/jokes/random";
    if (typeof category == "string") {
      apiURL += "?category=" + category;
    }
    console.log(apiURL);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
            var responseObject = JSON.parse(this.responseText);
            joke = responseObject.value;
            document.getElementById('randomJoke').innerHTML = joke;
            console.log("Tekst: " + joke);
            if (localStorage.getItem('jokes') === null) {
                jokes = [];
            } else {
                jokes = JSON.parse(localStorage.getItem('jokes'));
            }
            jokes.push(joke);
            localStorage.setItem('jokes', JSON.stringify(jokes));
            /*localStorage.setItem('jokes', JSON.stringify(responseObject.value));
            var retrievedObject = localStorage.getItem('jokes');
            console.log('retrievedObject: ', JSON.parse(retrievedObject));
            */
        }
    };
    xhttp.open('GET', apiURL, true);
    xhttp.send();
}

function inLocalStorage() {
    if (jokes == null) {
        alert("Local Storage is empty!");
    } else {
        document.getElementById('showList').innerHTML = " ";
        jokes = JSON.parse(localStorage.getItem('jokes'));
        var i = 0;
        jokes.forEach((joke) => {
            document.getElementById('showList').innerHTML += "<li>" + i + ": " + joke + "</li>";
            i++;
        });
    }
}
    /*for (i=0; i<jokes.length; i++) {
        var split = jokes[i].split("");
        document.getElementById('ispisi').innerHTML = "<li>" + i + ": " + split + "</li>";
    } */

    /*var ispis = "Moja sala je: " + localStorage.getItem('jokes');
    document.getElementById('ispisi').innerHTML = ispis; */

   /* var localStor = document.getElementById('localStorage');
    console.log("Local storage length: " + Object.keys(localStorage.length));

    for ( i in localStorage) {
        console.log(localStorage[i]);
    }

    for(var i=0, len=localStorage.length; i<len; i++) {
        var key = localStorage.key(i);
        var value = localStorage[key];
        console.log(key + " => " + value);
    } */


console.log(localStorage);

function getAjoke() {
    if (localStorage.getItem('jokes') !== null) {
        jokes = JSON.parse(localStorage.getItem('jokes'));
        console.log(jokes);
        var randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        document.getElementById('randomJokeLS').innerHTML = randomJoke;
    } else {
        alert("Local storage is empty!");
    }
}

/* HOW TO CHECK IF BROWSER SUPPORTS LOCAL STORAGE 
########################################
if (typeof(Storage) !== "undefined") {
    alert('ima');
    } else {
    alert('nema');
} */

/* var removeBtn = document.getElementById('removeAjoke');
removeBtn.addEventListener('click', removeAJoke);

function removeAJoke() {
    window.localStorage.removeItem('jokes');
}
*/

function clearStorage() {
    window.localStorage.clear();
    document.getElementById('showList').innerHTML = " ";
    return jokes = null;
}

localStorage.clear();