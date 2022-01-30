class Book {
  constructor(bookObj) {
    console.log(bookObj);
    this.title = bookObj.title;
    this.author = bookObj.author;
    this.pages = bookObj.pages;
    this.status = bookObj.status;
    this._id;
  }
}

function formValidation(e) {
  console.log("form validation");
  if (document.getElementById("title").value === "") {
    // document.getElementsById("title").classList.remove("input-add-book");
    document.getElementById("title").classList.add("input-add-book-validation");
  } else {
    document
      .getElementById("title")
      .classList.remove("input-add-book-validation");
  }

  if (document.getElementById("author").value === "") {
    // document.getElementsById("author").classList.remove("input-add-book");
    document
      .getElementById("author")
      .classList.add("input-add-book-validation");
  } else {
    document
      .getElementById("author")
      .classList.remove("input-add-book-validation");
  }

  if (document.getElementById("pages").value === "") {
    // document.getElementsById("pages").classList.remove("input-add-book");
    document.getElementById("pages").classList.add("input-add-book-validation");
  } else {
    document
      .getElementById("pages")
      .classList.remove("input-add-book-validation");
  }

  if (document.getElementById("status").value === "") {
    // document.getElementsById("status").classList.remove("input-add-book");
    document
      .getElementById("status")
      .classList.add("input-add-book-validation");
  } else {
    document
      .getElementById("status")
      .classList.remove("input-add-book-validation");
  }
}

function viewModal() {
  document.getElementById("add-book-modal").style.display = "block";
}

function addCard(data, count) {
  const removeCard = (data) => {
    let number = data._id;
    const card = document.getElementById("book-" + ++number);

    const container = document.getElementById("card-container");
    container.removeChild(card);
    while (card.firstChild) {
      card.removeChild(card.firstChild);
    }

    const lib = JSON.parse(localStorage.getItem("library"));

    const newArr = lib.filter((ele) => ele._id !== data._id);

    if (!newArr.length) {
      localStorage.clear("library");
    } else {
      localStorage.setItem("library", JSON.stringify(newArr));
    }
  };

  const container = document.querySelector(".card-container");
  const children = document.createElement("div");

  const titleLabel = document.createElement("p");
  const authorLabel = document.createElement("p");
  const pagesLabel = document.createElement("p");
  const statusLabel = document.createElement("p");

  // toggle slider
  const switchSlider = document.createElement("label");
  const checkBox = document.createElement("input");
  const slider = document.createElement("span");
  const sliderLabel = document.createElement("label");

  // remove button
  const removeButton = document.createElement("button");

  //add data to the card
  titleLabel.innerHTML = "Title: " + data.title;
  authorLabel.innerHTML = "Author: " + data.author;
  pagesLabel.innerHTML = "Pages: " + data.pages;
  statusLabel.innerHTML = "Status: " + data.status;
  sliderLabel.innerHTML = "Are you done reading this?";

  // add classes
  children.classList.add("card-book");
  // add unique attribute to every card
  children.setAttribute("id", "book-" + ++count);
  titleLabel.classList.add("card-content");
  authorLabel.classList.add("card-content");
  pagesLabel.classList.add("card-content");
  statusLabel.classList.add("card-content");
  sliderLabel.classList.add("card-content");
  sliderLabel.classList.add("card-toggle");
  // making the toggle switch
  switchSlider.classList.add("switch");
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("id", "checkbox-toggle");
  slider.classList.add("slider");
  slider.classList.add("round");
  //remove button
  removeButton.classList.add("delete-card-btn");
  removeButton.innerText = "Remove Book";
  removeButton.addEventListener("click", removeCard.bind(null, data, count));
  //append child to parent
  switchSlider.append(checkBox);
  switchSlider.append(slider);
  children.append(titleLabel);
  children.append(authorLabel);
  children.append(pagesLabel);
  children.append(statusLabel);
  children.append(sliderLabel);
  children.append(switchSlider);
  children.append(removeButton);
  container.appendChild(children);

  checkBox.addEventListener("change", function (e) {
    const card = document.getElementById("book-" + count);

    if (e.target.checked) {
      card.style.backgroundColor = "#34c759";
    } else {
      card.style.backgroundColor = "#cb997e";
    }
  });
}

function closeModalAndExecute(e) {
  e.preventDefault();
  document.getElementById("add-book-modal").style.display = "none";
  const frm = document.getElementsByName("addBookForm")[0];

  const data = (function () {
    {
      const data = {};
      for (let i = 0; i < document.addBookForm.elements.length; i++) {
        if (
          document.addBookForm.elements[i].name !== "" &&
          document.addBookForm.elements[i].value !== ""
        ) {
          const fieldName = document.addBookForm.elements[i].name;
          const fieldValue = document.addBookForm.elements[i].value;
          data[fieldName] = fieldValue;
        } else {
          break;
        }
      }
      const isEmpty = Object.values(data).every((x) => x === null || x === "");

      return isEmpty ? false : data;
    }
  })();

  frm.reset(); //Reset all form data
  const lib = JSON.parse(localStorage.getItem("library"));
  const count = !lib ? 0 : lib.length;

  const book = new Book(data);

  if (book !== false) {
    book._id = count;

    if (lib) {
      lib.push(book);
      localStorage.setItem("library", JSON.stringify(lib));
    } else {
      const temp = [];
      temp.push(book);
      localStorage.setItem("library", JSON.stringify(temp));
    }
    addCard(book, count);
  }
}

// main code

const modalBtn = document.getElementById("modalBtn");
const closeBtn = document.getElementById("closeBtn");
const modal = document.getElementById("add-book-modal");
const formBook = document.getElementById("addBookForm");
const submitButton = document.getElementById("submit-button");

modalBtn.addEventListener("click", viewModal);
closeBtn.addEventListener("click", function (e) {
  document.getElementById("add-book-modal").style.display = "none";
});
formBook.addEventListener("submit", closeModalAndExecute);
submitButton.addEventListener("click", function (e) {
  formValidation(e);
});
formBook.addEventListener("input", function (e) {
  formValidation(e);
});

if (localStorage.getItem("library")) {
  const libArr = JSON.parse(localStorage.getItem("library"));

  for (let i = 0; i < libArr.length; i++) {
    addCard(libArr[i], i);
  }
}
