import React, { Component } from 'react';
import { SearchBar } from "./SearchBar";
import { ItemListPanel } from "./ItemListPanel";
import {ItemProps as Item} from "./Item";

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
            categories: []
        }
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleTextChange(newText: string){
        this.setState({ userText: newText });
    }

    handleTextCreate(newText: string){
        // how the heck do I stay immutable ?
        // TODO: clone array? deep copy?
        //this.setState()
    }

    render() {
        return (
            <div className="App">
                <h1>Shopping List</h1>
                <SearchBar text={} onTextChange={} onTextCreate={} />
                <ItemListPanel pendingItems={} crossedItems={} categories={} />
            </div>
        );
    }
}

export default App;
