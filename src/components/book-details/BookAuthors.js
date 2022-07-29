import React, {useContext, useState} from 'react';
import AuthorForm from "../AuthorForm";
import {ToasterContext} from "../../ui/ToasterContext";
import db, {storageRef} from "../../firebase";
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import BookAuthor from "./BookAuthor";
import styled from 'styled-components'
import {Divider} from "../../ui";


const GridDiv=styled.div`
display:grid;
grid-template-columns:120px auto 50px;
gap:20px;
max-width:600px;
`


function BookAuthors({book, id, dispatch}) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [author, setAuthor] = useState({
        name: '',
        photo: '',
        description: '',
    })


    function createImg(photo) {
        const img = new Image()
        img.src = photo
        return new Promise((resolve, reject) => {
            img.onload = () => resolve(img)
            img.onerror = (e) => reject(e)
        })
    }

    async function resizeImg(photo) {
        const canvas = document.createElement('canvas')
        canvas.width = 250
        canvas.height = 250
        const ctx = canvas.getContext('2d')
        const img = await createImg(photo)

        const scale = Math.min(canvas.width / img.width, canvas.height / img.height)
        //Math 메소드를 이용해서 canvas 크기에 이미지 배율을 맞춰 넣읗 수 있도록 한다

        let x = (canvas.width / 2) - (img.width / 2) * scale
        let y = (canvas.height / 2) - (img.height / 2) * scale

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale)

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob)
                //toBlob : img src 에 설정된 파일을 blob 으로 변경
                //blob : binary large object 대용량 이진 객체 / 이진 데이터를 담을수있는 객체
            })
        })
    }

    const onSubmit = async (author, e) => {
        e.preventDefault()
        setLoading(true)
        try {

            const blob = await resizeImg(author.photo)
            // console.log(blob)
            const photoName = `images/author/${Date.now()}.jpeg`
            const imageRef = storageRef.child(photoName)      //storage 에 imgRef를 넣음
            const uploadTask = imageRef.put(blob, {contentType: "image/jpeg"})
            uploadTask.on('state_changed', (snapshot) => {
                    let progress = (snapshot.bytesTransferred - snapshot.bytesTransferred) * 100
                    console.log(progress)
                    //firebase 에서 제공하는 메소드들
                    //bytesTransferred : number, the number of bytes that have been successfully uploaded so far 현재까지 성공적으로 업로드 된 양
                    //bytesTransferred : the total number of bytes to be uploaded 업로드된 바이트의 total number
                }, (e) => {
                    switch (e.code) {
                        case'storage/unauthorized':
                            console.error("Unauthorized path")
                            break;
                        case'storage/unknown':
                            console.error(e.serverResponse)
                            break;
                    }
                }, async () => {
                    const downloadURL = await uploadTask.snapshot.ref.getDownloadURL()    //storage에 접근해서 downloadURL 가져옴
                    console.log("downloadURL : ", downloadURL)
                    await db.collection('books').doc(id).update({
                        authors: firebase.firestore.FieldValue.arrayUnion({...author, photo: downloadURL})
                    })
                    setAuthor({ //다시 작가 정보 초기화
                        name: '',
                        photo: '',
                        description: '',
                    })
                    addToast({text: "Author Information Updated", type: "success"})
                    setLoading(false)

                }
            )

        } catch (e) {
            console.error("Author Update Error", e)
            setError("Author Update Failed")
            setTimeout(() => {
                setError(null)
            }, 3000)
            setLoading(false)


        }

    }

    //useContext 를 통해 addToast 를 가져옴
    const {addToast} = useContext(ToasterContext)


    return (
        <div className="BookAuthors">
            <h1>Author Information</h1>
            <GridDiv>
                {book.authors ? book.authors.map(author => <BookAuthor author={author} id={id} dispatch={dispatch}/>) : "No Author"}
            </GridDiv>
            <Divider/>
            <h4>Author Information Edit</h4>
            <AuthorForm error={error}
                        loading={loading}
                        onSubmit={onSubmit.bind(this, author)}
                        author={author}
                        setAuthor={setAuthor}/>
        </div>
    );
}

export default BookAuthors;