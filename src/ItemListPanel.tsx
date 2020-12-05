import React from "react";
import { Item as ListItem, ItemProps as Item } from "./Item";
import { SearchBar } from "./SearchBar";

type ItemListPanelState = {
    items: Item[];
    categories: string[];
    subtotal: number;
    display: ListType;
}

enum ListType {
    Pending,
    CrossedOff
}

export class ItemListPanel extends React.Component<void> {
    constructor(props: void) {
        super(props);
    }

    onCreate(){

    }


    render() {
        return (
            <div>

            </div>
        );
    }
}