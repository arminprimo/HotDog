import React from 'react';
import Wrapper from "../../../hoc/Wrapper/Wrapper";
import Food from "../../Food/Food";
import Button from "../../Ui/Button/Button";


const CheckoutSummery = (props) => {
    return (
        <Wrapper>
            <div className='container'>
                <h3>La tua ordine :</h3>
                <div>
                    <Food ingredients = {props.ingredients} />
                </div>
                <div className="text-right">
                    <Button btnType="btn-success" clicked={props.checkoutFinal}>Continuo</Button>
                    <Button btnType="btn-warning pull-left" clicked={props.checkoutCancel}>cancel</Button>
                </div>
            </div>

        </Wrapper>
    )


};

export default CheckoutSummery;
