const modalBtn = document.getElementById("modalBtn");
const closeBtn = document.getElementById("closeBtn");
const modal = document.getElementById("add-book-modal");

modalBtn.addEventListener("click", viewModal);

closeBtn.addEventListener("click", closeModal);

function Book(book) {
  this.bookTitle = book.title;
  this.author = book.author;
  this.pages = book.pages;
  this.status = book.status;
}

const getDataFromForm = () => {
  const data = {};
  for (let i = 0; i < document.addBookForm.elements.length; i++) {
    const fieldName = document.addBookForm.elements[i].name;
    const fieldValue = document.addBookForm.elements[i].value;

    data[fieldName] = fieldValue;
  }
  return data;
};

const removeCard = (data) => {
  console.log("removeCard", data._id);
  let number = data._id;
  const card = document.getElementById("book-" + ++number);
  console.log(card);
  const container = document.getElementById("card-container");
  container.removeChild(card);
  while (card.firstChild) {
    card.removeChild(card.firstChild);
  }

  const lib = JSON.parse(localStorage.getItem("library"));

  console.log(data._id);
  const newArr = lib.filter((ele) => ele._id !== data._id);

  console.log("newArr", newArr);

  if (!newArr.length) {
    localStorage.clear("library");
  } else {
    localStorage.setItem("library", JSON.stringify(newArr));
  }
};

function addBookToLibrary(event) {
  event.preventDefault();
  const data = getDataFromForm();

  // clear inputs
  const frm = document.getElementsByName("addBookForm")[0];
  frm.reset(); // Reset all form data

  console.log(data);

  const lib = JSON.parse(localStorage.getItem("library"));
  const count = !lib ? 0 : lib.length;

  const book = new Book(data);

  book._id = count;

  if (lib) {
    lib.push(book);
    localStorage.setItem("library", JSON.stringify(lib));
  } else {
    const temp = [];
    temp.push(book);
    localStorage.setItem("library", JSON.stringify(temp));
  }

  closeModal();
  addCard(book, count);
}

function viewModal() {
  document.getElementById("add-book-modal").style.display = "block";
}

function closeModal() {
  document.getElementById("add-book-modal").style.display = "none";
}

function addCard(data, count) {
  const container = document.querySelector(".card-container");
  const children = document.createElement("div");

  // const title = document.createElement("p");
  // const author = document.createElement("p");
  // const pages = document.createElement("p");
  // const status = document.createElement("p");

  const titleLabel = document.createElement("p");
  const authorLabel = document.createElement("p");
  const pagesLabel = document.createElement("p");
  const statusLabel = document.createElement("p");

  // toggle slider
  const switchSlider = document.createElement("label");
  const checkBox = document.createElement("input");
  const slider = document.createElement("span");

  // remove button
  const removeButton = document.createElement("button");

  titleLabel.innerHTML = "Title: " + data.title;
  authorLabel.innerHTML = "Author: " + data.author;
  pagesLabel.innerHTML = "Pages: " + data.pages;
  statusLabel.innerHTML = "Status: " + data.status;

  children.classList.add("card-book");
  children.setAttribute("id", "book-" + ++count);
  titleLabel.classList.add("card-content");
  authorLabel.classList.add("card-content");
  pagesLabel.classList.add("card-content");
  statusLabel.classList.add("card-content");

  switchSlider.classList.add("switch");
  checkBox.setAttribute("type", "checkbox");
  slider.classList.add("slider");
  slider.classList.add("round");

  removeButton.classList.add("delete-card-btn");
  removeButton.innerText = "Remove Book";
  removeButton.addEventListener("click", removeCard.bind(null, data, count));
  switchSlider.append(checkBox);
  switchSlider.append(slider);

  // removeButton.onclick = removeCard(container);

  // title.classList.add("card-content");
  // author.classList.add("card-content");
  // pages.classList.add("card-content");
  // status.classList.add("card-content");

  // title.innerHTML = data.title;
  // author.innerHTML = data.author;
  // pages.innerHTML = data.pages;
  // status.innerHTML = data.status;

  children.append(titleLabel);
  // children.append(title);
  children.append(authorLabel);
  // children.append(author);
  children.append(pagesLabel);
  // children.append(pages);
  children.append(statusLabel);
  // children.append(status);

  children.append(switchSlider);

  //remove button
  children.append(removeButton);

  container.appendChild(children);
}
