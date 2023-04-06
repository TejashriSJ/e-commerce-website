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
      let AllProductsDetails = products.map((product) => {
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

        return productDiv;
      });
      return AllProductsDetails;
    })
    .then((AllProductsDetails) => {
      console.log("all-products-appended");
      newDiv.append(...AllProductsDetails);
      displayAll.appendChild(newDiv);
    })
    .catch((err) => {
      console.error("Cannot display Products", err);
      let error = document.createElement("h1");
      error.innerText = "Internal Error:Cannot display Products";
      displayAll.innerHTML = "";
      loader.style.display = "none";
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
        displayAll.innerHTML = "";
        loader.style.display = "none";
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

let home = document.querySelector("#home");
home.addEventListener("click", goToHomePage);

//Go to sign UP page

let signUp = document.querySelector(".sign-up");
signUp.addEventListener("click", goToSignUpPage);

function goToSignUpPage(event) {
  document.location.href = "signUp.html";
}

//Check if Sign in or not
let afterLogIn = document.querySelector(".after-login");
let beforeLogin = document.querySelector(".before-login");
let userName = document.querySelector(".user-name");
let logedInUser = JSON.parse(localStorage.getItem("signUpDetails"));

if (logedInUser !== null) {
  beforeLogin.style.display = "none";
  userName.innerText = logedInUser.name;
  afterLogIn.style.display = "block";
} else {
  beforeLogin.style.display = "block";
  afterLogIn.style.display = "none";
}

// log out

let logOut = document.querySelector(".log-out");

logOut.addEventListener("click", () => {
  localStorage.removeItem("signUpDetails");
  location.reload();
});
