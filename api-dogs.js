const KEY_API_DOGS = "live_qbkFnrPquJxk5MwtxUkS8XcHILg3lZff8vgVZOVyZkAwk8di29x3BzE0bZUatB2T"
const API_DOGS = "https://api.thedogapi.com/v1/images/search?limit=4"
const API_DOGS_FAVORITES = "https://api.thedogapi.com/v1/favourites"
const spanError = document.getElementById("error")


async function viewImageDogs(){
    const res = await fetch(API_DOGS)
    const data = await res.json()

    if(res.status == 200,201){
        const imgDog1 = document.querySelector("#img-dog1")
        const imgDog2 = document.querySelector("#img-dog2")
        const imgDog3 = document.querySelector("#img-dog3")

        imgDog1.src = data[0].url
        imgDog2.src = data[1].url
        imgDog3.src = data[2].url
    } else {
        spanError.innerHTML = "Hubo un error de: " + res.status
    }
}

async function imagesOfFavorites(){
    const res = await fetch(API_DOGS_FAVORITES, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": KEY_API_DOGS
        }
    })
    const data = await res.json()
    const sectionDog = document.getElementById("favorite-dog")
    sectionDog.innerHTML = ""

    if(res.status == 200,201){
        data.forEach(dogs => {
            const articuleDog = document.createElement("articule")
            const imgDog = document.createElement("img")
            const btnDog = document.createElement("button")
            const btnTextDog = document.createTextNode("delete dog of favorites")
    
            imgDog.src = dogs.image.url
            imgDog.width = 400
            imgDog.height = 400
            articuleDog.appendChild(imgDog)
            articuleDog.appendChild(btnDog)
            btnDog.appendChild(btnTextDog)
            sectionCat.appendChild(articuleCat)
        })
       
    } else {
        spanError.innerHTML = "Hubo un error de: " + res.status
    }
}