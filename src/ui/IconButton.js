import React from 'react';
import styled, {css} from 'styled-components'
import {Delete} from "@material-ui/icons";
import {Loading} from "./index";

const Div = styled.div`
cursor:pointer;
${({color}) => color && css`
div {
    color: ${color};
`}
${({size}) => size && css`
div {
    font-size: ${size};`
}
`

function IconButton({loading, color, size, onClick}) {
    return (
        <Div size={size} color={color}>
            {loading ? (<Loading/>) : (

                <div>
                    <Delete className="delete" onClick={onClick}/>
                </div>
            )}
        </Div>
    );
}

export default IconButton;