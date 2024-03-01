const form = document.getElementById("form");
const url = "https://striveschool-api.herokuapp.com/api/product/";

async function postProduct(product) {
  console.log(product);
  console.log(url);

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

async function handleQuery(e) {
  e.preventDefault();
  const product = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("urlImage").value,
    price: document.getElementById("price").value,
  };
  try {
    await postProduct(product);
  } catch (error) {
    console.error("Errore durante il recupero degli album:", error);
  }
}

window.onload = () => {
  form.addEventListener("submit", (e) => {
    handleQuery(e);
  });
};
