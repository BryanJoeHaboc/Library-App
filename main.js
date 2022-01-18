let myLibrary = [];

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

const removeCard = (container) => {
  console.log(container);
  container.innerHTML = "";
  console.log(container);
};

function addBookToLibrary() {
  const data = getDataFromForm();
  console.log(data);
  const book = new Book(data);
  myLibrary.push(book);
}

function addCard() {
  const data = {
    title: "Harry Potter",
    author: "J.K. Rowling",
    pages: "350",
    status: "Will Read",
  };
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
  titleLabel.classList.add("card-content");
  authorLabel.classList.add("card-content");
  pagesLabel.classList.add("card-content");
  statusLabel.classList.add("card-content");

  switchSlider.classList.add("switch");
  checkBox.setAttribute("type", "checkbox");
  slider.classList.add("slider");
  slider.classList.add("round");

  switchSlider.append(checkBox);
  switchSlider.append(slider);

  removeButton.onclick = removeCard(container);
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
