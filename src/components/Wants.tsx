import React from "react";

import { Want } from "../types";
import { formatCurrency } from "../utils/formatter";
import "./Wants.scss";

type WantProps = {
    want: Want;
    initiateDelete: (id: string) => void;
};

const WantItem: React.FC<WantProps> = ({ want, initiateDelete }) => {
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

type WantsProps = {
    wants: Want[];
    initiateAdd: (thing: string, category: string, cost: number) => void;
    initiateDelete: (id: string) => void;
};

const Wants: React.FC<WantsProps> = ({ wants, initiateAdd, initiateDelete }) => {
    const handleAddClick = () => {
        const thingElement = document.getElementById("wantThing") as HTMLInputElement;
        const categoryElement = document.getElementById("wantCategory") as HTMLInputElement;
        const costElement = document.getElementById("wantCost") as HTMLInputElement;

        initiateAdd(thingElement.value, categoryElement.value, parseFloat(costElement.value));

        thingElement.value = "";
        categoryElement.value = "";
        costElement.value = "";
    };
    return (<div className="wantList">
        <h2 className="wantList__title">Things I want</h2>
        <ul className="wantList__list">
            { wants.map(want => <WantItem want={ want } key={ want.id } initiateDelete={ initiateDelete } />) }
        </ul>
        <div className="wantList__add">
            <input id="wantThing" className="wantList__add-thing" type="text"></input>
            <input id="wantCategory" className="wantList__add-category" type="text"></input>
            <input id="wantCost" className="wantList__add-cost" type="text"></input>
            <button className="wantList__add-button" onClick={ handleAddClick }>Add</button>
        </div>
    </div>);
};

export default Wants;
