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
    .then(json => handleToys(json))
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

