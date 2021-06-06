import React, {Component} from 'react';
import Wrapper from "../../hoc/Wrapper/Wrapper";
import classes from "./OrderSummery.module.css";
import Button from "../Ui/Button/Button";

class OrderSummery extends Component {

   componentWillUpdate() {
       console.log("order summery will updated")
   }

    render(){
        const ingredientsSummery = Object.keys(this.props.ingredients)
            .map(igKey =>{
                return(
                    <li key={igKey}><span>{igKey}</span>: {this.props.ingredients[igKey]}</li>
                )

            })
        return(
            <Wrapper>
                <div className={classes.orderMain}>
                    <h4>Carrello</h4>
                    <ul>
                        {ingredientsSummery}
                    </ul>
                    <hr/>
                    <Button btnType="btn-success " clicked={this.props.purchaseCheckout} >Check Out</Button>
                    <Button btnType={" btn-warning"} clicked={this.props.purchaseContinue}>Continue</Button>
                </div>
            </Wrapper>
        )
    }
}


export default OrderSummery;