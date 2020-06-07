document.addEventListener("DOMContentLoaded", () => {

    // Add Pups to Dog Bar
    const dogBar = document.querySelector("#dog-bar")

    function renderPups(obj){
        obj.forEach(pup => renderPup(pup))
    }

    function renderPup(pup){
        const span = document.createElement("span")
        span.textContent = `${pup.name}`
        dogBar.appendChild(span)
    }

    function fetchPups() {
        fetch("http://localhost:3000/pups")
        .then(resp => resp.json())
        .then(json => renderPups(json))
    }

    fetchPups()

    //Show more info about each Pup

    const spans = document.getElementsByTagName("span")
    const dogInfo = document.getElementById("dog-info")

    function addEventListenerToSpan() {
        let x = 0
        while (spans[x]) {
            console.log("spans!")
            spans[x].addEventListener("click", showDogInfo(spans[x]))
            x++
        }
    }

    function showDogInfo(doggo) {
        console.log(doggo)
    }

    addEventListenerToSpan()

    console.log(spans)

})