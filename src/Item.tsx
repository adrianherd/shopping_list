import React, { Component } from "react";

export type ItemProps = {
    text: string;
    quantity?: number;
    price?: number;
}

export class Item extends Component<ItemProps> {
    constructor(props: ItemProps) {
        super(props);
    }

    render() {
        return (
            <div className={"card"}>
                <p>{this.props.text}</p>
                <Quantity q={this.props.quantity} />
                <Price p={this.props.price} />
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