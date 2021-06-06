import React from 'react';
import Wrapper from "../../../hoc/Wrapper/Wrapper";
import FoodControl from "./FoodControl/FoodControl";
import classes from "./FoodControls.module.css";

const controls = [
    {label : "Hot Dog", type:"hotDog"},
    {label : "Formaggio", type:"formaggio"},
    {label : "Insalata", type:"insalata"}
]

const FoodControls = (props) => {
    return (
        <Wrapper>
            <div className={classes.mainBackground}>
                <p> <strong> Prezzo totale : {props.price} euro </strong></p>
                {controls.map(ctrl =>(
                    <FoodControl key={ctrl.label} lable={ctrl.label}
                    added={()=>props.ingredientAdded(ctrl.type)}
                    removed ={()=>props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}/>
                ))}
                <button className="btn btn-primary" disabled={!props.purchasable}
                onClick={props.ordered}>{props.isAuth ? "Acquista" : "Login"}</button>
            </div>
        </Wrapper>
    );
};

export default FoodControls;