const url = "https://striveschool-api.herokuapp.com/api/product/";

async function getCard() {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYmRhMTRjNTllYzAwMTk5MGQ4NjkiLCJpYXQiOjE3MDkyOTI5NjEsImV4cCI6MTcxMDUwMjU2MX0.RXwa7LNnDwhKZ0kQOJLwKWECR2IfV5LEMVw-mIUg3AA
        `,
      },
    });
    if (!response.ok) {
      throw new Error("Errore nella richiesta API");
    }
    const productList = await response.json();
    createCard(productList);
  } catch (error) {
    console.error("Errore durante il recupero dei prodotti:", error);
  }
}

function createCard(productList) {
  const container = document.querySelector("#rowId");
  container.innerHTML = "";
  productList.forEach((product) => {
    const cardHtml = `<div class="card mb-4 shadow-sm">
    <img src="${product.imageUrl}" class="bd-placeholder-img card-img-top cursor-pointer">
    <div class="card-body">
      <h5 class="card-title cursor-pointer">${product.name}</h5>
      
      <p class="card-text">${product.brand}</p>
      <p class="card-text">${product.description}</p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <button type="button" class="btn btn-sm btn-outline-secondary" id="detail">Dettagli</button>
          <button type="button" class="btn btn-sm btn-outline-secondary" id="mod">Modifica</button>
        </div>
      </div>
    </div>
  </div>`;
    const cardElement = document.createElement("div");
    cardElement.classList.add("col-md-4");
    cardElement.innerHTML = cardHtml;
    container.appendChild(cardElement);

    const detailBtn = cardElement.querySelector("#detail");
    detailBtn.addEventListener("click", function (e) {
      window.location.href = `./details.html?id=${product._id}`;
    });
    const modBtn = cardElement.querySelector("#mod");
    modBtn.addEventListener("click", function (e) {
      window.location.href = `./backoffice.html?id=${product._id}`;
    });
  });
}
window.onload = () => {
  getCard();
};
