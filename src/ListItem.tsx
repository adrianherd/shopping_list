import React, {ChangeEvent, Component} from "react";
import { Item } from "./Item"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'
import Card from "react-bootstrap/Card";
import { FormControl, InputGroup } from "react-bootstrap";
import styled from "styled-components";

type ItemProps = {
    item: Item;
    itemChange: (i: Item) => void;
    toggleItemStatus: (id: string) => void;
}
type ItemState = {
    editable: boolean;
    price?: number;
    quantity?: number;
    category?: string;
};

export class ListItem extends Component<ItemProps, ItemState> {
    constructor(props: ItemProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleToggleCheck = this.handleToggleCheck.bind(this);
        this.handleItemUpdate = this.handleItemUpdate.bind(this);
        this.state = {
            editable: false,
            price: props.item.price,
            quantity: props.item.quantity,
            category: props.item.category,
        };
    }

    /**
     * Sending item to "other" array status unless in edit mode.
     */
    handleClick() {
        if(!this.state.editable){
            this.props.toggleItemStatus(this.props.item.id);
        }
    }

    /**
     * Notify parent component if prop has finished editing and send the
     * desired item. Toggle edit mode.
     */
    handleToggleCheck() {
        if(this.state.editable){
            let item: Item = {...this.props.item};
            item.quantity = this.state.quantity;
            item.category = this.state.category;
            item.price = this.state.price;
            this.props.itemChange(item);
        }
        this.setState({editable: !this.state.editable});
    }

    /**
     * Update the state so that input from user works as expected
     * @param event changeEvent emitted by one of the input elements
     */
    handleItemUpdate(event: ChangeEvent<HTMLInputElement>) {
        let { name, value } = event.target;
        this.setState({
            ...this.state,
            [name]: value,
        });
    }

    render() {
        return (
            <Card>
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
                    <Quantity q={this.state.quantity}
                              editable={this.state.editable}
                              onItemUpdate={this.handleItemUpdate} />
                    <Price p={this.state.price}
                           editable={this.state.editable}
                           onItemUpdate={this.handleItemUpdate}/>
                    <Category c={this.state.category}
                              editable={this.state.editable}
                              onItemUpdate={this.handleItemUpdate}/>
                </div>
            </Card>
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
            <div className="input-group mb-3">
                <StyledPrepend className="input-group-prepend">
                    <span className="input-group-text w-100 justify-content-center"
                          id="quantity-addon">
                        Quantity
                    </span>
                </StyledPrepend>
                <input id="quantity"
                       name="quantity"
                       className="form-control"
                       value={props.q}
                       onChange={props.onItemUpdate}
                       placeholder="0"
                       aria-label="0"
                       aria-describedby="quantity-addon"
                       type="text"/>
            </div>
        )
    } else if(props.q) {
        return <p>Quantity: {props.q}</p>
    }
    return null;
}

const StyledPrepend = styled.span`
  width: 100px;
`
function Price(props: {p?: number} & metadata) {
    if(props.editable){
        return (
            <div className="input-group mb-3">
                <StyledPrepend className="input-group-prepend">
                    <span className="input-group-text w-100 justify-content-center" id="price-addon">
                        Price $
                    </span>
                </StyledPrepend>
                <input id="price"
                       name="price"
                       className="form-control"
                       value={props.p}
                       onChange={props.onItemUpdate}
                       placeholder="0.00"
                       aria-label="0.00"
                       aria-describedby="price-addon"
                       type="text"/>
            </div>
        )
    } else if(props.p) {
        return <p>Price: {props.p}</p>
    }
    return null;
}

function Category(props: {c?: string} & metadata) {
    if(props.editable){
        return (
            <div className="input-group mb-3">
                <StyledPrepend className="input-group-prepend">
                    <span className="input-group-text w-100 justify-content-center"
                          id="category-addon">
                        Category
                    </span>
                </StyledPrepend>
                <input id="category"
                       name="category"
                       className="form-control"
                       value={props.c}
                       onChange={props.onItemUpdate}
                       placeholder="Condiments, Dairy, etc."
                       aria-label="Condiments, Dairy, etc."
                       aria-describedby="category-addon"
                       type="text"/>
            </div>
        )
    }
    return null;
}

