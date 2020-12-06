import React, {Component} from "react";
import {Item as ListItem, ItemProps as Item} from "./Item";
import {ListNav, Tab} from "./ListNav";

const { v4: uuid } = require('uuid');

type ItemListPanelProps = {
    pendingItems: Item[];
    crossedItems: Item[];
}

type ItemListPanelState = {
    display: Tab;
    subTotal?: number;
    categories?: string[];
}

export class ItemListPanel extends Component<ItemListPanelProps, ItemListPanelState> {
    constructor(props: ItemListPanelProps) {
        super(props);
        let categories: string[] = props.pendingItems
            .map( item => item?.category || "")
            .filter(category => category);
        this.state = {
            display: Tab.Pending,
            subTotal: this.summation(),
            categories,
        }
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    handleTabChange(newTab: Tab) {
        this.setState({ display: newTab });
    }

    summation() {
        if(this.props.pendingItems.length > 0){
            let sum = 0;
            this.props.pendingItems.forEach(item => {
                sum += item?.price || 0;
            });
            return sum;
        }
    }

    render() {
        let subtotalEl = null;
        if(this.state.display === Tab.Pending){
            subtotalEl = (
                <div>Subtotal: ${ this.state.subTotal }</div>
            )
        }
        return (
            <div className={"card"}>
                <ListNav onTabChange={ this.handleTabChange } />
                { subtotalEl }
                {this.props.pendingItems.map((item) => {
                    return <ListItem key={uuid()}
                                     text={item.text}
                                     price={item.price}
                                     quantity={item.quantity}
                                     category={item.category} />
                })}
            </div>
        );
    }
}
