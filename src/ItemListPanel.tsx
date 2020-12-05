import React from "react";
import { Item } from "./Item";
import { SearchBar } from "./SearchBar";

type ItemListPanelState = {
    items: Item[];
    categories: string[];
    subtotal: number;
}

type Item = {
    text: string;
    quantity?: number;
    price?: number;
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