import React, { Component } from "react";

type ListNavProps = {
    onTabClick: () => void;
}

export enum TabType {
    Pending,
    CrossedOff
}

export class ListNav extends Component {
    constructor(props) {
        super(props);
    }

    handleTabChange() {

    }

    render() {
        return (
            <ul className="nav nav-tabs nav-justified">
                <li role="presentation" className="active">
                    <a href="#">Pending</a>
                </li>
                <li role="presentation">
                    <a href="#">Progress</a>
                </li>
            </ul>
        )
    }
}