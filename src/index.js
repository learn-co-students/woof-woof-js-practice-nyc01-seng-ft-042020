document.addEventListener('DOMContentLoaded', (e) => {

    const baseUrl = "http://localhost:3000/pups"
    const dogBar = document.querySelector('#dog-bar')
    const dogInfo = document.querySelector('#dog-info')

    function renderDogs(dogObjects){
        const allSpan = Array.from(dogBar.getElementsByTagName('span'))
        if (allSpan != null) {
            allSpan.forEach(span => span.remove())
        }
        dogObjects.forEach(dogObj => {
            const dogSpan = document.createElement('span')
            dogSpan.innerText = dogObj.name
            dogBar.append(dogSpan)
            dogSpan.addEventListener('click', function(e){
                dogInfo.innerHTML = `
                <img src=${dogObj.image}>
                <h2>${dogObj.name}</h2>
                <button id=${dogObj.id}>${dogObj.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
                `
            })
        })
    }

    document.addEventListener('click', function(e){
        if(e.target.innerText === "Good Dog!"){
            const button = e.target
            const data = { isGoodDog: false }
            const configObj = {
                method: "PATCH",
                headers: {
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
                body: JSON.stringify(data)
            }

            fetch(`${baseUrl}/${e.target.id}`, configObj)
            .then(response => response.json())
            .then(json => button.innerText = "Bad Dog!")
            .catch(error => console.log(error))
                
        } else if (e.target.innerText === "Bad Dog!"){
            const data = { isGoodDog: true }
            const button = e.target
            const configObj = {
                method: "PATCH",
                headers: {
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
                body: JSON.stringify(data)
            }

            fetch(`${baseUrl}/${e.target.id}`, configObj)
            .then(response => response.json())
            .then(json => button.innerText = "Good Dog!")
            .catch(error => console.log(error))
        } else if (e.target.id === 'good-dog-filter'){
            if (e.target.innerText === "Filter good dogs: ON") {
                    fetch(baseUrl)
                    .then(response => response.json())
                    .then(json => renderDogs(json))
                e.target.innerText = "Filter good dogs: OFF"
            } else if (e.target.innerText === "Filter good dogs: OFF"){
                    fetch(baseUrl)
                    .then(response => response.json())
                    .then(json => {
                        const filteredJson = json.filter(obj => obj.isGoodDog == true);
                        renderDogs(filteredJson)
                    })
                e.target.innerText = "Filter good dogs: ON"
            }
            
        }

    })
})