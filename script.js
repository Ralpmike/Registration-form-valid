const form = document.getElementById("form")
const userName = document.getElementById("username")
const password = document.getElementById("password")
const email = document.getElementById("email")
const password2 = document.getElementById("password2")


let Users = []



form.addEventListener('submit', (e) => {
  e.preventDefault()


  checkInputs()
  storeUserData()
})

//validating form 

function checkInputs() {
  const userdetails = {}

  const userNameValue = userName.value.trim();
  const passwordValue = password.value.trim();
  const emailValue = email.value.trim();
  const password2Value = password2.value.trim();

  let count = 0;

  if (userNameValue === "") {
    showError(userName, "Username cannot be blank")
  } else {
    showSuccess(userName)
    count++
    userdetails.username = userNameValue
  }
  if (emailValue === "") {
    showError(email, "Email cannot be blank")
  } else if (!isEmail(emailValue)) {
    showError(email, "Email is not valid")
  } else {
    showSuccess(email)
    count++
    userdetails.email = emailValue
  }

  if (passwordValue === "") {
    showError(password, "Password cannot be blank")
  } else {
    showSuccess(password)
    count++
    userdetails.password = password2Value
  }
  if (password2Value === "") {
    showError(password2, "Password cannot be blank")
  } else if (password2Value !== passwordValue) {
    showError(password2, "Password does not match")
  } else {
    showSuccess(password2)
    count++
  }


  if (userdetails.username !== '' && userdetails.email !== '' && userdetails.password !== '') {
    Users.push(userdetails)
  }

  formSuccess(count)


}

// show error result

function showError(input, message) {

  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  small.innerText = message;

  formControl.className = "form-control error";

  storeUserData()
}

// show success result

function showSuccess(value) {
  let formControl = value.parentElement;
  formControl.className = "form-control success";

  storeUserData()
}


// regex email validation

function isEmail(email) {
  return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)
}

//form success function
function formSuccess(valuecount) {
  if (valuecount === 4) {
    displaySuccess("Submitted Successfully");
    storeUserData()
  }
}

// Success display function when form is completed
function displaySuccess(message) {
  let body = document.querySelector(".container");
  body.style.color = "green";
  body.style.fontSize = "45px";
  body.style.boxShadow = "2px 2px 4px rgba(0,0,0,.2)"
  body.style.backgroundColor = "white";
  body.style.paddingTop = "10px";
  body.style.width = "40%";
  body.style.height = "150px";
  body.style.textAlign = "center"
  body.className = 'submission'
  body.innerHTML = message;
}


// storing user data entered
function storeUserData() {
  let usersInfo = JSON.stringify(Users)
  localStorage.setItem('info', usersInfo)
  let parsedInfo = JSON.parse(localStorage.getItem('info'))
  Users = parsedInfo;
}



