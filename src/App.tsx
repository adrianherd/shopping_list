import React, { Component } from 'react';
import { SearchBar } from "./SearchBar";
import { ItemListPanel } from "./ItemListPanel";
import { ItemProps as Item } from "./Item";

type AppState = {
    userText: string;
    pendingItems: Item[];
    crossedItems: Item[];
    categories: string[];
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
    }

    handleTextChange(newText: string) {
        this.setState({ userText: newText });
    }

    handleTextCreate(newText: string) {
        // how the heck do I stay immutable ?
        // TODO: clone array? deep copy?
        //this.setState()
    }

    render() {
        return (
            <div className="App">
                <h1>Shopping List</h1>
                <SearchBar text={this.state.userText}
                           onTextChange={this.handleTextChange}
                           onTextCreate={this.handleTextCreate} />
                <ItemListPanel pendingItems={this.state.pendingItems}
                               crossedItems={this.state.crossedItems}
                               categories={} />
            </div>
        );
    }
}

export default App;
