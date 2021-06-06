import React, {Component} from 'react';
import {connect} from "react-redux";

import Button from "../../../components/Ui/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/Ui/Spinner/Spinner";
import Input from "../../../components/Ui/Input/Input";

class ContactData extends Component {
    state={
        orderForm:{
            name : {
                elementType : 'input',
                elementConfig : {
                    type: "text" ,
                    placeholder : 'Nome e Cognome '
                },
                value : '',
                validation :{
                    required : true,
                    minLength : 3,
                },
                valid : false,
                touched : false
            },

            email : {
                elementType : 'input',
                elementConfig : {
                    type: "email" ,
                    placeholder : 'email'
                },
                value : '',
                validation :{
                    required : true
                },
                valid : false,
                touched : false

            },
            indirizzo : {
                elementType : 'input',
                elementConfig : {
                    type: "text" ,
                    placeholder : 'indirizzo'
                },
                value : '',
                validation :{
                    required : true
                },
                valid : false,
                touched : false
            },
            deliveryMethod : {
                elementType : 'select',
                elementConfig: {
                    options:[
                        {value:"Consegna a domicilio", label:"Consegna a domicilio"},
                        {value:"Ritira a ristorante", label:"Ritira a ristorante"},
                    ]
                },
                value :'',
                validation :{},
                valid: true
            }
        },
        formIsValid : false ,
        loading : false
    }
    orderHandler = (event) =>{
        event.preventDefault();
        this.setState({loading:true})
        const formData={};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price : this.props.price,
            order : formData
        }
        axios.post('posts',order)
            .then(responce => {
                this.setState({loading: false})
                this.props.history.push('/')
                console.log(responce)
            })
            .catch(error =>{this.setState({loading:false })
                console.log(error)
            })


    }
    checkValidity(value, rules){
        let isValid = true ;
        if(!rules){
            return true;
        }
        if(rules .required){
            isValid =value.trim() !== '' && isValid
        }
        if(rules .minLength){
            isValid =value.length >= rules.minLength && isValid
        }
        if(rules .maxLength){
            isValid =value.length <= rules.maxLength && isValid
        }
        return isValid;
    }
    inputHandler =(event, inputIdentifier)=>{
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] =updatedFormElement;
        let formIsValid= true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }
    render() {
        const formElementsArray =[];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config: this.state.orderForm[key],
            })
        }
        let form =(
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement =>(
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidation={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) =>this.inputHandler(event, formElement.id)}
                    />
                ))}
                <div style={{marginTop:"10px"}}>
                    <Button btnType="btn-success" clicked={this.orderHandler} disabled={!this.state.formIsValid} >
                        Check out</Button>
                </div>
            </form>
        )
        if(this.state.loading){
            form = <Spinner/>
        }
        return(
            <div className="container" style={{textAlign:"left"}}>
                <h5 style={{marginTop:"20px"}}>Informazioni di Consegna</h5>
                <div className="row">
                    <div className="col-md-6">
                        {form}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return {
        ings: state.foodBuilder.ingredients,
        price: state.foodBuilder.totalPrice,

    };
}

export default connect(mapStateToProps) (ContactData);

/*
import React, {Component} from 'react';
import {connect} from "react-redux";

import Button from "../../../components/Ui/Button/Button";
import classes from "./ContactData.module.css"
import axios from "../../../axios-orders";
import Spinner from "../../../components/Ui/Spinner/Spinner";
import Input from "../../../components/Ui/Input/Input";



class ContactData extends Component {

    state = {
        orderForm:{
            name:{
                elementType :"input",
                elementConfig: {
                    type:"text",
                    placeholder :"Nome Cognome "
                },
                value:"",
                validation: {
                    required: true,
                    minLength :2,
                    maxLength:7


                },
                valid: false,
                touched :false
            },
            email:{
                elementType :"input",
                elementConfig: {
                    type:"text",
                    placeholder :"Email"
                },
                value:"",
                validation: {
                    required: true,

                },
                valid: false,
                touched :false
            },
            indirizzo:{
                elementType :"input",
                elementConfig: {
                    type:"text",
                    placeholder :"Indirizzo"
                },
                value:"",
                validation: {
                    required: true,
                },
                valid: false,
                touched :false
            },
            deliveryMethod:{

                elementType: "select",
                elementConfig:{
                    options:[
                        {value:"Consegna a domicilio", label:"Consegna a domicilio"},
                        {value:"Ritira a ristorante", label:"Ritira a ristorante"},
                    ]
                },
                value:"",
                validation:{},
                valid: true

            }

        },
        formIsValid : false,
        loading: false

    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        const formData={};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier]= this.state.orderForm[formElementIdentifier].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            order:formData
        }
        axios.post('posts', order).then(r => {
            this.setState({loading: false})
            this.props.history.push("/")
            console.log(r)
        })
            .catch(error => {
                this.setState({loading: false})
                console.log(error)
            })

    }

    inputHandler =(event, inputIdentifier)=>{
        const updatedOrderForm ={
            ...this.state.orderForm
        }
        const updatedFromElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFromElement.value = event.target.value;
        updatedFromElement.valid = this.checkValidity(updatedFromElement.value , updatedFromElement.validation)
        updatedFromElement.touched= true ;
        updatedOrderForm[inputIdentifier] =updatedFromElement;
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        this.setState({orderForm: updatedOrderForm,formIsValid:formIsValid});
    }

    render() {
        const formElementsArray =[];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config: this.state.orderForm[key]

            })
        }
        let form = (
            <form className={classes.formOffset} onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
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
                ))}

                <div style={{marginTop:"10px"}}>
                    <Button btnType="btn-success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>
                        Check out</Button>
                </div>


            </form>

        )
        if (this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className="container">
                <h4 style={{marginTop: "20px", textAlign: "left"}}>Informazioni di Consegna</h4>
                <div className="row">
                    <div className="col-md-7">
                        {form}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        ings: state.foodBuilder.ingredients,
        price: state.foodBuilder.totalPrice

    };
}
export default connect(mapStateToProps)(ContactData);

 */