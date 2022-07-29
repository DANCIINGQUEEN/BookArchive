import React, {useEffect, useState} from 'react';
import db from "../firebase";
import BookItem from "./BookItem";
import AddBook from "./AddBook"

function BookList() {
    const [books, setBooks] = useState([])

    useEffect(() => {
        db.collection('books').onSnapshot(snapshot => setBooks(snapshot.docs.map((doc) => (({
            id: doc.id,
            ...doc.data()
        })))))
    }, [])
    // database에 있는 데이터들을 mapping해서 books라는 컬렉션 배열에 넣음

    return (
        <div className="bookList">
            <AddBook/>

            <div className="book-list">
                <h2>Book List</h2>

                {!books.length ? 'Loading...' : books.map((book) => (
                    // 책 리스트 하나씩 매핑

                    <BookItem book={book}/>
                ))}
            </div>
        </div>
    );
}

export default BookList;