import React, {useState} from 'react';
import {Button, Field, Message} from "../ui";
import Modal from "../ui/Modal";
import db from "../firebase";
import {ToasterContext, ToasterProvider} from "../ui/ToasterContext"
import {useHistory} from "react-router-dom";
import {useStateValue} from "../StateProvider";


function AddBook() {
    const [bookTitle, setBookTitle] = useState("")
    const [bookPage, setBookPage] = useState("")
    const [bookPublish, setBookPublish] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isModal, setIsModal] = useState(false)
    const [{user}, dispatch] = useStateValue()

    const history = useHistory()

    // console.log(books)

    const handleBook = async (addToast, e) => { //요청이 있을때만 실행되는 비동기 함수
        e.preventDefault()
        // console.log({bookTitle, bookPage, bookPublish})
        setLoading(true)

        try {
            const docRef = await db.collection('books').add({    //db안에 books라는 경로를 만들고 컬렉션을 만듦
                title: bookTitle,
                pages: parseInt(bookPage),
                publishDate: new Date(bookPublish),
            })
            // .then((docRef) => {
            //         (
            //             console.log(docRef))
            //     }
            // )
            addToast({text: "Save Success", type: "success"})
            docRef.id ? history.push(`/book/${docRef.id}`) : history.push(`/`)
            //아이디가 존재하면 (정보가 들어가면 )그 url로 이동시킴

        } catch (e) {
            addToast({text: "Save Error Occurred", type: "error"})

            setError("Error Occurred")
            setTimeout(() => {
                setError(null)
            }, 3000)
            //error message 3초 뒤에 사라짐
        }
    }

    const handleClick = () => {
        if (user) {
            setIsModal(true)
            setError(null)
        } else {
            history.push(`/login`)
        }
    }
    return (
        <ToasterContext.Consumer>
            {({addToast}) => (
                <>
                    <Button outline
                            onClick={handleClick}>
                        Add New Book
                    </Button>
                    <Modal title="Add New Book"
                           show={isModal}
                           close={() => setIsModal(false)}>

                        <form onSubmit={handleBook.bind(this, addToast)}>
                            <Field labelText="Title&nbsp;&nbsp;" id="book-title">
                                <input
                                    type="text"
                                    name="name"
                                    id="book-title"
                                    value={bookTitle}
                                    placeholder="Title"
                                    onChange={(e) => setBookTitle(e.target.value)}/>
                            </Field>

                            <Field labelText="Pages&nbsp;&nbsp;" id="book-pages">
                                <input
                                    type="number"
                                    name="Pages"
                                    id="book-pages"
                                    value={bookPage}
                                    placeholder="Pages"
                                    onChange={(e) => setBookPage(e.target.value)}/>
                            </Field>

                            <Field labelText="Published Date&nbsp;&nbsp;" id="book-publish-date">
                                <input
                                    type="date"
                                    name="publish-date"
                                    id="book-publish-date"
                                    value={bookPublish}
                                    placeholder="Publish Date"
                                    onChange={(e) => setBookPublish(e.target.value)}/>
                            </Field>
                            {/*onChange : 상태가 변할때*/}
                            {/*set 함수 : e.target.value의 값을 넣어줌*/}
                            {/*input은 onChange, button은 onClick*/}


                            <Button type="submit" disabled={loading}>
                                Save
                            </Button>

                            <Message text={error} type="error"/>
                        </form>
                    </Modal>

                </>
            )}

        </ToasterContext.Consumer>
    );
}

export default AddBook;
