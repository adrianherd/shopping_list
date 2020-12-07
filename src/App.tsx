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

/**
 * This app is basic shopping list per the requirements of Tom Woodward's project file.
 */
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

    /**
     * Update state with latest user input
     * @param newText the latest user input from search bar
     */
    handleTextChange(newText: string) {
        this.setState({ userText: newText });
    }

    /**
     * Create new item using the string text and clear search bar text
     * @param newText the search bar text when user hit create
     */
    handleTextCreate(newText: string) {
        let pendingItems: Item[] = [...this.state.pendingItems, { id: uuid(), text: newText }];
        pendingItems.sort(ascCompare);
        this.setState({ pendingItems, userText: "" });
    }

    /**
     * Clicked item will toggle its current status and therefore switch tabs.
     * Pending -> Cross or Crossed -> Pending
     * @param id the id field of the item that was clicked
     */
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

    /**
     * Update the appropriate state array with a new copy of the modified item.
     * @param item the item whose metadata was updated
     */
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

/**
 * An alphanumerical ascending order comparator for Items array by item text
 * @param t1 first Item
 * @param t2 second Item
 */
const ascCompare: (t1: Item, t2: Item) => number = (t1, t2) => {
    return t1.text.localeCompare(t2.text)
};

export default App;