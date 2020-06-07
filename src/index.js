document.addEventListener('DOMContentLoaded',function(){

const url = "http://localhost:3000/pups"
function fetcher(url,functionToRun){
    fetch(url)
    .then(response => response.json())
    .then(json => functionToRun(json));
}

function createDogSpan(dogObj){
    const dogDiv = document.querySelector('#dog-bar')
    const dogInfoDiv = document.querySelector('#dog-info')
    dogObj.forEach(e => {
        let dSpan = document.createElement('span');
        dSpan.textContent = e.name;
        dSpan.className = e.id;
        dSpan.id = e.isGoodDog
        dogDiv.append(dSpan)
        dSpan.addEventListener('click', el =>{
             let dogId = el.target.className
                fetch(`${url}/${dogId}`)
                .then(response => response.json())
                .then(json => dogHTML(json));          
                }
        );
        });
}

fetcher(url,createDogSpan);

//listen for pup span click
//get dogs info to show up in div

function dogHTML(dogObj){
        const dogInfoDiv = document.querySelector('#dog-info')
        dogInfoDiv.className = dogObj.id
        dogInfoDiv.innerHTML = `
        <img src=${dogObj.image}>
        <h2>${dogObj.name}</h2>
        <button class="dog-button"> ${dogObj.isGoodDog ? 'Good Dog!' : 'Bad Dog!'} </button>`       
}

//grab button element
//listen for button click 
//if good dog, change to bad, and vice versa
//update in database via patch request to /pups/:id


document.addEventListener('click',e=>{
    // let spanId = document.queryGetElements('span')
    // console.log(spanId)
    let target = e.target.className;
    let goodOrBad = e.target.innerText;
    let dogId = e.target.parentNode.className
if (target === "dog-button"){
    if(goodOrBad === "Bad Dog!"){
        e.target.innerHTML = "Good Dog!";
        fetch(`${url}/${dogId}`,{
            method: "PATCH",
            headers: {
                "Content-Type":"application/json", 
                "Accept": "application/json"
            },
            body: JSON.stringify({isGoodDog:true})
        });
        }
  if (goodOrBad === "Good Dog!"){
      e.target.innerHTML = "Bad Dog!";
      
      fetch(`${url}/${dogId}`,{
        method: "PATCH",
        headers: {
            "Content-Type":"application/json", 
            "Accept": "application/json"
        },
        body: JSON.stringify({isGoodDog:false})
    });

}
}
});

//grab filter button
//listen for a click
//if filter is "off", show all dogs.
//if filter is on, show only good dogs. 

const filterButton = document.getElementById("good-dog-filter");

filterButton.addEventListener('click', () => {
if (filterButton.innerText === "Filter good dogs: OFF"){
    let dogSpan = document.querySelectorAll('span')
    let dogArr = Array.from(dogSpan)
    filterButton.innerText = "Filter good dogs: ON"
    dogArr.forEach(e => {
        if (e.id === "false"){
            e.remove();
        }
    });    
}
else if (filterButton.innerText === "Filter good dogs: ON"){
    filterButton.innerText = "Filter good dogs: OFF"
    let dogSpan = document.querySelectorAll('span');
    let dogArr = Array.from(dogSpan);
    dogArr.forEach(e => {
            e.remove();
        }
    );
    fetcher(url,createDogSpan);
}

}
);



});//end of DOM CONTENT LOADED