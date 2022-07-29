import React from 'react';
import styled, {css} from 'styled-components'

const Wrapper = styled.div`
position:fixed;
right:20px;
bottom:20px;
width:280px;
`

const Toast = styled.div`
background:#fefefe;
border:#ccc 1px solid;
box-shadow:1px 1px 4px 1px rgba(0,0,0,0.2);
padding:15px;
margin-top:15px;

${props => props.type === `success` && css`
    background-color:ForestGreen;
    border:none;
    color:white;
`};

${props => props.type === `error` && css`
    background-color:Tomato;
    border:none;
    color:white;
`};
`

function Toaster({toasts}) {
    return (
        <Wrapper>
            {toasts.map((toast) =>
                (
                    <Toast className="toast" type={toast.type}>
                    {toast.text}
                </Toast>
                )
            )}
        </Wrapper>
    );
}

//Toast 는 에러가 발생하거나 정보를 저장하는데 성공했을 때 오른쪽 아래에 표시해주는 기능.
// {/*Toaster 컴포넌트에 setToast 정보를 준다.  */}

export default Toaster;