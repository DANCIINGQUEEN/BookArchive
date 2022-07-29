import styled, {css} from "styled-components"

const ButtonStyled = styled.button`
display: inline-block;
border-radius: 3px;
padding : 0.5rem 0;
margin : 0.5rem 1rem;
width: 11rem;
color:white;
background-color:black;
cursor:pointer;
${props=>{
    return props.outline&&css`
    border:2px solid gray;
    background-color:white;
    border-radius:6px;
    color:black;
    font-size:20px;
    `;
}}
`

//css 형식을 component 로 만들어 넣는다.  버튼의 스타일

function Button({loading, ...rest}) {    //...rest : 나머지 props들
    return (

        <ButtonStyled
            {...rest}
            disabled={loading}>
            {loading ? "Saving..." : rest.children}
        </ButtonStyled>

    )
}

export default Button;