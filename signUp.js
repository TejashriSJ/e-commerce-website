//home page navigation
let home = document.querySelector("#home");
home.addEventListener("click", goToHomePage);
function goToHomePage() {
  document.location.href = "index.html";
}

// Validating Names
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
// Generating Error  Messages
let messageElement = document.createElement("p");
messageElement.classList.add("message");

function createMessage(element, messageTxt) {
  messageElement.innerText = messageTxt;
  element.nextElementSibling.before(messageElement);
  return messageElement;
}

//Form Validation

let form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  messageElement.style.display = "none";

  let firstName = document.querySelector("#first-name");
  let lastName = document.querySelector("#last-name");
  let email = document.querySelector("#email");
  let password = document.querySelector("#password");
  let repeatePassword = document.querySelector("#repeat-password");
  let checkbox = document.querySelector("#checkbox");
  let message;

  if (!isValidName(firstName.value)) {
    message = createMessage(firstName, "!Provide valid first name");

    message.style.display = "block";
  } else if (!isValidName(lastName.value)) {
    message = createMessage(lastName, "!Provide valid last name");

    message.style.display = "block";
  } else if (password.value.length < 8) {
    message = createMessage(password, "!Minimum length should be 8");

    message.style.display = "block";
  } else if (password.value !== repeatePassword.value) {
    message = createMessage(repeatePassword, "!Password is not matching");

    message.style.display = "block";
  } else if (!checkbox.checked) {
    let checkboxElement = document.querySelector(".checkbox");

    message = createMessage(
      checkboxElement,
      "!You must agree to terms and conditions"
    );
    message.style.display = "block";
  } else {
    let successMessage = document.querySelector("#successMessage");
    let signUpDetails = {
      name: firstName.value + " " + lastName.value,
    };
    let beforeLogin = document.querySelector(".before-login");
    //let signUp = document.querySelector(".sign-up");
    console.log("before login", beforeLogin);

    localStorage.setItem("signUpDetails", JSON.stringify(signUpDetails));
    let userDetails = JSON.parse(localStorage.getItem("signUpDetails")).name;
    console.log(JSON.parse(localStorage.getItem("signUpDetails")).name);

    form.reset();

    let userName = document.querySelector(".user-name");
    let afterLogin = document.querySelector(".after-login");

    userName.innerText = userDetails;

    beforeLogin.style.display = "none";
    afterLogin.style.display = "block";

    successMessage.innerText = "Registered Successfully!";
    successMessage.style.display = "block";
  }
});

// log out

let logOut = document.querySelector(".log-out");

logOut.addEventListener("click", () => {
  localStorage.removeItem("signUpDetails");
  location.reload();
});
