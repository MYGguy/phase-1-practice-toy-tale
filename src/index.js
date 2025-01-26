let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(json => handleToys(json));

  document.querySelector('.add-toy-form').addEventListener('submit', e => fetchNewToy(e));
});

function handleToys(data) {
  data.forEach(element => {
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card">
      <h2>${element.name}</h2>
      <img src="${element.image}" class="toy-avatar"/>
      <p>${element.likes} likes</p>
      <button class="like-btn" id="${element.id}" onclick="updateLikes(event)">Like ❤️</button>
    </div>`;
    document.querySelector('#toy-collection').appendChild(div)
  })
}

function fetchNewToy(e) {
  e.preventDefault();

  const name = e.target.name.value;
  const image = e.target.image.value;


  const postConfigObject = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'name': name,
      'image': image,
      'likes': '0',
    })
  };

  fetch('http://localhost:3000/toys', postConfigObject)
    .then(res => res.json())
    .then(json => handleToys([json]))

}

function updateLikes(event) {
  event.preventDefault();

  const likes = parseInt(event.target.previousElementSibling.textContent);

  patchConfigObject = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'likes': likes + 1,
    })
  }

  fetch(`http://localhost:3000/toys/${event.target.id}`, patchConfigObject)
    .then(res => res.json())
    .then(updatedLikes => event.target.previousElementSibling.textContent = `${updatedLikes.likes} likes`)
}





