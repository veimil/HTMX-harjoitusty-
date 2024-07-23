import express from 'express';
import createHomepageTemplate from './views/index.js';
import createListTemplate from './views/list.js';
import createBookTemplate from './views/book.js';
import createEditFormTemplate from './views/edit.js';
import BOOKS_DATA from './data/data.js';

// create app
const app = express();
app.use(express.urlencoded({ extended: false })); //used for parsing form-data from POST-requests //


// static assets
app.use(express.static('public'));


//get-request to root, server returns the html in createHomepageTemplate() //
app.get('/', (req, res) => {
  res.send(createHomepageTemplate());
});


//get-request to /books initiated based on the hx-get parameter in the Show Books -button of createHomepageTemplate -html //
app.get('/books', (req, res) => {
  res.send(createListTemplate(BOOKS_DATA)); //html returned by createListTemplate is inserted and swapped with original html content
  // based on hx-target and hx-swap -parameters (used alongside hx-get in createHomepageTemplate -html)
});


//post-request to /books initiated based on hx-post parameter in the Add Book -button (again used alongside hx-target and hx-swap
// -parameters to determine how the returned html from the redirect at the bottom of this route handler is placed compared to the initial html content)
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const id = Math.random().toString();

  BOOKS_DATA.push({ id, title, author }); //add a new book to the BOOKS_DATA

  res.redirect(`/books/${id}`); //redirect
});


app.get('/books/:id', (req, res) => {
  const { id } = req.params;
  const book = BOOKS_DATA.find((b) => b.id === id);

  res.send(createBookTemplate(book)); //add the html from createBookTemplate to the html where hx-post was used (added according to hx-target and hx-swap parameters)
})


app.delete('/books/:id', (req, res) => {
  const id = req.params.id;
  const idx = BOOKS_DATA.findIndex((b) => b.id === id);
  BOOKS_DATA.splice(idx, 1); //delete the book from the index where the id is the same as the id of the book for which delete-request was called (from views/book.js)

  res.send(); //send an empty (html) response
})


app.put('/books/:id', (req, res) => {
  const { title, author } = req.body;
  const { id } = req.params;

  const updatedBook = { title, author, id };
  const idx = BOOKS_DATA.findIndex((b) =>  b.id === id);
  BOOKS_DATA[idx] = updatedBook;

  res.send(createBookTemplate(updatedBook));
})

app.get('/books/edit/:id', (req, res) => {
  const book = BOOKS_DATA.find((b) => b.id === req.params.id);

  res.send(createEditFormTemplate(book));

})

app.post('/books/search', (req, res) => {
  const text = req.body.search.toLowerCase();

  const books = BOOKS_DATA.filter((b) => b.title.toLowerCase().includes(text));

  res.send(createListTemplate(books));
})

// listen to port
app.listen(3000, () => {
  console.log('App listening on port 3000');
});