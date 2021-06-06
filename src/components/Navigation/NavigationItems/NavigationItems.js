import React from 'react';
import classes from "./NavigationItems.module.css"
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => (

            <ul className={classes.NavigationItems}>
                <NavigationItem link="/" exact active>Home</NavigationItem>
                <NavigationItem link="/checkout">Check Out</NavigationItem>
                {!props.isAuth ? (<NavigationItem link="/auth">Login</NavigationItem>):
                    (<NavigationItem link="/logout">Logout</NavigationItem>)
                }


            </ul>
)

export default NavigationItems;

//authentication