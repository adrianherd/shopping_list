import React, { Component } from "react";
import { ListItem } from "./ListItem";
import { ListNav, Tab } from "./ListNav";
import { Item } from "./Item"
const { v4: uuid } = require('uuid');

type ListPanelProps = {
    pendingItems: Item[];
    crossedItems: Item[];
    toggleItemStatus: (id: string) => void;
    itemUpdate: (item: Item) => void;
}

type ListPanelState = {
    display: Tab;
}

export class ListPanel extends Component<ListPanelProps, ListPanelState> {
    constructor(props: ListPanelProps) {
        super(props);
        this.state = {
            display: Tab.Pending,
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
        let catListEl = null;

        if(this.state.display === Tab.Pending){
            items = this.props.pendingItems;

            const showSubtotal: boolean = !!this.props.pendingItems.find(item => item.price != null)
            subtotalEl = showSubtotal ? <div>Subtotal: ${ this.summation()}</div> : null;

            let categories: Item[][] = [];
            let cats = items.map( item => item?.category ?? "").filter(category => category).sort();
            // items should be sorted, therefore, category filter should respect sorting
            cats.forEach(cat => categories.push(items.filter(item => item.category === cat)))
            catListEl = <CategoryLists categories={categories}
                                       toggleItemStatus={this.props.toggleItemStatus}
                                       itemUpdate={this.props.itemUpdate} />
        }

        return (
            <div className={"card"}>
                <ListNav onTabChange={ this.handleTabChange } />
                { subtotalEl }
                { catListEl }
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

type CategoryListProps = {
    categories: Item[][];
    toggleItemStatus: (id: string) => void;
    itemUpdate: (item: Item) => void;
}

function CategoryLists(props: CategoryListProps) {
    return (
    <div id={"category-groups-accordion"}>
        {props.categories.map(items => {
            return <Category key={uuid()}
                             items={items}
                             itemUpdate={props.itemUpdate}
                             toggleItemStatus={props.toggleItemStatus} />
        })}
    </div>
    )
}

type CategoryProps = {
    items: Item[];
    toggleItemStatus: (id: string) => void;
    itemUpdate: (item: Item) => void;
}
function Category(props: CategoryProps) {
    const catId = uuid();
    return (
        <div className="card">
            <div className="card-header" id={`${catId}-header`}>
                <h5 className="mb-0">
                    <button className="btn btn-link"
                            data-toggle="collapse"
                            data-target={`${catId}-body`}
                            aria-expanded="true"
                            aria-controls={`${catId}-body`}>
                        {props.items[0].category}
                    </button>
                </h5>
            </div>
            <div id={`${catId}-body`}
                 className="collapse show"
                 aria-labelledby={`${catId}-header`}
                 data-parent="#category-groups-accordion">
                <div className="card-body">
                    {props.items.map((item) => {
                        return <ListItem key={item.id}
                                         item={item}
                                         toggleItemStatus={props.toggleItemStatus}
                                         itemChange={props.itemUpdate} />
                    })}
                </div>
            </div>
        </div>
    )
}
