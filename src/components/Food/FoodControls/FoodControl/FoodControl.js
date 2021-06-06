import React from 'react';
import classes from "./FoodControl.module.css";

const FoodControl = (props) => {
    return (
        <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
                <div className="form-group row">
                    <div className="col-sm-7">
                        <button className="btn btn-sm btn-danger ml" onClick={props.removed}
                                disabled={props.disabled}>-</button>
                        <button className="btn btn-sm btn-success ml" onClick={props.added}>+</button>
                    </div>
                    <label className="col-sm-5 mt-6 ">{props.lable}</label>
                </div>
            </div>
        </div>

    );
};

export default FoodControl;