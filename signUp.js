//Go to home page
let home = document.querySelector("#home");
home.addEventListener("click", goToHomePage);
function goToHomePage() {
  document.location.href = "index.html";
}

//After form submission

let form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(event.target);

  let firstName = document.querySelector("#first-name").value;
  let lastName = document.querySelector("#last-name").value;
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  let repeatePassword = document.querySelector("#repeat-password").value;
  let checkbox = document.querySelector("#checkbox").checked;
  let message = document.querySelector("#message");

  message.style.display = "none";

  function isValidName(name) {
    let nameArray = Array.from(name);
    let filterdArray = nameArray.filter((charcter) => {
      return (
        typeof charcter === "string" &&
        ((charcter >= "a" && charcter <= "z") ||
          (charcter >= "A" && charcter <= "Z") ||
          charcter === " ")
      );
    });
    return nameArray.length === filterdArray.length;
  }

  if (!isValidName(firstName)) {
    message.innerText = "Please provide valid First Name";
    message.style.display = "block";
  } else if (!isValidName(lastName)) {
    message.innerText = "Please provide valid Last Name";
    message.style.display = "block";
  } else if (password.length < 6) {
    message.innerText = "Password length should be greater than 5";
    message.style.display = "block";
  } else if (password !== repeatePassword) {
    message.innerText = "Password should Match";
    message.style.display = "block";
  } else if (!checkbox) {
    message.innerText = "You must agree to terms and conditions";
    message.style.display = "block";
  } else {
    form.reset();
    message.innerText = "Regestered Successfully!";
    message.style.display = "block";
    message.style.color = "green";
    message.style.border = "1px solid green";
  }
});
