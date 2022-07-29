import React, {useState} from 'react';
import {Button, Field, Message} from "../ui";
import db from "../firebase";
import {ToasterContext} from "../ui/ToasterContext"


function EditBook({book, id}) {
    const [bookTitle, setBookTitle] = useState(book.title)
    const [bookPage, setBookPage] = useState(book.pages)
    const [bookPublish, setBookPublish] = useState(book.publishDate.toDate().toISOString().slice(0,10))
    // const [bookPublish, setBookPublish] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    // console.log(books)

    const handleBook = async (addToast, e) => { //요청이 있을때만 실행되는 비동기 함수
        e.preventDefault()
        // console.log({bookTitle, bookPage, bookPublish})
        setLoading(true)

        try {
            await db.collection('books').doc(id).set({
                title: bookTitle,
                pages: parseInt(bookPage),
                publishDate: new Date(bookPublish),
            }, {merge:true})
            addToast({text:"Edit Success", type:"success"})

        } catch (e) {
            addToast({text:"Edit Error Occurred", type:"error"})
            setError("Edit Error Occurred")
            setTimeout(() =>{
                setError(null)
            },3000)
            //error message 3초 뒤에 사라짐
        }



    }
    return (
        <ToasterContext.Consumer>
            { ({addToast})=>(
                <>
                    <form onSubmit={handleBook.bind(this, addToast)}>
                        <Field labelText="Title&nbsp;&nbsp;" id="book-title">
                            <input type="text" name="name" id="book-title" value={bookTitle} placeholder="Title"
                                   onChange={(e) => setBookTitle(e.target.value)}/>
                        </Field>

                        <Field labelText="Pages&nbsp;&nbsp;" id="book-pages">
                            <input type="number" name="Pages" id="book-pages" value={bookPage} placeholder="Pages"
                                   onChange={(e) => setBookPage(e.target.value)}/>
                        </Field>

                        <Field labelText="Published Date&nbsp;&nbsp;" id="book-publish-date">
                            <input type="date" name="publish-date" id="book-publish-date" value={bookPublish}
                                   placeholder="Publish Date" onChange={(e) => setBookPublish(e.target.value)}/>
                        </Field>
                        {/*onChange : 상태가 변할때*/}
                        {/*set 함수 : e.target.value의 값을 넣어줌*/}
                        {/*input은 onChange, button은 onClick*/}


                        <Button type="submit"
                                disabled={loading}>Save</Button>
                        <Message text={error} type="error"/>
                    </form>

                </>
            )}

        </ToasterContext.Consumer>
    );
}

export default EditBook;
