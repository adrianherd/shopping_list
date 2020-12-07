import React, { Component } from "react";
import { ListItem } from "./ListItem";
import { Item } from "./Item"
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab"
const { v4: uuid } = require('uuid');

type ListPanelProps = {
    pendingItems: Item[];
    crossedItems: Item[];
    toggleItemStatus: (id: string) => void;
    itemUpdate: (item: Item) => void;
}

export class ListPanel extends Component<ListPanelProps> {
    summation(): number {
        let sum: number = 0;
        this.props.pendingItems.forEach(item => {
            const total = (item.price ?? 0) * (item.quantity ?? 1);
            sum += total
        });
        return sum;
    }

    render() {
        let subtotalEl = null;
        const showSubtotal: boolean = !!this.props.pendingItems.find(item => item.price != null)
        subtotalEl = showSubtotal ? <div>Subtotal: ${ this.summation()}</div> : null;

        let categories: Item[][] = [];
        let cats = this.props.pendingItems.map(item => item.category).filter(category => category).sort();
        // items should be sorted, therefore, category filter should respect sorting
        cats.forEach(cat => categories.push(this.props.pendingItems.filter(item => item.category === cat)));
        let catListEl = <CategoryLists categories={categories}
                                   toggleItemStatus={this.props.toggleItemStatus}
                                   itemUpdate={this.props.itemUpdate} />

        return (
            <Tabs id={"ListTabs"} defaultActiveKey={"pending"} className={["nav-fill"]}>
                <Tab title={"Pending"} eventKey={"pending"}>
                    <Card>
                        { subtotalEl }
                        { catListEl }
                        {this.props.pendingItems.filter(item => !item.category).map((item) => {
                            return <ListItem key={item.id}
                                             item={item}
                                             toggleItemStatus={this.props.toggleItemStatus}
                                             itemChange={this.props.itemUpdate}
                            />
                        })}
                    </Card>
                </Tab>
                <Tab title={"Crossed Off"} eventKey={"crossed"} >
                    <Card>
                        {this.props.crossedItems.map((item) => {
                            return <ListItem key={item.id}
                                             item={item}
                                             toggleItemStatus={this.props.toggleItemStatus}
                                             itemChange={this.props.itemUpdate}
                            />
                        })}
                    </Card>
                </Tab>
            </Tabs>
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
            return <Category
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
