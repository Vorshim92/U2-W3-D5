const formAddProduct = document.getElementById("form-Add");
const deleteBtn = document.getElementById("deleteBtn");
const resetBtn = document.getElementById("resetBtn");
const modDiv = document.getElementById("mod-Prod");
const url = "https://striveschool-api.herokuapp.com/api/product/";
async function postProduct(product) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYmRhMTRjNTllYzAwMTk5MGQ4NjkiLCJpYXQiOjE3MDkyOTI5NjEsImV4cCI6MTcxMDUwMjU2MX0.RXwa7LNnDwhKZ0kQOJLwKWECR2IfV5LEMVw-mIUg3AA
        `,
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error("Errore nella richiesta API");
    }
  } catch (error) {
    console.error("Errore durante il recupero dei libri:", error);
  }
}

async function handlePOST(e) {
  const userRequest = window.confirm("Sei sicuro di voler aggiungere l'oggetto?");
  if (userRequest === true) {
    const product = {
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      brand: document.getElementById("brand").value,
      imageUrl: document.getElementById("urlImage").value,
      price: document.getElementById("price").value,
    };
    try {
      await postProduct(product);
      window.location.href = `./index.html`;
    } catch (error) {
      console.error("Errore durante il recupero degli album:", error);
    }
  }
}

async function modFn(productID) {
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
    document.querySelector("h1").innerText = "Modifica il prodotto";
    document.getElementById("name").value = product.name;
    document.getElementById("description").value = product.description;
    document.getElementById("brand").value = product.brand;
    document.getElementById("urlImage").value = product.imageUrl;
    document.getElementById("price").value = product.price;
    return product;
  } catch (error) {
    console.error("Errore durante il recupero dei libri:", error);
  }
}
async function handlePUT(e) {
  const userRequest = window.confirm("Sei sicuro di voler modificare l'oggetto?");
  if (userRequest === true) {
    try {
      const newProduct = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        brand: document.getElementById("brand").value,
        imageUrl: document.getElementById("urlImage").value,
        price: document.getElementById("price").value,
      };
      const response = await fetch(url + productID, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYmRhMTRjNTllYzAwMTk5MGQ4NjkiLCJpYXQiOjE3MDkyOTI5NjEsImV4cCI6MTcxMDUwMjU2MX0.RXwa7LNnDwhKZ0kQOJLwKWECR2IfV5LEMVw-mIUg3AA`,
        },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        throw new Error("Errore nella richiesta API");
      }
      window.location.href = `./index.html`;
    } catch (error) {
      console.error("Errore durante il recupero del prodotto:", error);
    }
  }
}

async function handleDELETE(e) {
  const userRequest = window.confirm("Cancellare l'oggetto?");
  if (userRequest === true) {
    try {
      const response = await fetch(url + productID, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYmRhMTRjNTllYzAwMTk5MGQ4NjkiLCJpYXQiOjE3MDkyOTI5NjEsImV4cCI6MTcxMDUwMjU2MX0.RXwa7LNnDwhKZ0kQOJLwKWECR2IfV5LEMVw-mIUg3AA`,
        },
      });

      if (!response.ok) {
        throw new Error("Errore nella richiesta API");
      }
      window.location.href = `./backoffice.html`;
    } catch (error) {
      console.error("Errore durante il recupero del prodotto:", error);
    }
  }
}

window.onload = () => {
  if ((productID = new URLSearchParams(window.location.search).get("id"))) {
    modFn(productID);
    formAddProduct.addEventListener("submit", (e) => {
      e.preventDefault();
      handlePUT(e);
    });
    deleteBtn.classList.remove("d-none");
    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handleDELETE(e);
    });
  } else {
    resetBtn.classList.remove("d-none");
    resetBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const userRequest = window.confirm("Cancellare l'oggetto?");
      if (userRequest === true) {
        formAddProduct.reset();
      }
    });
    formAddProduct.addEventListener("submit", (e) => {
      e.preventDefault();
      handlePOST(e);
    });
  }
};
