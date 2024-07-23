const createEditFormTemplate = (book) => /*html*/`
    <form hx-put="/books/${book.id}" hx-target="closest li" hx-swap="outerHTML">
        <input
            type="text"
            name="title"
            placeholder="title"
            required
            value="${book.title}"
        />
        <input
            type="text"
            name="author"
            placeholder="author"
            required
            value="${book.author}"
        />
        <button>Confirm</button>
    </form>
`
// when the form is submitted, a put request to /books/<id> is made
// the returned html (from book.js) is an li-item itself, so we want to replace the whole li
// where this form is with a new li-item that was returned (so we use closest li in hx-target and outerHTML in hx-swap)

export default createEditFormTemplate;