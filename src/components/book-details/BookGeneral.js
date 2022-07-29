import React from 'react';
import EditBook from "../EditBook";

function BookGeneral({book, id}) {
    return (
        <div className="BookGeneral">
            <h1>Edit</h1>
            <p>Book : {book.title}</p>
            <hr/>
            <EditBook book={book} id={id}/>
        </div>
    );
}

export default BookGeneral;