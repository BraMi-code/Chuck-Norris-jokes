var selectElement = document.getElementById('ctgContainer');

var xhttp = new XMLHttpRequest();
xhttp.onload = function(cat) {
    if (this.readyState == 4 && this.status == 200) {
      var responseObject = JSON.parse(this.responseText);
      console.log(responseObject.length);
      responseObject.forEach(cat => {
        console.log(cat);
        var option = document.createElement("OPTION");
        option.id = "categories";
        console.log(option);
        option.innerHTML = cat;
        selectElement.appendChild(option);
        option.addEventListener('click', diffCat)
      });
    }
};
xhttp.open("GET", "https://api.chucknorris.io/jokes/categories", true);
xhttp.send();   

function diffCat() {
    console.log(this.innerText);
    var xhttpCat = new XMLHttpRequest();
    xhttpCat.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          var responseCatObject = JSON.parse(this.responseText);
          document.getElementById('randomJoke').innerHTML = responseCatObject.value;
        }
    };
    xhttpCat.open('GET', "https://api.chucknorris.io/jokes/random?category=" + this.innerText , true);
    xhttpCat.send();
}