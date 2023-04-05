//Go to home page
let home = document.querySelector("#home");
home.addEventListener("click", goToHomePage);
function goToHomePage() {
  document.location.href = "index.html";
}

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
let messageElement = document.createElement("p");
messageElement.classList.add("message");

function createMessage(element, messageTxt) {
  messageElement.innerText = messageTxt;

  element.nextElementSibling.before(messageElement);
  return messageElement;
}

//After form submission

let form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  messageElement.style.display = "none";

  console.log(event.target);

  let firstName = document.querySelector("#first-name").value;
  let lastName = document.querySelector("#last-name").value;
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  let repeatePassword = document.querySelector("#repeat-password").value;
  let checkbox = document.querySelector("#checkbox").checked;

  if (!isValidName(firstName)) {
    let firstNameElement = document.querySelector("#first-name");
    let message = createMessage(firstNameElement, "!Provide valid first name");
    message.style.display = "block";
  } else if (!isValidName(lastName)) {
    let lastNameElement = document.querySelector("#last-name");
    let message = createMessage(lastNameElement, "!Provide valid last name");
    message.style.display = "block";
  } else if (password.length < 8) {
    let passwordElement = document.querySelector("#password");
    let message = createMessage(passwordElement, "!Minimum length should be 8");
    message.style.display = "block";
  } else if (password !== repeatePassword) {
    let repeatePasswordElement = document.querySelector("#repeat-password");
    let message = createMessage(
      repeatePasswordElement,
      "!Password is not matching"
    );
    message.style.display = "block";
  } else if (!checkbox) {
    let checkboxElement = document.querySelector(".checkbox");
    console.log(checkboxElement);
    let message = createMessage(
      checkboxElement,
      "!You must agree to terms and conditions"
    );
    console.log(form);
    message.style.display = "block";
  } else {
    let successMessage = document.querySelector("#successMessage");
    console.log(successMessage);
    form.reset();
    successMessage.innerText = "Registered Successfully!";
    successMessage.style.display = "block";
  }
});
