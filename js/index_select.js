var randomBtn = document.getElementById('random');
randomBtn.addEventListener('click', showRandomJoke);

var url = "https://api.chucknorris.io/jokes/random";
var urlCategories = "https://api.chucknorris.io/jokes/categories";

var unList;
var xhttpCtg = new XMLHttpRequest();
xhttpCtg.onload = function() {
    if (this.readyState == 4 && this.status == 200) {
        var responseCat = JSON.parse(this.responseText);
        console.log("Broj kategorija: " + responseCat.length);
        responseCat.forEach(categ => {
            unList += '<option>' + categ + '</option>';
        });
        var catContainer = document.getElementById('ctgContainer');
        catContainer.innerHTML = unList;
        catContainer.addEventListener('change', function () {
            console.log(this.value);
            showRandomJoke(this.value);
        });
        console.log(unList);
        }
};
         
    xhttpCtg.open("GET", urlCategories, true);
    xhttpCtg.send(); 

function showRandomJoke(category) {
    var apiURL = "https://api.chucknorris.io/jokes/random";
    if (typeof category == "string") {
        apiURL += "?category=" + category;
    }
    console.log(apiURL);
    var xhttpCat = new XMLHttpRequest();
    xhttpCat.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var responseObject = JSON.parse(this.responseText);
              document.getElementById('randomJoke').innerHTML = responseObject.value;
            }
        };
        xhttpCat.open('GET', apiURL , true);
        xhttpCat.send();
    }