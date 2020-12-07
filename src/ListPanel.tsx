import React, { Component } from "react";
import { ListItem } from "./ListItem";
import { Item } from "./Item"
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab"

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
        const showSubtotal: boolean = !!this.props.pendingItems.find(item => item.price != null)
        const subtotalEl = showSubtotal ? <div>Subtotal: ${ this.summation()}</div> : null;

        const categories: Item[][] = [];
        // create a SET (unique vals) of strings for categories
        const cats = this.props.pendingItems
            .map(item => item.category)
            .filter(category => category)
            .filter((cat, index, self) => self.indexOf(cat) === index)
            .sort();
        // items should be sorted, therefore, category filter should respect sorting
        cats.forEach(cat => categories.push(this.props.pendingItems.filter(item => item.category === cat)));
        const catListEl = <CategoryLists categories={categories}
                                   toggleItemStatus={this.props.toggleItemStatus}
                                   itemUpdate={this.props.itemUpdate} />

        return (
            <Tabs id={"ListTabs"} defaultActiveKey={"pending"} className={["nav-fill"]}>
                <Tab title={"Pending"} eventKey={"pending"}>
                        { subtotalEl }
                        { catListEl }
                        {this.props.pendingItems.filter(item => !item.category).map((item) => {
                            return <ListItem key={item.id}
                                             item={item}
                                             toggleItemStatus={this.props.toggleItemStatus}
                                             itemChange={this.props.itemUpdate}
                            />
                        })}
                </Tab>
                <Tab title={"Crossed Off"} eventKey={"crossed"} >
                    {this.props.crossedItems.map((item) => {
                        return <ListItem key={item.id}
                                         item={item}
                                         toggleItemStatus={this.props.toggleItemStatus}
                                         itemChange={this.props.itemUpdate}
                        />
                    })}
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
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                {props.items[0].category}
            </Accordion.Toggle>
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
