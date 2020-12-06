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

    handleChange(event: ChangeEvent<HTMLInputElement>): void {
        this.props.onTextChange(event.target.value);
    }

    handleCreate(userText: string): void {
        this.props.onTextCreate(userText);
    }

    render() {
        const userText = this.props.text;
        return (
            <div>
                <input value={userText} onChange={this.handleChange}/>
                <button onClick={() => this.handleCreate(userText)}>Create</button>
            </div>
        )
    }
}