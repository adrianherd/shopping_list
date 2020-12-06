import React, {Component} from "react";
import {Item as ListItem, ItemProps as Item} from "./Item";
import {ListNav, Tab} from "./ListNav";

const { v4: uuid } = require('uuid');

type ItemListPanelProps = {
    pendingItems: Item[];
    crossedItems: Item[];
    categories: string[];
}

type ItemListPanelState = {
    display: Tab;
    subTotal?: number;
}

export class ItemListPanel extends Component<ItemListPanelProps, ItemListPanelState> {
    constructor(props: ItemListPanelProps) {
        super(props);
        this.state = {
            display: Tab.Pending,
            subTotal: this.summation(),
        }
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    handleTabChange(newTab: Tab) {
        this.setState({ display: newTab });
    }

    summation() {
        if(this.props.pendingItems.length > 0){
            let sum = 0;
            this.props.pendingItems.map(item => {
                sum += item?.price || 0;
            });
            return sum;
        }
    }

    render() {
        let subtotalEl = null;
        if(this.state.display == Tab.Pending){
            subtotalEl = (
                <div>Subtotal: ${ this.state.subTotal }</div>
            )
        }
        return (
            <div className={"card"}>
                <ListNav onTabChange={ this.handleTabChange } />
                { subtotalEl }
                {this.props.pendingItems.map((item) => {
                    return <ListItem key={uuid()} text={item.text} price={item.price} quantity={item.quantity}/>
                })}
            </div>
        );
    }
}
