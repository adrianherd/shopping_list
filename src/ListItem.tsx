import React, { Component } from "react";
import { Item } from "./Item"

type ItemProps = {
    data: Item;
    toggleItemStatus: (id: string) => void;
}

export class ListItem extends Component<ItemProps> {
    constructor(props: ItemProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.toggleItemStatus(this.props.data.id);
    }

    render() {
        return (
            <div className={"card"} onClick={this.handleClick}>
                <p>{this.props.data.text}</p>
                <Quantity q={this.props.data.quantity} />
                <Price p={this.props.data.price} />
            </div>
        )
    }
}

function Quantity(props: {q?: number}) {
    if(props.q){
       return <p>Quantity: {props.q}</p>
    }
    return null;
}

function Price(props: {p?: number}) {
    if(props.p){
        return <p>Price: {props.p}</p>
    }
    return null
}