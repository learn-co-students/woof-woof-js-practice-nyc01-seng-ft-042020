// add the event listener to load the page(DOM Content)
// make a fetch request to get the dogs
// add a span for each pups name to the dog bar

document.addEventListener('DOMContentLoaded', function(e){

    const baseUrl = "http://localhost:3000/pups"
    const dogBar = document.querySelector('#dog-bar')
    const dogInfo = document.querySelector('#dog-info')


        fetch(baseUrl)
        .then(resp => resp.json())
        .then(json => renderDogs(json))
    
   function renderDogs(obj){
       obj.forEach(function(obj){
           renderDog(obj)
       })
   }


    function renderDog(obj){
            const dogSpan = document.createElement('span')
            dogSpan.innerText = obj.name
            dogSpan.id = obj.id 
            dogBar.append(dogSpan)
            dogSpan.addEventListener('click', function(e){
                const dogId = e.target.id
                fetch(`${baseUrl}/${dogId}`)
                .then(resp => resp.json())
                .then(json => addDogInfo(json))
            })
            // dogInfo.remove()
        }

    // when user clicks on span, pups info will show up on the browser


    function addDogInfo(dogObj){
        // const dogInfoDiv = document.createElement('div')
        dogInfo.innerHTML = `
        <img src=${dogObj.image}>
        <h2>${dogObj.name}</h2>
        <button id="button" >${dogObj.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
        `
        console.log("test test")
        // dogInfo.append(dogInfoDiv)
    }

    


}) // end of DOMContentLoaded