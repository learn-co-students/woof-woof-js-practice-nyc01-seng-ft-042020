const dogUrl = ' http://localhost:3000/pups'

document.addEventListener("DOMContentLoaded", function(e){
    const dogDiv = document.getElementById('dog-bar')
    const soloDog = document.getElementById('dog-info')

    fetch(dogUrl)
    .then(response => response.json())
    .then(data => data.forEach(puppy => {
        let pupSpan = document.createElement('span')
        pupSpan.className = "puppy"
        pupSpan.dataset.id = puppy.id
        pupSpan.innerHTML = `${puppy.name}`
        dogDiv.append(pupSpan)

        document.addEventListener('click', function(e){
            let id = e.target.dataset.id
              fetch(dogUrl + `/${id}`)
              .then(resp => resp.json())
              .then(dog => {
                  const dogInfo = document.getElementById('dog-info')
                  dogInfo.innerHTML = ""
                  
                  if(dog.isGoodDog === true){
                    dogInfo.innerHTML = `
                    <img src = ${dog.image}>
                    <h2>${dog.name}</h2>
                    <button>Good Dog!</button>
                    `
                  }
                  
                  if(dog.isGoodDog !== true){
                    dogInfo.innerHTML = `
                    <img src = ${dog.image}>
                    <h2>${dog.name}</h2>
                    <button>Bad Dog >:( !</button>
                    `
                  }
              })
        })

    }))
})