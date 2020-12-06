import React, {ChangeEvent, Component} from "react";
import { Item } from "./Item"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'

type ItemProps = {
    item: Item;
    itemChange: (i: Item) => void;
    toggleItemStatus: (id: string) => void;
}
type ItemState = {
    editable: boolean;
}

export class ListItem extends Component<ItemProps, ItemState> {
    constructor(props: ItemProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleToggleCheck = this.handleToggleCheck.bind(this);
        this.handleItemUpdate = this.handleItemUpdate.bind(this);
        this.state = { editable: false };
    }

    handleClick() {
        if(!this.state.editable){
            this.props.toggleItemStatus(this.props.item.id);
        }
    }

    handleToggleCheck() {
        this.setState({editable: !this.state.editable});
    }

    handleItemUpdate(event: ChangeEvent<HTMLInputElement>) {
        let field: string = event.target.id;
        let item: Item = {...this.props.item};
        item[field] = event.target.value;

        this.props.itemChange(item);
    }

    render() {
        return (
            <div className={"card"}>
                <div>
                    <button onClick={this.handleToggleCheck}>
                        {this.state.editable
                            ? <FontAwesomeIcon icon={faCheckSquare}/>
                            : <FontAwesomeIcon icon={faSquare}/>
                        }
                    </button>
                </div>
                <div onClick={this.handleClick}>
                    <p>{this.props.item.text}</p>
                    <Quantity q={this.props.item.quantity}
                              editable={this.state.editable}
                              onItemUpdate={this.handleItemUpdate} />
                    <Price p={this.props.item.price}
                           editable={this.state.editable}
                           onItemUpdate={this.handleItemUpdate}/>
                    <Category c={this.props.item.category}
                              editable={this.state.editable}
                              onItemUpdate={this.handleItemUpdate}/>
                </div>
            </div>

        )
    }
}

interface metadata {
    editable: boolean;
    onItemUpdate: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Quantity(props: {q?: number} & metadata) {
    if(props.editable){
        return (
            <p>Quantity:
                <input id={"quantity"} value={props.q} onChange={props.onItemUpdate} />
            </p>
        )
    } else if(props.q) {
        return <p>Quantity: {props.q}</p>
    }
    return null;
}

function Price(props: {p?: number} & metadata) {
    if(props.editable){
        return (
            <p> Price:
                <input id={"price"} value={props.p} onChange={props.onItemUpdate} />
            </p>
        )
    } else if(props.p) {
        return <p>Price: {props.p}</p>
    }
    return null;
}

function Category(props: {c?: string} & metadata) {
    if(props.editable){
        return (
            <p> Category:
                <input id={"category"} value={props.c} onChange={props.onItemUpdate} />
            </p>
        )
    }
    return null;
}