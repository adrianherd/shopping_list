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

    summation(): number {
        if(this.props.pendingItems.length > 0) {
            let sum: number = 0;
            this.props.pendingItems.forEach(item => {
                sum += item?.price || 0;
            });
            return sum;
        }
        return 0;
    }

    render() {
        let subtotalEl = null;
        let items: Item[] = this.props.crossedItems;

        if(this.state.display === Tab.Pending){
            subtotalEl = (
                <div>Subtotal: ${ this.state.subTotal }</div>
            )
            items = this.props.pendingItems;
        }
        return (
            <div className={"card"}>
                <ListNav onTabChange={ this.handleTabChange } />
                { subtotalEl }
                {items.map((item) => {
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
