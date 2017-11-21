---
---

export function HttpClient(aUrl, aCallback) {
    var anHttpRequest = new XMLHttpRequest();
    anHttpRequest.onreadystatechange = function () {
        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
            aCallback(anHttpRequest.responseText);
    };

    anHttpRequest.open("GET", "https://cors-anywhere.herokuapp.com/" + aUrl, true);
    anHttpRequest.send(null);
}
