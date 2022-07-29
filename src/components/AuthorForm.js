import React from 'react';
import {Button, Field, Message} from '../ui'
import profileImg from '../ui/profile-placeholder.png'
import {getBase64URL} from "../functions/imageFn";

function AuthorForm({error, loading, onSubmit, author, setAuthor}) {

    // const imgRef=useRef()   //특정 dom 을 사용하는 hook 함수

    const handleFile = async (e) => {
        // const file = e.target.files[0]
        // if (!file.type.startsWith("image/")) return;
        // const reader = new FileReader()   //file blob 의 내용을 읽을수 있도록 도와줌
        // reader.readAsDataURL(file)  //file data를 url로 읽음
        const base64URL=await getBase64URL(e.target.files[0])

        // reader.onload = (e) => {                //file이 성공적으로 가져와지면
            // imgRef.current.src=e.target.result
            setAuthor({
                ...author,
                // photo: e.target.result   //url로 읽어온것을  photo에 넣어줌
                photo:base64URL
            })

        // }
    }

    const handleChange = (e) => {
        setAuthor({
            ...author,
            [e.target.name]: e.target.value
        })      //spread 함수 사용해서 form 에 있는 값의 state change를 한번에 변경
    }

    return (
        <form onSubmit={onSubmit}>
            <Field labelText="Author&nbsp;&nbsp;" id="author-name">
                <input type="text" name="name" id="author-name" placeholder="name" value={author.name}
                       onChange={handleChange}/>
            </Field>

            <Field labelText="Photo&nbsp;&nbsp;" id="author-photo">
                <div>
                    <figure>
                        {/*삽화나, 다이어그램같이 문서의 주요 흐름과는 독립적인 요소 태그*/}
                        <img src={author.photo === "" ? profileImg : author.photo} width="120" alt=""/>
                    </figure>

                    <input type="file" onChange={handleFile} name="Photo" id="author-photo" accept="image/*"/>
                    {/*accept : 서버로 업로드 허용 가능한것 "image/*"  : 모든 이미지 파일*/}
                </div>
            </Field>

            <Field labelText="Description&nbsp;&nbsp;" id="author-description">
                <textarea name="description" id="author-description" rows="8" value={author.description}
                          onChange={handleChange}/>
            </Field>

            <Message text={error} type="error"/>
            <Button loading={loading} type="submit">Add Author</Button>


        </form>
    );
}

export default AuthorForm;