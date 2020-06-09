/* CLICK ON DOGS IN THE DOG BAR TO SEE MORE INFO ABOUT THE GOOD PUPPER;
    * find dog-bar div
    * add span with dog's name

MORE INFO INCLUDES A DOG PIC, A DOG NAME, AND A DOG BUTTON THAT INDICATES WHETHER IT IS A GOOD DOG OR A BAD DOG;
    * click on span to get dog info
    * img
    * *h2
    * button for good dog/bad dog
CLICK ON GOOD DOG/BAD DOG BUTTON IN ORDER TO TOGGLE PUP GOODNESS;
    * text changes from good to bad or bad to good
    * database should be updated to show new isGoodDog value 

CLICK ON "FILTER GOOD DOGS" BUTTON IN ORDER TO JUST SEE GOOD DOGS OR SEE ALL DOGS IN DOG BAR.
    * text should change from off to on and vice versa
    * on should noly show good dogs and off should show all dogs 
*/ 

document.addEventListener('DOMContentLoaded', function(e){
    const baseUrl = "http://localhost:3000/pups"
    const dogInfoDiv = document.querySelector('#dog-info')
    
    // fetch dog info 
    const fetchDogs = () => {
        fetch(baseUrl)
        .then(response => response.json())
        .then(dogs => { 
            renderDogs(dogs)
        })
    }
    
    const renderDogs = dogs => {
        dogs.forEach(dog => {
            renderDog(dog)
        })
    }
    
    const renderDog = dog => {
        const dogBarDiv = document.querySelector('#dog-bar')
        const dogSpan = document.createElement('span')
        dogSpan.dataset.id = dog.id
        dogSpan.className = 'card'
        dogSpan.innerHTML = `
        ${dog.name}
        `
        dogBarDiv.appendChild(dogSpan)
        dogSpan.addEventListener('click', function(e){
            const dogId = e.target.dataset.id
            fetch(`${baseUrl}/${dogId}`)
            .then(resp => resp.json())
            .then(dog => showDogInfo(dog))
        })
    }
   
    const showDogInfo = dog => {
        dogInfoDiv.innerHTML = `
        <img src=${dog.image}>
        <h2>${dog.name}</h2>
        <button id= ${dog.id}>${dog.isGoodDog? "Good Dog!" : "Bad Dog!"}</button>
        `
    }
    
    document.addEventListener('click', function(e){
        if(e.target.innerText === "Good Dog!"){
            const button = e.target
            const id = button.id
            fetch(`${baseUrl}/${id}`, {
                method: "PATCH", 
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify({
                    isGoodDog: false
                })
            })
            e.target.innerText = 'Bad Dog!'
        } else if(e.target.innerText === "Bad Dog!"){
            const button = e.target
            const id = button.id
            fetch(`${baseUrl}/${id}`, {
                method: "PATCH", 
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify({
                    isGoodDog: true
                })
            })
            e.target.innerText = 'Good Dog!'
        }
    })
    
    fetchDogs()
});