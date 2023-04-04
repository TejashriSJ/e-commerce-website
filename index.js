const productsUrl = "https://fakestoreapi.com/products";

const displayAll = document.querySelector(".display-all");
const displaySingle = document.querySelector(".display-single");
const loader = document.querySelector(".lds-ellipsis");
const body = document.querySelector("body");

function getAllProducts(productUrl) {
  return new Promise((resolve, reject) => {
    fetch(productUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        console.error("Error in fetching products", err);
        reject(err);
      });
  });
}

function displayAllProducts() {
  let newDiv = document.createElement("div");
  newDiv.setAttribute("class", "products");

  loader.style.display = "inline-block";

  getAllProducts(productsUrl)
    .then((products) => {
      loader.style.display = "none";

      products.forEach((product) => {
        let image = document.createElement("img");
        image.setAttribute("class", "product-images");
        image.setAttribute("src", `${product.image}`);
        image.setAttribute("alt", "product-image");
        image.setAttribute("id", `${product.id}`);

        let productName = document.createElement("p");
        productName.setAttribute("class", "product-names");
        productName.innerText = product.title;

        let productPrice = document.createElement("p");
        productPrice.setAttribute("class", "product-price");
        productPrice.innerText = `$ ${product.price}`;

        let productImageDis = document.createElement("div");
        productImageDis.setAttribute("class", "productImageDis");
        productImageDis.appendChild(productName);
        productImageDis.appendChild(productPrice);

        let productDiv = document.createElement("div");
        productDiv.setAttribute("class", "each-product");
        productDiv.appendChild(image);
        productDiv.appendChild(productImageDis);

        newDiv.appendChild(productDiv);
      });
    })
    .then(() => {
      console.log("all-products-appended");
      displayAll.appendChild(newDiv);
    })
    .catch((err) => {
      console.error("Cannot display Products", err);
      let error = document.createElement("h1");
      error.innerText = "Internal Error:Cannot display Products";
      displayAll.appendChild(error);
    });
}
displayAllProducts();

//For Single Image Display

displayAll.addEventListener("click", displaySingleProduct);

function displaySingleProduct(event) {
  if (event.target.classList[0] === "product-images") {
    getAllProducts(productsUrl + `/${event.target.id}`)
      .then((productInfo) => {
        displayAll.style.display = "none";
        loader.style.display = "none";

        let singleImage = document.createElement("div");
        singleImage.setAttribute("class", "single-product");

        let productName = document.createElement("p");
        productName.setAttribute("class", "single-product-name");
        productName.innerText = productInfo.title;

        let productPrice = document.createElement("p");
        productPrice.setAttribute("class", "single-product-price");
        productPrice.innerText = `$ ${productInfo.price}`;

        let productImg = document.createElement("img");
        productImg.setAttribute("class", "single-product-img");
        productImg.setAttribute("src", `${productInfo.image}`);
        productImg.setAttribute("alt", `product-image`);

        let productDiscription = document.createElement("p");
        productDiscription.setAttribute("class", "single-product-discription");
        productDiscription.innerText = productInfo.description;

        let productRating = document.createElement("p");
        productRating.setAttribute("class", "single-product-rating");
        productRating.innerText = `Rating: ${productInfo.rating.rate} / 5`;

        let productCategory = document.createElement("p");
        productCategory.setAttribute("class", "single-product-category");
        productCategory.innerText = `Category:${productInfo.category}`;

        let backButton = document.createElement("button");
        backButton.setAttribute("class", "single-product-button");
        backButton.innerText = "Back";

        let singleImageInfo = document.createElement("div");
        singleImageInfo.setAttribute("class", "single-image-info");

        singleImageInfo.appendChild(productName);
        singleImageInfo.appendChild(productPrice);
        singleImageInfo.appendChild(productDiscription);
        singleImageInfo.appendChild(productRating);
        singleImageInfo.appendChild(productCategory);
        singleImageInfo.appendChild(backButton);

        singleImage.appendChild(productImg);
        singleImage.appendChild(singleImageInfo);

        displaySingle.innerHTML = "";
        displaySingle.appendChild(singleImage);
        displaySingle.style.display = "block";
      })
      .then(() => {
        let button = document.querySelector(".single-product-button");
        console.log(button);
        button.addEventListener("click", goToHomePage);
      })
      .catch((err) => {
        let error = document.createElement("h1");
        error.innerText = "Internal Error:Cannot display Product";
        displayAll.appendChild(error);
        console.error(`Error in getting ${event.target.id} details`, err);
      });
  } else {
    displayAll.style.display = "block";
  }
}

//Back to home page fuunction
function goToHomePage(event) {
  displaySingle.style.display = "none";
  displayAll.style.display = "block";
}
