import React, { Component, ChangeEvent } from "react";

type SearchBarProps = {
    text: string;
    onTextChange: (t: string) => void;
    onTextCreate: (t: string) => void;
}

export class SearchBar extends Component<SearchBarProps> {
    handleChange(event: ChangeEvent<HTMLInputElement>): void {
        this.props.onTextChange(event.target.value);
    }

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