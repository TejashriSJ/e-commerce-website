const productsUrl = "https://fakestoreapi.com/products";

const displayAll = document.querySelector(".display-all");
const displaySingle = document.querySelector(".display-single");
const body = document.querySelector("body");

function getAllProducts(productUrl) {
  return fetch(productUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      body.innerHTML = "<h1>Error:Check Your Internet Connection</h1>";
      console.error(err);
    });
}

function displayAllProducts() {
  let newDiv = document.createElement("div");
  newDiv.setAttribute("class", "products");
  getAllProducts(productsUrl)
    .then((products) => {
      products.forEach((product) => {
        let image = document.createElement("img");
        let productName = document.createElement("p");
        let productPrice = document.createElement("p");
        let productDiv = document.createElement("div");
        let productImageDis = document.createElement("div");

        productDiv.setAttribute("class", "each-product");
        productImageDis.setAttribute("class", "productImageDis");

        productName.innerText = product.title;
        productPrice.innerText = `$ ${product.price}`;

        image.setAttribute("class", "product-images");
        image.setAttribute("src", `${product.image}`);
        image.setAttribute("alt", "product-image");
        image.setAttribute("id", `${product.id}`);

        productName.setAttribute("class", "product-names");
        productPrice.setAttribute("class", "product-price");

        productDiv.appendChild(image);
        productImageDis.appendChild(productName);
        productImageDis.appendChild(productPrice);
        productDiv.appendChild(productImageDis);

        newDiv.appendChild(productDiv);
        console.log(newDiv);
      });
    })
    .then(() => {
      console.log("all-products-appended");
      displayAll.appendChild(newDiv);
    })
    .catch((err) => {
      console.error("Cannot display Products", err);
      body.innerHTML = "<h1>Internal Error:Cannot display Products</h1>";
    });
}
displayAllProducts();

displayAll.addEventListener("click", displaySingleProduct);

function displaySingleProduct(event) {
  console.log(event.target.classList[0]);
  if (event.target.classList[0] === "product-images") {
    getAllProducts(productsUrl + `/${event.target.id}`)
      .then((productInfo) => {
        console.log(productInfo);

        displayAll.style.display = "none";

        let singleImage = document.createElement("div");
        let productName = document.createElement("p");
        let productPrice = document.createElement("p");
        let productImg = document.createElement("img");
        let productDiscription = document.createElement("p");
        let productRating = document.createElement("p");
        let productCategory = document.createElement("p");
        let backButton = document.createElement("button");

        singleImage.setAttribute("class", "single-product");
        productName.setAttribute("class", "single-product-name");

        productName.innerText = productInfo.title;

        productPrice.setAttribute("class", "single-product-price");

        productPrice.innerText = `$ ${productInfo.price}`;

        productImg.setAttribute("class", "single-product-img");
        productImg.setAttribute("src", `${productInfo.image}`);
        productImg.setAttribute("alt", `product-image`);

        productDiscription.setAttribute("class", "single-product-discription");
        productDiscription.innerText = productInfo.description;

        productRating.setAttribute("class", "single-product-rating");
        console.log("Rating", productInfo.rating);
        productRating.innerHTML = `Rating: ${productInfo.rating.rate} / 5`;

        productCategory.setAttribute("class", "single-product-category");
        productCategory.innerHTML = `Category:${productInfo.category}`;

        backButton.innerText = "Back";

        singleImage.appendChild(productImg);

        let singleImageInfo = document.createElement("div");
        singleImageInfo.setAttribute("class", "single-image-info");

        singleImageInfo.appendChild(productName);
        singleImageInfo.appendChild(productPrice);
        singleImageInfo.appendChild(productDiscription);
        singleImageInfo.appendChild(productRating);
        singleImageInfo.appendChild(productCategory);
        singleImageInfo.appendChild(backButton);
        singleImage.appendChild(singleImageInfo);

        console.log(singleImage);
        displaySingle.innerHTML = "";
        displaySingle.appendChild(singleImage);
        displaySingle.style.display = "block";
      })
      .catch((err) => {
        body.innerHTML = "<h1>Internal Error:`Error in getting  details`</h1>";
        console.error(`Error in getting ${e.target.id} details`);
      });
  } else {
    displayAll.style.display = "block";
  }
}

let button = addEventListener("click", goTOHomePage);

function goTOHomePage(event) {
  console.log(event.target);
  displaySingle.style.display = "none";
  displayAll.style.display = "block";
}
