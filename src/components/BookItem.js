import React from 'react';
import {Link, useHistory} from 'react-router-dom'
import {useStateValue} from "../StateProvider";

function BookItem({book}) {

    const [{user}, dispatch] = useStateValue()

    const history = useHistory()

    const handleClick = () => {
        if (user) {
            history.push(`/book/${book.id}`)
        } else {
            history.push(`/login`)
        }
    }

    return (
        <div className="book-item">

            <h1 onClick={handleClick} style={{'cursor': 'pointer'}}>
                {/*<Link to={`/book/${book.id}`}>*/}
                {book.title}
                {/*</Link>*/}
            </h1>

            <span>
                <strong>
                    Title : {" "}
                </strong>
                {book.title}
            </span>

            <br/>

            <span>
                <strong>
                    Pages : {" "}
                </strong>
                {book.pages}
            </span>

            <br/>

            <span>
                <strong>
                    Published Date : {" "}
                </strong>
                {new Date(book.publishDate.toDate()).toLocaleString()}
            </span>

        </div>
    );
}

export default BookItem;