const playBtn = document.querySelector(".play");
const nicknameField = document.querySelector("#nickname");

let nickname = "";

playBtn.addEventListener("click", (e) => {
   e.preventDefault();
   console.log(nicknameField.value);
   if (nicknameField.value === "") {
      alert("Please enter your nickname");
   } else {
      // get nickname to local storage
      nickname = nicknameField.value;
      localStorage.setItem("nickname", nickname);
      window.location.href = "./pages/game.html";
      //   reset input value
      nicknameField.value = "";
   }
});

console.log(nickname);
