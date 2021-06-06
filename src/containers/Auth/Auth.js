import React ,{Component} from 'react';
import Input from "../../components/Ui/Input/Input";
import Button from "../../components/Ui/Button/Button";
import * as actionTypes from "../../store/actions/auth";
import {connect} from "react-redux";
import Spinner from "../../components/Ui/Spinner/Spinner";
import {Redirect} from "react-router-dom";

class Auth extends Component {

    state ={
        controls:{
            email:{
                elementType: "input",
                elementConfig :{
                    type:"email",
                    placeholder: "Email"
                },
                value :"",
                validation: {
                    required: true,
                    isEmail : true
                },
                valid: false ,
                touched : false
            },
            password:{
                elementType: "input",
                elementConfig :{
                    type:"password",
                    placeholder: "Password"
                },
                value :"",
                validation: {
                    required: true,
                    minLength : 6
                },
                valid: false ,
                touched : false
            }

        }
    }
    checkValidity(value , rules){
        let isValid = true;
        if(!rules){
            return true
        }

        if(rules.required){
            isValid = value.trim() !=='' && isValid
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;

    }


    inputHandler = (event , controlName) =>{
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls:updatedControls})
    }
    submitHandler =(event) =>{
        event.preventDefault();
        this.props.oAuth(this.state.controls.email.value,  this.state.controls.password.value)
    }
    render() {
        const formElementsArray =[];
        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config: this.state.controls[key]

            })
        }
        let form = formElementsArray.map(formElement =>(
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidation={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputHandler(event, formElement.id)}
            />
        ))


        if(this.props.loading){
            form = <Spinner/>
        }
        let errorMessage = null ;
        if(this.props.error){
            errorMessage =(
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={"/"}/>
        }
        return(
            <div>
                <div className="container">
                    <div className="col-md-4">
                        <form onSubmit={this.submitHandler}>
                            {authRedirect}
                            {errorMessage}
                            {form}
                        <div style={{marginTop:"10px"}}>
                            <Button btnType="btn-success">Login</Button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return{
        loading : state.auth.loading ,
        error : state.auth.error,
        isAuthenticated: state.auth.token !== null ,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        oAuth: (email, password) => dispatch(actionTypes.auth(email, password))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);