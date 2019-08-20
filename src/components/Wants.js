import React from "react";
import PropTypes from "prop-types";
import { formatCurrency } from "../utils/formatter";
import "./Wants.scss";

const Want = ({ want, initiateDelete }) => {
    const handleClickRemove = () => {
        initiateDelete(want.id);
    };
    return (
        <li className="wantList__item">
            <span className="wantList__thing">{ want.thing }</span>
            <span className="wantList__category">{ want.category }</span>
            <span className="wantList__cost">{ `$${ formatCurrency(want.cost) }` }</span>
            <button className="wantList__remove" onClick={ handleClickRemove }>-</button>
        </li>
    );
};

const Wants = ({ wants, initiateAdd, initiateDelete }) => {
    const handleAddClick = () => {
        const thingElement = document.getElementById("wantThing");
        const categoryElement = document.getElementById("wantCategory");
        const costElement = document.getElementById("wantCost");
        
        initiateAdd(thingElement.value, categoryElement.value, costElement.value);

        thingElement.value = "";
        categoryElement.value = "";
        costElement.value = "";
    };
    return (<div className="wantList">
        <h2 className="wantList__title">Things I want</h2>
        <ul className="wantList__list">
            { wants.map(want => <Want want={ want } key={ want.id } initiateDelete={ initiateDelete } />) }
        </ul>
        <div className="wantList__add">
            <input id="wantThing" className="wantList__add-thing" type="text"></input>
            <input id="wantCategory" className="wantList__add-category" type="text"></input>
            <input id="wantCost" className="wantList__add-cost" type="text"></input>
            <button className="wantList__add-button" onClick={ handleAddClick }>Add</button>
        </div>
    </div>);
};

Wants.propTypes = {
    wants: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        thing: PropTypes.string,
        category: PropTypes.string,
        cost: PropTypes.number
    })),
    initiateAdd: PropTypes.func,
    initiateDelete: PropTypes.func
};

export default Wants;
