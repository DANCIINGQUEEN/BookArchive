import React, {useContext} from 'react';
import {ToasterContext} from "../../ui/ToasterContext";
import db, {storage} from "../../firebase";
import firebase from "firebase/compat/app";
import profileImg from '../../ui/profile-placeholder.png'
import {excerpt} from "../../functions/stringFn";


function BookAuthor({author, id, dispatch}) {

    const {addToast} = useContext(ToasterContext)

    const handleDelete = async (e) => {
        e.preventDefault()
        try {

            if (author.photo !== "") await storage.refFromURL(author.photo).delete()
            //download URL 을 storage에서 삭제
            await db.collection('books').doc(id).update({
                authors: firebase.firestore.FieldValue.arrayRemove(author)
            })  //database에서 삭제
            addToast({text: 'Author Delete Complete', type: 'success'})
        } catch (e) {
            console.error(e)
            addToast({text: 'Delete Failed', type: 'error'})


        }
    }
    return (
        <>
            <figure>
                {/*삽화나, 다이어그램같이 문서의 주요 흐름과는 독립적인 요소 태그*/}
                <img src={author.photo === "" ? profileImg : author.photo} width="120" alt=""/>
            </figure>
            <div>
                <h5>
                    {author.name}
                </h5>
                <p>
                    {excerpt(author.description)}
                </p>
            </div>
            <div>
                <a href="#" onClick={handleDelete}>
                    Delete
                </a>
            </div>
        </>
    );
}

export default BookAuthor;