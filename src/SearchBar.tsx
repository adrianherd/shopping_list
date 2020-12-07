import React, { Component, ChangeEvent } from "react";

type SearchBarProps = {
    text: string;
    onTextChange: (t: string) => void;
    onTextCreate: (t: string) => void;
}

export class SearchBar extends Component<SearchBarProps> {
    constructor(props: SearchBarProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    /**
     * Notify parent of new user input
     * @param event changeEvent emitted by search bar
     */
    handleChange(event: ChangeEvent<HTMLInputElement>): void {
        this.props.onTextChange(event.target?.value);
    }

    /**
     * Notify parent of intent to create new item using text currently in search bar
     */
    handleCreate(): void {
        this.props.onTextCreate(this.props.text);
    }

    render() {
        const userText = this.props.text;
        return (
            <div>
                <input value={userText} onChange={this.handleChange}/>
                <button onClick={this.handleCreate}>Create</button>
            </div>
        )
    }
}