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
    short: boolean
    maxHidden?: number
}

class Switch extends PureComponent<SwitchProps> {
    static defaultProps: Partial<SwitchProps> = {
        selected: null,
        maxHidden: null
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
    displayHistory = [this.props.selected]
    componentDidMount(){
        // console.log(`Adding ${this.props.selected} to history`);
        // this.displayHistory.push(this.props.selected)

    }

    // getSnapshotBeforeUpdate(prevProps: SwitchProps, prevState) {
    //     console.log(`Adding ${prevProps.selected} to history`);
    //     this.displayHistory.push(prevProps.selected)
    // }

    render() {
        let views = this.getViews();
        let selectedIndexes = this.getSelectedIndexes();
        let cachedIndexes = this.props.maxHidden != null ?
            _.slice(_.reverse(_.uniq(_.reverse(_.flatten(this.displayHistory)))), -1 * this.props.maxHidden) :
            _.range(views.length);
        if(this.props.maxHidden === 0) cachedIndexes = []
        // const renderedIndexes = _.uniq(_.flatten(cachedIndexes.concat(selectedIndexes)))
        // console.log(`$(Sel: ${selectedIndexes} / Cached: ${cachedIndexes}), Hist: ${this.displayHistory}`);
        let renderedViews = _.range(views.length).map((index) => {
            const view = views[index]
            let selectedIndexes = this.getSelectedIndexes();

            const selected = _.some(selectedIndexes, (selectedIndex) => index === selectedIndex)
            if(!selected && !cachedIndexes.includes(index)) {
                return null;
            }
            const display = selected ? 'contents' : 'none';
            const View: any = view;
            const specificProps = this.props.props
            return <div key={index} style={{display}}>
                {view}
            </div>;
        }).filter(rv => rv != null);
        if (renderedViews === []) return null;

        if(this.props.selected !=  null && this.props.selected != _.last(this.displayHistory))this.displayHistory.push(this.props.selected)

        return <React.Fragment>
            {renderedViews}
        </React.Fragment>
    }
}

export default Switch;
