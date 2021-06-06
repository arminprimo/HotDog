import React,{Component} from 'react';
import {connect} from "react-redux";

import CheckoutSummery from "../../components/Order/ChekcoutSummery/CheckoutSummery";
import {Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData";


class Checkout extends Component {

    checkoutFinalHandler =() =>{
        this.props.history.replace("/checkout/contact-data")
    }
    checkoutCancelHandler =()=>{
        this.props.history.goBack();
    }

    render(){
        return(
            <div>
                <CheckoutSummery ingredients={this.props.ings}
                                 checkoutFinal={this.checkoutFinalHandler}
                                 checkoutCancel={this.checkoutCancelHandler}/>
                <Route path={this.props.match.path+'/contact-data'} component={ContactData}/>

            </div>
        )
    }
}

const mapStateToProps =(state) =>{
    return{
        ings: state.foodBuilder.ingredients
    };
}
export default connect(mapStateToProps)(Checkout);
