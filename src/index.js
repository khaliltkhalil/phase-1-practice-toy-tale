let addToy = false;

getAllToys();

const form = document.querySelector("form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  console.log(e.target.name.value);
  const data = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0,
  };

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => renderToy(data));
}

function getAllToys() {
  fetch("http://localhost:3000/toys")
    .then((res) => res.json())
    .then((data) => {
      data.forEach(renderToy);
    });
}

function renderToy(toy) {
  const card = document.createElement("div");
  card.innerHTML = `<h2></h2>
  <img src="" class="toy-avatar" />
  <p></p>
  <button class="like-btn" id="">Like ❤️</button>`;
  card.className = "card";
  card.querySelector("h2").textContent = toy.name;
  card.querySelector("img").src = toy.image;
  card.querySelector("p").textContent = `${toy.likes} Likes`;
  card.querySelector("button").id = toy.id;
  card.querySelector("button").addEventListener("click", (e) => {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify({
        likes: ++toy.likes,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        card.querySelector("p").textContent = `${data.likes} Likes`;
      });
  });
  document.querySelector("#toy-collection").appendChild(card);
}

function handleLikeButton(e) {}

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
});
