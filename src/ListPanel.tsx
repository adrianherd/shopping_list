import React, { Component } from "react";
import { ListItem } from "./ListItem";
import { Item } from "./Item"
import Card from 'react-bootstrap/Card'
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab"
import Collapse from "react-bootstrap/Collapse";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-regular-svg-icons'
const { v4: uuid } = require('uuid');

type ListPanelProps = {
    pendingItems: Item[];
    crossedItems: Item[];
    toggleItemStatus: (id: string) => void;
    itemUpdate: (item: Item) => void;
}

/**
 * List panel is the host container for the different views (tabs) for items.
 * Pending, Crossed Off tabs.
 */
export class ListPanel extends Component<ListPanelProps> {
    /**
     * The total price of all pending items. Important to note that quantity is
     * multiplied with price in calculation!!!
     */
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

        // Each entry is a list of items per category found
        const categories: Item[][] = [];
        // create a SET (unique vals) of strings for categories
        const cats = this.props.pendingItems
            .map(item => item.category)
            .filter(category => category)
            .filter((cat, index, self) => self.indexOf(cat) === index)
            .sort();
        // items should be sorted, therefore, category filter should respect sorting
        cats.forEach(cat => categories.push(this.props.pendingItems.filter(item => item.category === cat)));

        return (
            <Tabs id={"ListTabs"} defaultActiveKey={"pending"} className={["nav-fill"]}>
                <Tab title={"Pending"} eventKey={"pending"}>
                        { subtotalEl }
                        {categories.map(items => {
                            return <Category key={uuid()}
                                             items={items}
                                             itemUpdate={this.props.itemUpdate}
                                             toggleItemStatus={this.props.toggleItemStatus} />
                        })}
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

type CategoryProps = {
    items: Item[];
    toggleItemStatus: (id: string) => void;
    itemUpdate: (item: Item) => void;
}
type CategoryState = {
    isOpen: boolean;
}
class Category extends Component<CategoryProps, CategoryState> {
    constructor(props: CategoryProps){
        super(props)
        this.state = { isOpen: true };
        this.onToggle = this.onToggle.bind(this)
    }

    onToggle() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render(){
        return (
            <Card className={"mt-1"}>
                <Card.Header onClick={this.onToggle} className={"d-flex justify-content-between"}>
                    <div>
                        {this.props.items[0].category}
                    </div>
                    <div>
                        {this.state.isOpen
                        ? <FontAwesomeIcon icon={faMinusSquare}/>
                        : <FontAwesomeIcon icon={faPlusSquare}/>}
                    </div>
                </Card.Header>
                <Collapse in={this.state.isOpen}>
                    {/* 1 child node with 0 padding and margin needed for smooth animation */}
                    <div>
                        <Card.Body>
                            {this.props.items.map((item) => {
                                return <ListItem key={item.id}
                                                 item={item}
                                                 toggleItemStatus={this.props.toggleItemStatus}
                                                 itemChange={this.props.itemUpdate} />
                            })}
                        </Card.Body>
                    </div>
                </Collapse>
            </Card>
        )
    }
}