import React from 'react';
import {Link, useLocation} from "react-router-dom";
import styled from "styled-components";


const StyledUl = styled.div`
list-style: none;
padding:0;

li{
    padding:4px;
    margin:5px;
    background-color:#f0f0f0;
    display:inline-block;

&.active{
    background-color:#ccc;
    }
}`;

function BookMenu({url}) {

    const location = useLocation()    //url 전체 주소
    // console.log(location)


    return (
        <StyledUl>

            <ul>
                <li className={(location.pathname === url && 'active').toString()}>
                    <Link to={`${url}`}>
                        General Information
                    </Link>
                </li>

                <li className={(location.pathname === `${url}/authors` && 'active').toString()}>
                    <Link to={`${url}/authors`}>
                        Author Information
                    </Link>
                </li>

                <li className={(location.pathname === `${url}/photos` && 'active').toString()}>
                    <Link to={`${url}/photos`}>
                        Photo Information
                    </Link>
                </li>
            </ul>
        </StyledUl>
    );
}

export default BookMenu;