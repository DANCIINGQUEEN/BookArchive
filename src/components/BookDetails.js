import React, {useEffect, useState} from 'react';
import {Route, Switch, useParams, useRouteMatch, BrowserRouter as Router} from 'react-router-dom'
import db from "../firebase";
import BookGeneral from "./book-details/BookGeneral";
import BookAuthors from "./book-details/BookAuthors";
import BookPhotos from "./book-details/BookPhotos";
import BookMenu from "./book-details/BookMenu";

function BookDetails() {
    const {id} = useParams();     //url 파라미터의 id 값을 가져옴

    const [book, setBook] = useState("")

    const match = useRouteMatch()

    useEffect(() => {
        try {
            db.collection('books').doc(id).onSnapshot((snapshot) => {
                setBook(snapshot.data())
                // console.log(setBook)
            })

        } catch (e) {
            console.error(e)
        }
    }, [id])
    // console.log(book)

    return (
        <div className="bookDetails">


            <BookMenu url={match.url}/>
            {book ? (
                <Switch>
                    {/*<>*/}
                    <Route exact path={`${match.path}`} >
                        <BookGeneral book={book} id={id}/>
                    </Route>

                    <Route path={`${match.path}/authors`}>
                        <BookAuthors book={book} id={id}/>
                    </Route>

                    <Route path={`${match.path}/photos`}>
                        <BookPhotos book={book} id={id}/>
                    </Route>
                    {/*</>*/}
                </Switch>
            ) : "Loading..."}


        </div>
    );
}

export default BookDetails;