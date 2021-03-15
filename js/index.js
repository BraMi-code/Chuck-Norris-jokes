var url = "https://api.chucknorris.io/jokes/random";

var divElement = document.getElementById('ctgContainer');

var randomBtn = document.getElementById('random');
randomBtn.addEventListener('click', randomJoke);

var xhr = new XMLHttpRequest();
xhr.onload = function(cat) {
    if (this.readyState == 4 && this.status == 200) {
      var responseCat = JSON.parse(this.responseText);
      console.log(responseCat.length);
      responseCat.forEach(cat => {
        console.log(cat);
        var btn = document.createElement("BUTTON");
        btn.innerHTML = cat;
        divElement.appendChild(btn);
        // btn.value = cat;
        btn.addEventListener('click', diffCat)
      });
    }
};
xhr.open("GET", "https://api.chucknorris.io/jokes/categories", true);
xhr.send();   

function diffCat() {
    console.log(this.innerText);
    var xhttpCat = new XMLHttpRequest();
    xhttpCat.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          var responseCatObject = JSON.parse(this.responseText);
          document.getElementById('jokeCat').innerHTML = responseCatObject.value;
        }
    };
    xhttpCat.open('GET', "https://api.chucknorris.io/jokes/random?category=" + this.innerText , true);
    xhttpCat.send();
}

function randomJoke() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var responseObject = JSON.parse(this.responseText);
            document.getElementById('randomJoke').innerHTML = responseObject.value;
        }
    };
    xhttp.open('GET', url, true);
    xhttp.send();
}

   /* console.log("Broj kategorija: " + responseCat.length);
    unList = "<ul>";
    responseCat.forEach(function(categ) {
    unList += '<li>' + categ + '</li>';
    });
    unList += '</ul>';
    document.getElementById('catContainer').innerHTML = unList;
    console.log(unList);
    }
};*/
//alert(`Loaded: ${xhttpCtg.response}` );
