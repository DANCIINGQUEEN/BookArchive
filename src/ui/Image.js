import React, {useContext, useState} from 'react';
import styled, {css} from 'styled-components'
import {Delete} from '@material-ui/icons'
import IconButton from "./IconButton";
import {ToasterContext} from "./ToasterContext";
import firebase from "firebase/compat/app";
// import storage from "firebase/compat/storage";
import db, {storage} from "../firebase";

const Figure=styled.div`
position:relative;
> div{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-image:linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0,) 30%);
    opacity:0;
    transition:opacity 0.2s ease-in-out;
}

:hover{
    div{
        opacity:1;
        }
}`

function Image({img, id}) {

    const [loading, setLoading]=useState(false)
    const {addToast}=useContext(ToasterContext)

    const handleDelete=async ()=>{
        setLoading(true)
        try{
            await storage.refFromURL(img).delete()
            await db.collection('books').doc(id).update({
                photos:firebase.firestore.FieldValue.arrayRemove(img)
            })
            addToast({text:"Delete Success", type:'success'})
        }catch (e) {
            console.error(e)
            addToast({text:"Delete Failed", type:'error'})
        }
        setLoading(false)

    }
    return (
        <Figure>
            <img src={img} height="150" alt=""/>
            <div>
                {/*<Delete className="delete"/>*/}
                <IconButton loading={loading} color="white" onClick={handleDelete}/>
            </div>
        </Figure>
    );
}

export default Image;