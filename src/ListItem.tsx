import React, {ChangeEvent, Component} from "react";
import { Item } from "./Item"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import Card from "react-bootstrap/Card";
import styled from "styled-components";

const StyledDiv = styled.div`
  width: 100px;
`

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
            [name]: value === ""
                ? null
                : name === "category" ? value : +value
        });
    }

    render() {
        return (
            <Card className={"mx-1 my-2"}>
                <div className={"d-flex justify-content-start my-2 mx-1"}>
                    <div className={"d-flex align-self-start"}>
                        <button onClick={this.handleToggleCheck}>
                            {this.state.editable
                                ? <FontAwesomeIcon icon={faCheckSquare}/>
                                : <FontAwesomeIcon icon={faSquare}/>
                            }
                        </button>
                    </div>
                    <div className={"flex-grow-1"} onClick={this.handleClick}>
                        <div className={"row mx-2"}>
                            <div className={this.state.price ? "col-9 col-m-10" : "col-12"}>
                                {this.state.quantity == null ? null :
                                <span className={"font-weight-bold"}>
                                    ({this.state.quantity})&nbsp;
                                </span>}
                                {this.props.item.text}
                            </div>
                            {!this.state.price ? null :
                                <div className={"col-3 col-md-2 text-center font-weight-bold"}>
                                    ${(this.state.price ?? 0) * (this.state.quantity ?? 1)}
                                </div>}
                        </div>
                    </div>
                </div>
                {!this.state.editable ? null :
                <div className={"row mx-1 my-1"}>
                    <div className={"col-md-4 col-sm-12 pl-md-0 mb-2"}>
                        <Price p={this.state.price}
                               onItemUpdate={this.handleItemUpdate}/>
                    </div>
                    <div className={"col-md-4 col-sm-12 mb-2"}>
                        <Quantity q={this.state.quantity}
                                  onItemUpdate={this.handleItemUpdate} />
                    </div>
                    <div className={"col-md-4 col-sm-12 pr-md-0 mb-2"}>
                        <Category c={this.state.category}
                                  onItemUpdate={this.handleItemUpdate}/>
                    </div>
                </div>}
            </Card>
        )
    }
}

// Shared across below components
interface metadata {
    onItemUpdate: (e: ChangeEvent<HTMLInputElement>) => void;
}
const StyledPrepend = styled.div`
  width: 100px;
`

function Quantity(props: {q?: number} & metadata) {
    return (
        <div className="input-group">
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
                   placeholder="1"
                   aria-label="1"
                   aria-describedby="quantity-addon"
                   type="number"/>
        </div>
    )
}

function Price(props: {p?: number} & metadata) {
    return (
        <div className="input-group">
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
                   type="number"/>
        </div>
    )
}

function Category(props: {c?: string} & metadata) {
    return (
        <div className="input-group">
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
                   placeholder="Condiments"
                   aria-label="Condiments"
                   aria-describedby="category-addon"
                   type="text"/>
        </div>
    );
}
