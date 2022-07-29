import React, {useState} from 'react';
import styled, {css} from 'styled-components'

const StyledLabel=styled.label`
display:flex;
width:300px;
height:300px;
border:#ccc 2px dashed; 
margin:20px;
align-items:center;
justify-content:center;
cursor:pointer;

${({dragEnter})=>dragEnter&&css`
border-color:yellow;`}
`


function DropBox({onFiles}) {
    const [dragEnter, setDragEnter]=useState(false)

    const handleFiles=(e)=>{
        console.log(e.target.files)     //입력된 file정보 출력
        onFiles(e.target.files)

    }

    const handleDragEnter=(e)=>{
        e.stopPropagation()     //event 가 상위 컴포넌트에 전해지지 않도록함 ex) 사진 넣으면 새로운 창 안뜨게
        e.preventDefault()
        setDragEnter(true)

    }

    const handleDragLeaver=(e)=>{
        e.stopPropagation()     //event 가 상위 컴포넌트에 전해지지 않도록함 ex) 사진 넣으면 새로운 창 안뜨게
        e.preventDefault()
        setDragEnter(true)
    }

    const handleDragOver=(e)=>{
        e.stopPropagation()
        e.preventDefault()
        setDragEnter(true)
    }

    const handleDrop=(e)=>{
        e.stopPropagation()
        e.preventDefault()
        // setDragEnter(true)
        // console.log(e.dataTransfer.files)   //drop이 발생한 후 이벤트 출력
        onFiles(e.dataTransfer.files)
    }


    return (
        <div className="bookPhotos">
            <div className="dropbox">
                <StyledLabel
                    dragEnter={dragEnter}       // 드래그가 범위 내에 들어왔을때 발생하는 이벤트
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeaver}     //마우스가 범위에서 떠날때 발생하는 이벤트
                    onDragOver={handleDragOver}     //마우스가 목표한 공간을 지나갈때 발생
                    onDrop={handleDrop}     //마우스를 놨을때 발생
                    htmlFor="images-upload">
                    Image File Drop
                </StyledLabel>

                <input
                    onChange={handleFiles}
                    multiple
                    type="file"
                    name="images-upload"
                    id="images-upload"
                    className="visually-hidden"/>
                {/*multiple : 여러개 넣을수있도록  className="visually-hidden" : 파일추가 버튼 안보이게
                onDragEnter : 정확히 목표한 공간에 드래그하고 마우스를 땟을때 이벤트 발생
                */}
            </div>
        </div>
    );
}

export default DropBox;