import createBookTemplate from "./book.js";

const createListTemplate = (books) => /*html*/`
<ul>
    ${books.map((book) => createBookTemplate(book)).join('')}
</ul>
`;
//for every item in BOOKS-DATA, call createBookTemplate and join the resulting html together

export default createListTemplate;