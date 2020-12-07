import React, { Component } from "react";
import { ListItem } from "./ListItem";
import { ListNav, Tab } from "./ListNav";
import { Item } from "./Item"
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
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
                { catListEl }F
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
    <Accordion defaultActiveKey="0">
        {props.categories.map(items => {
            return <Category key={uuid()}
                             items={items}
                             itemUpdate={props.itemUpdate}
                             toggleItemStatus={props.toggleItemStatus} />
        })}
    </Accordion>
    )
}

type CategoryProps = {
    items: Item[];
    toggleItemStatus: (id: string) => void;
    itemUpdate: (item: Item) => void;
}
function Category(props: CategoryProps) {
    return (
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    {props.items[0].category}
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
                <Card.Body>
                    {props.items.map((item) => {
                        return <ListItem key={item.id}
                                         item={item}
                                         toggleItemStatus={props.toggleItemStatus}
                                         itemChange={props.itemUpdate} />
                    })}
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}
