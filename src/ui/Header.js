import React from 'react';
import {Link} from "react-router-dom";
import {Search} from "@material-ui/icons";
import {useStateValue} from "../StateProvider";
import {auth} from "../firebase";
import styled from 'styled-components'


const StyledHead = styled.div`
height:60px;
display:flex;
align-items:center;
justify-content:flex-start;
background-color:lavender;
position:sticky;
top:0;
z-index:100;

.title{
    margin-right:30px;
    }

.header_search{
    display:flex;
    flex:0.5;
    align-items:center;
    border-radius:24px;
}

.header_searchInput{
    height:12px;
    padding:10px;
    border:none;
    width:100%
    }
    
.header_searchIcon{
    padding:5px;
    height:22px;
    background-color:#cd9042;
    }
    
.header_options{
    display:flex;
    flex-direction:column;
    margin-left:25px;
    align-items:center;
    }
    
.header_optionLineOne{
    font-size:10px;
    color:black;
    font-weight:bold;
    }
.header_optionLineTwo{
    font-size:13px;
    font-weight:800;
    margin-top:3px;}

`

function Header() {

    const [{user}, dispatch] = useStateValue()

    const handleAuthentication = () => {
        if (user) {
            auth.signOut()
        }
    }

    return (
        <StyledHead>
            <h1 className="title">
                <Link to="/">
                    Park's Book Archive
                </Link>
            </h1>

            <div className="header_search">
                <input type="text" className="header_searchInput"/>
                <Search className="header_searchIcon"/>
            </div>

            <div className="header_options">
                <span className="header_optionLineOne">
                    {user ? user.email : "GUEST"}
                </span>

                <Link to={!user&&'/login'}></Link>

                <span className="header_optionLineTwo" onClick={handleAuthentication}>
                    {user ? "Sign Out" : "Sign In"}
                </span>
            </div>

        </StyledHead>
    );
}

export default Header;