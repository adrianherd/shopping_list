import React, { ChangeEvent } from "react";

type SearchBarProps = {
    text: string;
    onTextChange: (t: string) => void;
    onTextCreate: () => void;
}

export class SearchBar extends React.Component<SearchBarProps> {
    constructor(props: SearchBarProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    handleChange(event: ChangeEvent<HTMLInputElement>): void {
        this.props.onTextChange(event.target.value);
    }

    handleCreate(): void {
        this.props.onTextCreate();
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