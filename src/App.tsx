import React, { Component } from 'react';
import { SearchBar } from "./SearchBar";
import { ItemListPanel } from "./ItemListPanel";
import { Item } from "./Item";
const { v4: uuid } = require('uuid');

type AppState = {
    userText: string;
    pendingItems: Item[];
    crossedItems: Item[];
}

class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            userText: "",
            pendingItems: [],
            crossedItems: [],
        }
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleTextCreate = this.handleTextCreate.bind(this);
    }

    handleTextChange(newText: string) {
        this.setState({ userText: newText });
    }

    handleTextCreate(newText: string) {
        let pendingItems: Item[] = [...this.state.pendingItems, { id: uuid(), text: newText }];
        this.setState({ pendingItems });
    }

    handleItemToggle(id: string) {
        if(this.state.)
    }

    render() {
        return (
            <div className="App">
                <h1>Shopping List</h1>
                <SearchBar text={this.state.userText}
                           onTextChange={this.handleTextChange}
                           onTextCreate={this.handleTextCreate} />
                <ItemListPanel pendingItems={this.state.pendingItems}
                               crossedItems={this.state.crossedItems} />
            </div>
        );
    }
}

export default App;
