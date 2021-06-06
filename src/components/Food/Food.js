import React from 'react';
import FoodIngredient from "./FoodIngredient/FoodIngredinet";


const Food = (props) => {

    let transformIngredients = Object.keys(props.ingredients)
        .map(igKey => {

            return [...Array(props.ingredients[igKey])].map(( _, i) => {
                return <FoodIngredient key={igKey + i} type={igKey} />
            })
    })

        .reduce((arr, el) => {
            return arr.concat(el)
        }, [])


    
    if(transformIngredients.length===0){
        transformIngredients = <p style={{margin:"20px 10px"}}>Scegli il tuo panino</p>
    }

    return (
        <div className="container">
            <FoodIngredient type="pane"/>
            {transformIngredients}
            <FoodIngredient type="pane"/>
        </div>
    );
};

export default Food;