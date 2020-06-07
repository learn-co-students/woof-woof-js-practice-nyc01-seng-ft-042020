document.addEventListener("DOMContentLoaded", () => {

    // Add Pups to Dog Bar
    const dogBar = document.querySelector("#dog-bar")
    const baseUrl = "http://localhost:3000/pups"
    let filter = false

    function renderPups(obj, filter){
        if (filter) {
        filterPups(obj)
        }
        else {
        obj.forEach(pup => renderPup(pup))
        }
    }

    function filterPups(obj){
        const goodPups = obj.filter(obj => obj.isGoodDog)
        goodPups.forEach(pup => renderPup(pup))
    }

    function renderPup(pup){
        const span = document.createElement("span")
        span.textContent = `${pup.name}`
        span.dataset.class = `span`
        span.dataset.id = `${pup.id}`
        dogBar.appendChild(span)
    }

    function fetchPups(filter) {
        fetch(baseUrl)
        .then(resp => resp.json())
        .then(json => renderPups(json, filter))
    }

    fetchPups(filter)

    //Show more info about each Pup
    const dogInfo = document.getElementById("dog-info")

    document.addEventListener("click", (e) => {
        if (e.target.dataset.class === "span") {
            fetchPupInfo(e.target)
        }
    })

    function fetchPupInfo(span) {
        fetch(baseUrl + `/${span.dataset.id}`)
        .then(resp => resp.json())
        .then(json => renderPupInfo(json))
    }

    function renderPupInfo(pup) {
        if (pup.isGoodDog) {
            let isGoodDog = "Bad Dog!"
            dogInfo.innerHTML = `
            <img src=${pup.image}>
            <h2>${pup.name}</h2>
            <button data-status ="is-good-dog" data-id = ${pup.id}>${isGoodDog}</button>
            `
        }
        else {
            isGoodDog = "Good Dog!"
            dogInfo.innerHTML = `
            <img src=${pup.image}>
            <h2>${pup.name}</h2>
            <button data-status="is-bad-dog" data-id = ${pup.id}>${isGoodDog}</button>
            `
        }
    }

    //Toggle Good Dog
    document.addEventListener("click", (e) => {
        const dogId = e.target.dataset.id

        if (e.target.dataset.status === "is-good-dog") {
            toggleDog("good", dogId, e.target)
        }
        else if (e.target.dataset.status === "is-bad-dog") {
            toggleDog("bad", dogId, e.target)
        }
    })

    function toggleDog(status, dogId, button){
        if (status === "good") {
            const configObj = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({isGoodDog: false})
            }

            fetch(baseUrl + `/${dogId}`, configObj)
            .catch(error => window.alert(error.message))

            button.dataset.status = "is-bad-dog"
            button.textContent = "Good Dog!"

        }
        else if (status === "bad") {
            const configObj = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({isGoodDog: true})
            }

            fetch(baseUrl + `/${dogId}`, configObj)
            .catch(error => window.alert(error.message))

            button.dataset.status = "is-good-dog"
            button.textContent = "Bad Dog!"
        }
    }

    //Filter Good Dogs
    const filterButton = document.getElementById("good-dog-filter")
    filterButton.dataset.status = "off"

    document.addEventListener("click", (e) => {
        if (e.target === filterButton) {
            toggleFilterButton()
        }
    })

    function toggleFilterButton(){
        //turn off
        if (filterButton.dataset.status === "on") {
            filterButton.innerText = "Filter good dogs: OFF"
            filter = false
            removeDogs()
            fetchPups(filter)
            filterButton.dataset.status = "off"
        }
        //turn on
        else {
            filterButton.innerText = "Filter good dogs: ON!!!" 
            filter = true
            removeDogs()
            fetchPups(filter)
            filterButton.dataset.status = "on"
        }
    }

    function removeDogs() {
        dogBar.innerHTML = ``
        dogInfo.innerHTML = ``
    }

})