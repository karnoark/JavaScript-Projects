let myImage = document.querySelector("img");
let myButoon = document.querySelector("button");
let myHeading = document.querySelector("h1");

// neww.addEventListener("click", () => {
//     alert("the fuck you clicked at?!")
// })

myImage.onclick = () => {
  const mySrc = myImage.getAttribute("src");
  if (mySrc === "media/download.jpeg") {
    console.log("source is download.jpeg");
    myImage.setAttribute("src", "media/RedPandaFirefox.jpg");
    myHeading.textContent = "This is mozirolla .... NOT!!";
  } else {
    myImage.setAttribute("src", "media/download.jpeg");
  }
};

// function setUsername(){
//     const myName = prompt("Please enter your username");
//     localStorage.setItem("name", myName);
//     myHeading.textContent = `Mozilla is cool, right ${myName}?`;
// }

function setUserName() {
  const myName = prompt("Please enter your name.");
  if (!myName) {
    setUserName();
  } else {
    localStorage.setItem("name", myName);
    myHeading.textContent = `Mozilla is cool, ${myName}`;
  }
}

console.log(localStorage.getItem("name"));

localStorage.setItem("name", null);

if (!localStorage.getItem("name")) {
  setUserName();
} else {
  const storedName = localStorage.getItem("name");
  myHeading.textContent = `Mozilla is cool, ${storedName}`;
}

myButoon.onclick = () => {
  setUserName();
};

console.log("hello  ");
console.