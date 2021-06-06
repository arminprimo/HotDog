import * as actionTypes from './actionTypes'

/*
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
 */

export const addIngredient =(name) =>{
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName :name
    }
}
export const removeIngredient =(name) =>{
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName :name
    }

}