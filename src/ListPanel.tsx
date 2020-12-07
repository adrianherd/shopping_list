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
            .map( item => item?.category ?? "")
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
        let sum: number = 0;
        this.props.pendingItems.forEach(item => {
            const total = (item.price ?? 0) * (item.quantity ?? 1);
            sum += total
        });
        return sum;
    }

    render() {
        let items: Item[] = this.props.crossedItems;
        let subtotalEl = null;
        const showSubtotal: boolean = !!this.props.pendingItems.find(item => item.price != null)
        if(this.state.display === Tab.Pending){
            items = this.props.pendingItems;
            subtotalEl = showSubtotal ? <div>Subtotal: ${ this.summation()}</div> : null;
        }

        let categories: Item[][] = [];
        this.state.categories?.forEach(cat => {
            // pendingItems should be sorted, therefore, category filter should respect sorting
            categories.push(this.props.pendingItems.filter(item => item.category === cat));
        })
        categories.sort(ascCompare);

        return (
            <div className={"card"}>
                <ListNav onTabChange={ this.handleTabChange } />
                { subtotalEl }
                {items.filter(item => !item.category).map((item) => {
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

const ascCompare: (t1: Item[], t2: Item[]) => number = (t1, t2) => {
    return t1[0].text.localeCompare(t2[0].text)
};
