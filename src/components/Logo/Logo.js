import React from 'react';
import hotDogLogo from '../../assets/01.png'
import classes from './Logo.module.css'

const Logo = (props) => (

        <div className={classes.Logo}>
            <img src={hotDogLogo} style={{width:"50px" , borderRadius:"50px"}} alt="Logo"/>
        </div>

)

export default Logo;