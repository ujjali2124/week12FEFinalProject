let books = [];
let selectedBookIndex = -1;

function displayBooks() {
  clearTable();

  const tableBody = document.getElementById("book-table-body");
  for (let i = 0; i < books.length; i++) {
    const book = books[i];

    // Create a new row in the table
    var newRow = tableBody.insertRow();

    // Insert cells with the input values
    var titleCell = newRow.insertCell();
    titleCell.innerHTML = book.title;

    var authorCell = newRow.insertCell();
    authorCell.innerHTML = book.author;

    var descriptionCell = newRow.insertCell();
    descriptionCell.innerHTML = book.description;

    // Add Edit button
    var editCell = newRow.insertCell();
    var editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.className = "btn btn-primary btn-sm";
    editButton.setAttribute("data-index", i);
    editButton.addEventListener("click", editBook);
    editCell.appendChild(editButton);

    // Add Delete button
    var deleteCell = newRow.insertCell();
    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.setAttribute("data-index", i);
    deleteButton.addEventListener("click", deleteBook);
    deleteCell.appendChild(deleteButton);
  }
}

function clearTable() {
  const tableBody = document.getElementById("book-table-body");
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }
}

function editBook(event) {
  selectedBookIndex = event.target.getAttribute("data-index");
  const selectedBook = books[selectedBookIndex];

  document.getElementById("title").value = selectedBook.title;
  document.getElementById("author").value = selectedBook.author;
  document.getElementById("description").value = selectedBook.description;

  document.getElementById("create-button").innerText = "Update Book";
}

function deleteBook(event) {
  const index = event.target.getAttribute("data-index");
  books.splice(index, 1);
  displayBooks();
}

document.getElementById("create-form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Get the input values
  var title = document.getElementById("title").value;
  var author = document.getElementById("author").value;
  var description = document.getElementById("description").value;

  // Check if any input field is empty
  if (!title || !author || !description) {
    alert("Please fill in all fields");
    return;
  }

  const book = {
    title,
    author,
    description
  };

  if (selectedBookIndex === -1) {
    // Create a new book
    books.push(book);
  } else {
    // Update the selected book
    books[selectedBookIndex] = book;
    selectedBookIndex = -1; // Reset the selected book index
    document.getElementById("create-button").innerText = "Add Book"; // Reset the button text
  }

  document.getElementById("create-form").reset();
  displayBooks();
});

displayBooks();
