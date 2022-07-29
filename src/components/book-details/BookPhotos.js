import {Divider, DropBox, Gallery} from "../../ui";
import React, {useState} from 'react';
import {getBase64URL, resizeImg} from "../../functions/imageFn";
import db, {storageRef} from "../../firebase";
import firebase from "firebase/compat/app";
import ImgProgress from "../../ui/imgProgress";


function BookPhotos({book, id}) {

    const [imag, setImag] = useState([])

    const onFiles = async (files) => {
        // console.log(files)
        for (let i = 0; i < files.length; i++) {

            try {
                const base64URL = await getBase64URL(files[i])
                // const reader=new FileReader()
                // reader.onload=(e)=>{
                setImag((imag) => [...imag, {url: base64URL, percent: 0}])
                // }
                // reader.readAsDataURL(file)
                const blob = await resizeImg(base64URL, 2000)
                const imageName = `images/books/${Date.now()}.jpeg`
                const uploadTask = storageRef.child(imageName).put(blob, {contentType: "image/jpeg"})

                uploadTask.on("state_changed", (snapshot) => {
                    let percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log(percent)
                    setImag((imag) => imag.map((imag, j) => (j === i ? {url: imag.url, percent} : imag)))
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
                    const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL()

                    console.log("downloadUrl : ", downloadUrl)
                    // console.log(imag)

                    setTimeout(() => setImag((imag) => imag.filter((img, j) => j === i)), 800)
                    //i 와 j 를 돌면서 j===i 인 것만 setImag 에 filtering해서 넣어라

                    await db.collection('books').doc(id).update({
                        photos: firebase.firestore.FieldValue.arrayUnion(downloadUrl)
                    })
                })
            } catch (e) {
                console.error(e)
            }


        }
    }


    return (
        <>
            <h1>Book Image Information</h1>
            {book.photos && book.photos.length ? (<Gallery imgs={book.photos} id={id}/>) : (<p>No Photos</p>
            )}


            <Divider/>

            <DropBox onFiles={onFiles}/>

            {imag.map((img) =>
                (<ImgProgress imgURL={img.url} percent={img.percent}/>)
            )}

        </>
    );
}

export default BookPhotos;