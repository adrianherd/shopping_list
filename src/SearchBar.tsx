import React, { Component, ChangeEvent } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

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
            <div className={"d-flex justify-content-center my-2"}>
                <input value={userText}
                       type={"text"}
                       onChange={this.handleChange}
                       placeholder={"Search..."} />
                <button onClick={this.handleCreate} className={"btn btn-success ml-2"}>
                    <FontAwesomeIcon icon={faPlus}/>&nbsp;
                    Create
                </button>
            </div>
        )
    }
}