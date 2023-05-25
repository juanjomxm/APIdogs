const KEY_API_DOGS = "live_qbkFnrPquJxk5MwtxUkS8XcHILg3lZff8vgVZOVyZkAwk8di29x3BzE0bZUatB2T"
const API_DOGS = "https://api.thedogapi.com/v1/images/search?limit=3"
const API_DOGS_FAVORITES = "https://api.thedogapi.com/v1/favourites"
const API_DOG_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}`
const spanError = document.getElementById("error")


async function viewImageDogs(){
    const res = await fetch(API_DOGS)
    const data = await res.json()

    if(res.status == 200,201){
        const imgDog1 = document.querySelector("#img-dog1")
        const imgDog2 = document.querySelector("#img-dog2")
        const imgDog3 = document.querySelector("#img-dog3")
        const btn1 = document.getElementById('btn-dog1')
        const btn2 = document.getElementById('btn-dog2')
        const btn3 = document.getElementById('btn-dog3')

        imgDog1.src = data[0].url
        imgDog2.src = data[1].url
        imgDog3.src = data[2].url

        btn1.onclick = () => selectImageFavorite(data[0].id)
        btn2.onclick = () => selectImageFavorite(data[1].id)
        btn3.onclick = () => selectImageFavorite(data[2].id)
    } else {
        spanError.innerHTML = "Hubo un error de: " + res.status
    }
}
viewImageDogs()

async function imagesOfFavorites(){
    const res = await fetch(API_DOGS_FAVORITES, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": KEY_API_DOGS
        }
    })
    const data = await res.json()
    const sectionDog = document.querySelector("#favorite-dog")
    sectionDog.innerHTML = ""

    if(res.status == 200){
        data.forEach(dogs => {
            const h2 = document.createElement('h2')
            const h2Text = document.createTextNode("Favorite Dog")
            const articuleDog = document.createElement("articule")
            const imgDog = document.createElement("img")
            const btnDog = document.createElement("button")
            const btnTextDog = document.createTextNode("delete dog of favorites")
            
            h2.appendChild(h2Text)
            sectionDog.appendChild(h2)
            imgDog.src = dogs.image.url
            imgDog.width = 300
            imgDog.height = 300
            articuleDog.appendChild(imgDog)
            articuleDog.appendChild(btnDog)
            btnDog.appendChild(btnTextDog)
            sectionDog.appendChild(articuleDog)
            btnDog.onclick = () => deleteFvaorites(dogs.id)
        }) 
    } else {
        spanError.innerHTML = "Hubo un error de: " + res.status
    }
}

async function selectImageFavorite(id){
    const res = await fetch(API_DOGS_FAVORITES, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": KEY_API_DOGS
        },
        body: JSON.stringify({
            image_id: id
        }) 
    })
    imagesOfFavorites()
}

async function deleteFvaorites(id){
    const res = await fetch(API_DOG_DELETE(id),{
        method: "DELETE",  
        headers: {
            'X-API-KEY': KEY_API_DOGS
        },
        body: JSON.stringify({
            image_id: id
        })  
    })
    imagesOfFavorites()
}