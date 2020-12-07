import React, { Component } from 'react';
import { SearchBar } from "./SearchBar";
import { ListPanel } from "./ListPanel";
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
        this.handleItemToggle = this.handleItemToggle.bind(this);
        this.handleItemUpdate = this.handleItemUpdate.bind(this);
    }

    handleTextChange(newText: string) {
        this.setState({ userText: newText });
    }

    handleTextCreate(newText: string) {
        let pendingItems: Item[] = [...this.state.pendingItems, { id: uuid(), text: newText }];
        pendingItems.sort(ascCompare);
        this.setState({ pendingItems, userText: "" });
    }

    handleItemToggle(id: string) {
        let pendingItems: Item[] = [];
        let crossedItems: Item[] = [];

        this.state.pendingItems.forEach((item) => {
           if(item.id !== id) {
               pendingItems.push(item);
           } else {
               crossedItems.push(item);
           }
        });
        this.state.crossedItems.forEach((item) => {
            if(item.id !== id) {
                crossedItems.push(item);
            } else {
                pendingItems.push(item);
            }
        });

        pendingItems.sort(ascCompare)
        crossedItems.sort(ascCompare)

        this.setState({ pendingItems, crossedItems });
    }

    handleItemUpdate(item: Item) {
        const items: Item[] = [item];
        const pending: boolean = this.state.pendingItems.findIndex(i => i.id === item.id) >= 0;
        if(pending) {
            this.state.pendingItems.forEach(i => {
                if(i.id !== item.id){
                    items.push(i);
                }
            });
            items.sort(ascCompare);
            this.setState(prev => ({ pendingItems: items }))
        } else {
            this.state.crossedItems.forEach(i => {
                if(i.id !== item.id){
                    items.push(i);
                }
            });
            items.sort(ascCompare);
            this.setState(prev => ({ crossedItems: items }));
        }
    }

    render() {
        return (
            <div className="App">
                <h1>Shopping List</h1>
                <SearchBar text={this.state.userText}
                           onTextChange={this.handleTextChange}
                           onTextCreate={this.handleTextCreate} />
                <ListPanel pendingItems={this.state.pendingItems.filter(item => item.text.includes(this.state.userText))}
                           crossedItems={this.state.crossedItems.filter(item => item.text.includes(this.state.userText))}
                           toggleItemStatus={this.handleItemToggle}
                           itemUpdate={this.handleItemUpdate}
                />
            </div>
        );
    }
}

const ascCompare: (t1: Item, t2: Item) => number = (t1, t2) => {
    return t1.text.localeCompare(t2.text)
};

export default App;