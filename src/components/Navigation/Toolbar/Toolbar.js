import React from 'react';
import Wrapper from "../../../hoc/Wrapper/Wrapper";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const Toolbar = (props) => {
    return (
        <Wrapper>
            <header className={classes.Toolbar}>
                <nav>
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>
                <div>
                    <Logo/>
                </div>



            </header>

        </Wrapper>
    );
};

export default Toolbar;