const createHomepageTemplate = () => /*html*/`
 <!DOCTYPE html>
  <html>
    <head>
      <title>My Reading List</title>
      <script src="https://unpkg.com/htmx.org@2.0.1" integrity="sha384-QWGpdj554B4ETpJJC9z+ZHJcA/i59TyjxEPXiiUgN2WmTyV5OEZWCD6gQhgkdpB/" crossorigin="anonymous"></script>

      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <header>
        <h1>My Reading List</h1>
      </header>

      <main>
        <div class="search" style="text-align: center;">
          <input
          type="search"
          name="search"
          placeholder="search books by title"
          hx-post="/books/search"
          hx-trigger="keyup changed delay:300ms"
          hx-target=".book-list"
          />
        </div>
        <div class="book-list">
           <button hx-get="/books" hx-swap="innerHTML" hx-target=".book-list">Show Books</button>
        </div> 

        <div class="add-book-form">
          <h2>What do you want to read?</h2>
           <form
           hx-post="/books"
           hx-on::after-request="document.querySelector('form').reset()"
           hx-target=".book-list ul"
           hx-swap="beforeend"
           >
            <input
                id="title"
                type="text"
                name="title"
                placeholder="title"
                required
            />
            <input
                id="author"
                type="text"
                name="author"
                placeholder="author"
                required
            />
            <button>Add Book</button>
           </form>
        </div>
      </main>
    </body>
  </html>
`;
//hx-on used followed by single colon --> using regular browser events
//hx-on used followed by double colon --> using htmx-specific events
//default trigger for buttons is click but can be changes using hx-trigger, esim "dblclick"
//similarly, default trigger for forms is submitEvent and for inputs changeEvent

export default createHomepageTemplate;