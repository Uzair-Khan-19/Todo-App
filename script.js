// getting elements by there ID's
const inputbox = document.getElementById("inputBox");
const mylist = document.getElementById("mylist");
const freespace = document.querySelector(".empty-box");

// When there is no task it will diplay the image and text
const Emptyspace = () => {
  freespace.style.display = mylist.children.length === 0 ? "block" : "none";
};

// Add task in the ul container in the form of "li"
// Also add delete button for li using "appendChild"
function addTask() {
  if (inputbox.value === "") {
    alert("You Have To Write Something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputbox.value;
    mylist.appendChild(li);
    let button = document.createElement("button");
    button.innerHTML = "<i class='fa-solid fa-trash'></i>";
    li.appendChild(button);
    saveData();
  }
  Emptyspace();
  updateItemsLeft();

  inputbox.value = "";
}

// Add toggle function when clicked on list
// Removes removes parent container = "LI" when cliked on delete button
mylist.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "I") {
      e.target.parentElement.parentElement.remove();
      saveData();
    }
    Emptyspace();
    updateItemsLeft();
  },
  false,
);

// Shops left Tasks in container
const taskLeft = document.getElementById("task-left");
function updateItemsLeft() {
  const allTasks = mylist.querySelectorAll("li");
  let count = 0;

  allTasks.forEach((task) => {
    if (!task.classList.contains("checked")) {
      count++;
    }
  });
  taskLeft.textContent = count + " Tasks left";
}

// Display current Day , Month , Year and Time
const timeData = document.getElementById("date-time");
function updateDateTime() {
  const now = new Date();

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const format = now.toLocaleString("en-IN", options);
  timeData.innerHTML = '<i class="fa-solid fa-clock"></i>' + format
}
updateDateTime();
// Updates time in every 40 seconds
setInterval(updateDateTime, 40000);

// Clear or removes every tasks in the container at once
const clearTask = document.getElementById("clear-all");
clearTask.addEventListener("click", function () {
  mylist.innerHTML = "";
  Emptyspace();
  updateItemsLeft();
  saveData();
});

// Saves data in local storage
function saveData() {
  localStorage.setItem("data", mylist.innerHTML);
}

// Load data from the local storage
function loadTask() {
  mylist.innerHTML = localStorage.getItem("data");
}
loadTask();
updateItemsLeft();
Emptyspace();
