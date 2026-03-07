const form = document.getElementById("loginForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const defaultUser = "admin";
  const defaultPass = "admin123";

  if (username === defaultUser && password === defaultPass) {
    window.location.href = "main.html";
  } else {
    document.getElementById("error").innerText =
      "Invalid username or password";
  }
});