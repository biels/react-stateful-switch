import React from 'react';
import {ComponentType, PureComponent, ReactNode} from 'react';
import _ from "lodash";

export type View = ReactNode | Function

export interface ViewProps {

}

export interface SwitchProps {
    selected?: number | number[] | null
    views?: View[]
    props?: ViewProps | ViewProps[]
    children?: ReactNode
}

class Switch extends PureComponent<SwitchProps> {
    static defaultProps: Partial<SwitchProps> = {
        selected: null
    }
    getSelectedIndexes = () => {
        if (!_.isArray(this.props.selected)) {
            return [this.props.selected];
        }
        return this.props.selected;
    }
    getViews = (): View[] => {
        //Get views from props
        let views: any = this.props.views || this.props.children || [];
        if (!_.isArray(views)) views = [views]
        return views;
    }

    render() {
        let views = this.getViews();
        let renderedViews = views.map((view, index) => {
            const selected = _.some(this.getSelectedIndexes(), (selectedIndex) => index === selectedIndex)
            const display = selected ? 'contents' : 'none';
            const View: any = view;
            const specificProps = this.props.props
            return <div key={index} style={{display}}>
                {view}
            </div>;
        })
        if(renderedViews === []) return null;
        return <React.Fragment>
            {renderedViews}
        </React.Fragment>
    }
}

export default Switch;
