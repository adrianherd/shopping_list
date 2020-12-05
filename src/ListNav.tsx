import React, { Component } from "react";

type ListNavProps = {
    onTabChange: (t: Tab) => void;
}

type ListNavState = {
    currentTab: Tab;
}

export enum Tab {
    Pending,
    Crossed
}

export class ListNav extends Component<ListNavProps, ListNavState> {
    constructor(props: ListNavProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = { currentTab: Tab.Pending };
    }

    handleClick(cur: Tab): void {
        if(cur != this.state.currentTab) {
            this.setState({currentTab: cur});
            this.props.onTabChange(cur)
        }
    }

    render() {
        return (
            <ul className="nav nav-tabs nav-justified">
                <li role="presentation" className="active">
                    <a href="#" onClick={() => this.handleClick(Tab.Pending)}>Pending</a>
                </li>
                <li role="presentation">
                    <a href="#" onClick={() => this.handleClick(Tab.Crossed)}>Crossed Off</a>
                </li>
            </ul>
        )
    }
}