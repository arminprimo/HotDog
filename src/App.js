import React,{Component} from "react";
import './App.css';
import Layout from "./hoc/Layout/Layout";
import FoodBuilder from "./containers/FoodBuilder/FoodBuilder";
import Checkout from "./containers/Checkout/Checkout";
import {Route, Switch} from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class App extends Component {
  render(){
      let routes =(
          <Switch>
              <Route path="/auth" component={Auth}/>
              <Route path="/" exact component={FoodBuilder}/>
              <Redirect to={"/"}/>
          </Switch>
      )
      if(this.props.isAuthenticated){
          routes =(
              <Switch>
                  <Route path="/checkout" component={Checkout}/>
                  <Route path="/auth" component={Auth}/>
                  <Route path="/logout" component={Logout}/>
                  <Route path="/" exact component={FoodBuilder}/>
              </Switch>
          )
      }
      return (
          <div className="App">
              <Layout>
                  {routes}
              </Layout>
          </div>
      );
  }
}
const mapStateToProps = state =>{
    return {
        isAuthenticated : state.auth.token !== null
    }
}

export default connect (mapStateToProps) (App);
