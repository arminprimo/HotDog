import React, {Component} from 'react';
import Wrapper from "../Wrapper/Wrapper";
import classes from "./Layout.module.css"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import {connect} from "react-redux";

class Layout extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showSideDrawer: false
        }


    }
    slideDrawerClosedHandler =()=>{
        this.setState({showSideDrawer:false})
    }
    drawerToggleHandler=() =>{
        this.setState((prevState)=>{
            return {showSideDrawer : !prevState.showSideDrawer}
        });
    }
    render(){
        return(
            <Wrapper>
                <Toolbar isAuth={this.props.isAuthenticated} drawerToggleClicked={this.drawerToggleHandler}/>

                <main className={classes.mt}>
                    {this.props.children}
                </main>
            </Wrapper>
        )
    }
}

const mapStateToProps = state =>{
    return {
        isAuthenticated: state.auth.token !== null,

    };
}


export default connect(mapStateToProps)(Layout);


/*
import React from 'react';
import {connect} from "react-redux";

import Wrapper from "../Wrapper/Wrapper";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

const Layout = (props) => (

            <Wrapper>
                <Toolbar isAuth={this.props.isAuthenticated}/>
                <main className={classes.mt}>
                    {props.children}
                </main>
            </Wrapper>

);

const mapStateToProps = (state) =>{
    return {
        isAuthenticated: state.auth.token !== null
    };
}


export default connect(mapStateToProps)(Layout);

 */