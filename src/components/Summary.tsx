import React from "react";

import { Want } from "../types";
import { formatCurrency } from "../utils/formatter";

import "./Summary.scss";

type CategoryProps = {
    title: string;
    cost: number;
};

const Category: React.SFC<CategoryProps> = ({ title, cost }) => {
    return (
        <li className="summary__categories-item">
            <h4 className="summary__categories-item-title">{ title }</h4>
            <span>${ formatCurrency(cost) }</span>
        </li>
    );
};

type SummaryProps = {
    wants: Want[];
};

const Summary: React.SFC<SummaryProps> = ({ wants }) => {
    let total = 0;
    const categories: Record<string, number> = {};
    wants.forEach(want => {
        total += want.cost;
        if (!(want.category in categories)) {
            categories[want.category] = want.cost;
        } else {
            categories[want.category] += want.cost;
        }
    });

    return (
        <div className="summary">
            <h2 className="summary__title">Summary</h2>
            <div>
                <h3 className="summary__total">Total:</h3>
                <span className="summary__totalAmount">${ formatCurrency(total) }</span>
            </div>
            <div>
                <h3 className="summary__categories-title">Categories</h3>
                <ul className="summary__categories-list">
                    {
                        Object.keys(categories).map(category =>
                            <Category key={ category } title={ category } cost={ categories[category] } />)
                    }
                </ul>
            </div>
        </div>
    );
};

export default Summary;
