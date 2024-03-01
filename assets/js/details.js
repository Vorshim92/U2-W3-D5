const modDiv = document.getElementById("mod-Prod");
const url = "https://striveschool-api.herokuapp.com/api/product/";

async function detailFn(productID) {
  try {
    const response = await fetch(url + productID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYmRhMTRjNTllYzAwMTk5MGQ4NjkiLCJpYXQiOjE3MDkyOTI5NjEsImV4cCI6MTcxMDUwMjU2MX0.RXwa7LNnDwhKZ0kQOJLwKWECR2IfV5LEMVw-mIUg3AA`,
      },
    });

    if (!response.ok) {
      throw new Error("Errore nella richiesta API");
    }
    const product = await response.json();
    createCard(product);
    return product;
  } catch (error) {
    console.error("Errore durante il recupero dei libri:", error);
  }
}
function createCard(product) {
  const container = document.querySelector("#rowId");
  container.innerHTML = "";
  const cardHtml = `<div class="card mb-4 shadow-sm" style="width: 1000px;">
      <img src="${product.imageUrl}" class="bd-placeholder-img card-img-top cursor-pointer">
      <div class="card-body">
        <h5 class="card-title cursor-pointer">${product.name}</h5>
        
        <p class="card-text">${product.brand}</p>
        <p class="card-text">${product.description}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button type="button" class="btn btn-sm btn-outline-secondary" id="mod">Modifica</button>
            <button id="deleteBtn" type="button" class="btn btn-danger" style="line-height: 0">
                  <i class="bi bi-trash3-fill"></i>
          </div>
        </div>
      </div>
    </div>`;
  const cardElement = document.createElement("div");
  cardElement.classList.add("col-12>");
  cardElement.innerHTML = cardHtml;
  container.appendChild(cardElement);

  const deleteBtn = document.getElementById("deleteBtn");
  deleteBtn.addEventListener("click", (e) => {
    handleDELETE(e);
  });
  const modBtn = cardElement.querySelector("#mod");
  modBtn.addEventListener("click", function (e) {
    window.location.href = `./backoffice.html?id=${product._id}`;
  });
}

window.onload = () => {
  if ((productID = new URLSearchParams(window.location.search).get("id"))) {
    detailFn(productID);
  }
};
