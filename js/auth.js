const signUp = document.querySelector("#signUp");
const singIn = document.querySelector("#singIn");
const register = document.querySelector("#register");
const login = document.querySelector("#login");
const changePasswordVisibility = document.querySelector(
  "#changePasswordVisibility"
);
const actionbutton = document.querySelector("#actionbutton");
const actionToggleArray = document.querySelectorAll(".actionToggle");
const topSide = document.querySelector(".top");

const nameInput = document.querySelector("#name");
const lastname = document.querySelector("#lastName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const url = location.href;
const action = url.split("/").pop().split("?").pop() || "register";

const showPasswordIcon = '<i class="fa-solid fa-eye"></i>';
const hidePasswordIcon = '<i class="fa-solid fa-eye-slash"></i>';
let isShownPassword = true;

if (action === "register") {
  toggle("register");
} else {
  toggle("login");
}

changePasswordVisibility.addEventListener("click", () => {
  if (isShownPassword) {
    changePasswordVisibility.innerHTML = hidePasswordIcon;
    password.type = "text";
  } else {
    changePasswordVisibility.innerHTML = showPasswordIcon;
    password.type = "password";
  }
  isShownPassword = !isShownPassword;
});

register.addEventListener("click", () => {
  toggle("register");
});

login.addEventListener("click", () => {
  toggle("login");
});

actionbutton.addEventListener("click", () => {
  const isAction = action === "register";

  if (isAction) {
    userRegister();
  } else {
    userLogin();
  }
});

actionbutton.addEventListener("click", () => {
  const isAction = action === "register";
  if (isAction) {
    actionRegister();
  } else {
    actionLogin();
  }
});

function actionRegister() {
  let userName = nameInput.value;
  let userLastName = lastname.value;
  let userEmail = email.value;
  let userPassword = password.value;

  if (
    userName == "" ||
    userLastName == "" ||
    userEmail == "" ||
    userPassword == ""
  ) {
    displayToast("Failed, fill every input", "error", "red");
  } else {
    console.log(userName, userLastName, userEmail, userPassword);
    displayToast("successfully registereds", "success", "green");
    addElementInFirebase("User", {
      name: userName,
      lastname: userLastName,
      email: userEmail,
      password: userPassword,
    });
    nameInput.value = "";
    lastname.value = "";
    email.value = "";
    password.value = "";

    // const usersArrayUpdated = getRefFromFirebase("User");
    // setTimeout(() => {
    //   const userIndex = usersArrayUpdated.findIndex(
    //     (user) =>
    //       user.data.email === userEmail && user.data.password === userPassword
    //   );
    //   if (userIndex === -1) {
    //     displayToast("Failed, sing in again", "error", "red");
    //   } else {
    //     const id = usersArrayUpdated[userIndex];
    //     sessionStorage.setItem("user_id", id);
    //   }
    // }, 500);
  }
}

function actionLogin() {
  let userEmail = email.value;
  let userPassword = password.value;

  const usersArrayUpdated = getRefFromFirebase("User");
  setTimeout(() => {
    const userIndex = usersArrayUpdated.findIndex(
      (user) =>
        user.data.email === userEmail && user.data.password === userPassword
    );
    if (userIndex == -1) {
      displayToast("The entered information is incorrect", "error", "red");
    } else {
      displayToast("successfully authorized", "success", "green");
      const id = usersArrayUpdated[userIndex].id;
      sessionStorage.setItem("user_id", id);
    }
  }, 1000);
}

function toggle(action) {
  const isAction = action === "register";

  if (isAction) {
    signUp.classList.add("active");
    singIn.classList.add("active");
  } else {
    signUp.classList.remove("active");
    singIn.classList.remove("active");
  }

  actionToggleArray.forEach((element) => {
    element.style.display = isAction ? "block" : "none";
  });
  actionbutton.classList.add(isAction ? "btn-primary" : "btn-warning");
  actionbutton.classList.remove(isAction ? "btn-warning" : "btn-primary");
  actionbutton.textContent = isAction ? "Sign up" : "Sing in";
  login.style.color = isAction ? "black" : "#ffc107";
  register.style.color = isAction ? "#0d6efd" : "black";
  actionbutton.onclick = isAction ? userRegister : userLogin;
}

function userRegister() {
  let usersName = name.value;
  let usersLastName = lastname.value;
  let usersEmail = email.value;
  let usersPassword = password.value;

  const usersarray = getRefFromFirebase("User");

  setTimeout(() => {
    let isUserUnique = usersarray.some(
      (user) => user.data.email === usersEmail
    );

    if (isUserUnique) {
      displayToast("Failed, Email isn't unique", "error", "red");
      return;
    }

    if (
      usersName === "" ||
      usersLastName === "" ||
      usersEmail === "" ||
      usersPassword === ""
    ) {
      displayToast("Failed, Fill every input", "error", "red");
    } else {
      displayToast("Succsessfully registered", "success", "green");
      addElementInFirebase("User", {
        name: usersName,
        lastName: usersLastName,
        email: usersEmail,
        password: usersPassword,
      });
      actionbutton.disabled = true;

      const usersarrayUpdated = getRefFromFirebase("User");
      setTimeout(() => {
        const userIndex = usersarrayUpdated.findIndex(
          (user) =>
            user.data.email === usersEmail &&
            user.data.password === usersPassword
        );
        console.log(usersarrayUpdated);
        if (userIndex === -1) {
          displayToast("Failed, Sing in", "error", "red");
        } else {
          const id = usersarrayUpdated[userIndex].id;
          sessionStorage.setItem("user_id", id);
          window.location.href = "index.html";
        }
      }, 500);
    }
  }, 500);
}

function userLogin() {
  let usersEmail = email.value;
  let usersPassword = password.value;

  let usersarrayUpdated = getRefFromFirebase("User");

  setTimeout(() => {
    const userIndex = usersarrayUpdated.findIndex(
      (user) =>
        user.data.email === usersEmail && user.data.password === usersPassword
    );

    if (userIndex === -1) {
      displayToast("Failed, fill inputs correctly", "error", "red");
    } else {
      displayToast("Succsessfully Login", "success", "green");
      const id = usersarrayUpdated[userIndex].id;
      sessionStorage.setItem("user_id", id);
      window.location.href = "index.html";
    }
  }, 1000);
}
