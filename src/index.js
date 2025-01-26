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
      <p></p>
      <button class="like-btn" id="${element.id}">Like ❤️</button>
    </div>`;
    document.querySelector('#toy-collection').appendChild(div)
  })
}

function fetchNewToy(e) {
  e.preventDefault();

  const name = e.target.name.value;
  const image = e.target.image.value;
  const likes = e.target.likes;


  const postConfigObject = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'name': name,
      'image': image,
      'likes': likes,
    })
  };

  fetch('http://localhost:3000/toys', postConfigObject)
    .then(res => res.json())
    .then(json => handleToys([json]))

}





