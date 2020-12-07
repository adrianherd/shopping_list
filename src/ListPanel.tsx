import React, { Component } from "react";
import { ListItem } from "./ListItem";
import { ListNav, Tab } from "./ListNav";
import { Item } from "./Item"

type ListPanelProps = {
    pendingItems: Item[];
    crossedItems: Item[];
    toggleItemStatus: (id: string) => void;
    itemUpdate: (item: Item) => void;
}

type ListPanelState = {
    display: Tab;
    subTotal?: number;
    categories?: string[];
}

export class ListPanel extends Component<ListPanelProps, ListPanelState> {
    constructor(props: ListPanelProps) {
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
                    return <ListItem key={item.id}
                                     item={item}
                                     toggleItemStatus={this.props.toggleItemStatus}
                                     itemChange={this.props.itemUpdate}
                    />
                })}
            </div>
        );
    }
}
