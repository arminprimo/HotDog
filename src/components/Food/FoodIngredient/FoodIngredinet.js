import React,{Component} from 'react';
import PropTypes from 'prop-types';
import classes from "./FoodIngredient.module.css";

class FoodIngredient extends Component {
   render(){

       let ingredient = null ;

       switch(this.props.type) {
           case('pane'):
               ingredient = <div className={classes.pane}>Pane</div>
               break ;
           case("hotDog"):
               ingredient = <div className={classes.hotDog}>Hot Dog</div>
               break;
           case("formaggio"):
               ingredient = <div className={classes.formaggio}>Formaggio</div>
               break ;
            case("insalata"):
               ingredient = <div className={classes.insalata}>Insalata</div>
               break ;
           case('pane'):
               ingredient = <div className={classes.pane}>Pane</div>
               break ;
           default :
               ingredient = null
       }
       return ingredient;
    }
}

FoodIngredient.propTypes= {
    type:PropTypes.string.isRequired
}
export default FoodIngredient;