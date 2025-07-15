// event listeners
document.querySelector("#submit").addEventListener("click", validateInput);

// functions
// display number of books suggestions based on user input
async function displayBooks(numberOfBooks) {
    let display = document.querySelector("#display");
    let url = `https://fakerapi.it/api/v2/books?_quantity=${numberOfBooks}`;
    let response = await fetch(url);
    let data = await response.json();
    let books = data.data;

    display.innerHTML = ""; // clear display when inputting new number of book suggestions
    for (let book of books) {
        display.innerHTML += `
            <strong>Title:</strong> ${book.title}<br>
            <strong>Author:</strong> ${book.author}<br>
            <strong>Description:</strong> ${book.description}<br>
            <strong>Genre:</strong> ${book.genre}<br>
            <strong>ISBN:</strong> ${book.isbn}<br>
            <strong>Year Published:</strong> ${book.published}<br>
            <strong>Publisher:</strong> ${book.publisher}<br>
            <hr>`;
    }
}

// validate input by user
function validateInput() {
    let numberOfBooks = document.querySelector("#numberOfBooks").value;
    let validation = document.querySelector("#validation");
    let isValid = true;

    validation.innerHTML = ""; // clear validation errors

    if (numberOfBooks === "") {
        validation.innerHTML = "<strong>Please enter a number.</strong>";
        isValid = false;
    } else {
        numberOfBooks = parseInt(document.querySelector("#numberOfBooks").value);

        if (isNaN(numberOfBooks)) {
            validation.innerHTML = "<strong>Please enter a valid input. Numbers only.</strong>";
            isValid = false;
        } else if (numberOfBooks === 0) {
            validation.innerHTML = "<strong>Enter a number greater than 0.</strong>";
            isValid = false;
        } else if (numberOfBooks > 5) {
            validation.innerHTML = "<strong>Maybe start with just a few suggestions.</strong>";
            isValid = false;
        }
    }

    if (isValid) {
        displayBooks(numberOfBooks);
    } else {
        document.querySelector("#display").innerHTML = ""; // clear book displays from previous 
    }                                                      // suggestions if isValid is false

}