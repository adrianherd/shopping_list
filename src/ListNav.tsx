import React, { Component } from "react";

type ListNavProps = {
    onTabClick: (t: Tab) => void;
}

export enum Tab {
    Pending,
    Crossed
}

export class ListNav extends Component<ListNavProps> {
    constructor(props: ListNavProps) {
        super(props);
    }

    render() {
        return (
            <ul className="nav nav-tabs nav-justified">
                <li role="presentation" className="active">
                    <a href="#" onClick={() => this.props.onTabClick(Tab.Pending)}>Pending</a>
                </li>
                <li role="presentation">
                    <a href="#" onClick={() => this.props.onTabClick(Tab.Crossed)}>Crossed Off</a>
                </li>
            </ul>
        )
    }
}