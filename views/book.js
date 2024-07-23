const createBookTemplate = (book) => /*html*/`
    <li data-id="${book.id}">
        <div class="details" hx-get="/books/edit/${book.id}" hx-target="closest li">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
        </div>
        <button
            hx-delete="/books/${book.id}"
            hx-target="closest li"
            hx-swap="outerHTML"
        >Delete</button>
    </li>
`;
//when clicking details, get-request to /books/edit/<id> is made. When the server responds with html, the li is replaced with form

// delete-request, the route handler inside app.js returns an empty (html) response which replaces the li itself 
// based on the hx-target and hx-swap parameters, deleting it from the view


export default createBookTemplate;