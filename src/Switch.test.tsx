import React from "react";
import renderer from 'react-test-renderer';
import Switch from "./Switch";
import {shallow, ShallowWrapper} from 'enzyme'

describe('Switch', () => {
    it('renders nothing by default', () => {
        const component = shallow(
            <Switch/>
        )
        expect(component.html()).toMatch('')
    })
    const C1 = (props) => <div>C1</div>
    const C2 = (props) => <div>C2</div>
    const C3 = (props) => <div>C3</div>
    it('renders all hidden when none is selected', () => {
        const component = shallow(
            <Switch views={[<C1/>, <C2/>]}/>
        )
        expect(component.html()).toEqual('<div style="display:none"><div>C1</div></div><div style="display:none"><div>C2</div></div>')
    })
    it('shows first when first is selected without array', () => {
        const component = shallow(
            <Switch views={[<C1/>, <C2/>]} selected={0}/>
        )
        expect(component.html()).toEqual('<div style="display:contents"><div>C1</div></div><div style="display:none"><div>C2</div></div>')
    })
    it('shows multiple when multiple are selected', () => {
        const component = shallow(
            <Switch views={[<C1/>, <C2/>]} selected={[0,1]}/>
        )
        expect(component.html()).toEqual('<div style="display:contents"><div>C1</div></div><div style="display:contents"><div>C2</div></div>')
    })
    it("doesn't crash when an index is out of bounds", () => {
        const component = shallow(
            <Switch views={[<C1/>, <C2/>]} selected={[0,1,2]}/>
        )
        expect(component.html()).toEqual('<div style="display:contents"><div>C1</div></div><div style="display:contents"><div>C2</div></div>')
    })
    it('works using children', () => {
        const component = shallow(
            <Switch selected={[1]}>
                <C1/>
                <C2/>
            </Switch>
        )
        expect(component.html()).toEqual('<div style="display:none"><div>C1</div></div><div style="display:contents"><div>C2</div></div>')
    })
    it('action sequence switching to maxHidden', () => {
        const component: ShallowWrapper<Switch["props"], Switch["state"], Switch> = shallow(
            <Switch views={[<C1/>, <C2/>]}/>
        )
        expect(component.html()).toEqual('<div style="display:none"><div>C1</div></div><div style="display:none"><div>C2</div></div>')
        component.setProps({...component.props(), selected: 1})
        expect(component.html()).toEqual('<div style="display:none"><div>C1</div></div><div style="display:contents"><div>C2</div></div>')
        component.setProps({...component.props(), selected: 0})
        expect(component.html()).toEqual('<div style="display:contents"><div>C1</div></div><div style="display:none"><div>C2</div></div>')
        component.setProps({...component.props(), selected: 0, maxHidden: 0})
        expect(component.html()).toEqual('<div style="display:contents"><div>C1</div></div>')
    })
    it('action sequence using maxHidden 1', () => {
        // C1 [C2] C3
        const component: ShallowWrapper<Switch["props"], Switch["state"], Switch> = shallow(
            <Switch views={[<C1/>, <C2/>, <C3/>]} selected={1} maxHidden={1}/>
        )
        expect(component.html()).toEqual('<div style="display:contents"><div>C2</div></div>');

        // C1 (C2) [C3]
        component.setProps({...component.props(), selected: 2});
        expect(component.html()).toEqual('<div style="display:none"><div>C2</div></div><div style="display:contents"><div>C3</div></div>');

        // C1 [C2] (C3)
        component.setProps({...component.props(), selected: 1});
        expect(component.html()).toEqual('<div style="display:contents"><div>C2</div></div><div style="display:none"><div>C3</div></div>');

        // [C1] (C2) C3
        component.setProps({...component.props(), selected: 0});
        expect(component.html()).toEqual('<div style="display:contents"><div>C1</div></div><div style="display:none"><div>C2</div></div>');


    })
    it('action sequence using maxHidden 2', () => {
        // C1 [C2] C3
        const component: ShallowWrapper<Switch["props"], Switch["state"], Switch> = shallow(
            <Switch views={[<C1/>, <C2/>, <C3/>]} selected={1} maxHidden={2}/>
        )
        expect(component.html()).toEqual('<div style="display:contents"><div>C2</div></div>');

        // C1 (C2) [C3]
        component.setProps({...component.props(), selected: 2});
        expect(component.html()).toEqual('<div style="display:none"><div>C2</div></div><div style="display:contents"><div>C3</div></div>');

        // [C1] (C2) (C3)
        component.setProps({...component.props(), selected: 0});
        expect(component.html()).toEqual('<div style="display:contents"><div>C1</div></div><div style="display:none"><div>C2</div></div><div style="display:none"><div>C3</div></div>');


    })
    it('same action sequence using maxHidden 3', () => {
        // C1 [C2] C3
        const component: ShallowWrapper<Switch["props"], Switch["state"], Switch> = shallow(
            <Switch views={[<C1/>, <C2/>, <C3/>]} selected={1} maxHidden={3}/>
        )
        expect(component.html()).toEqual('<div style="display:contents"><div>C2</div></div>');

        // C1 (C2) [C3]
        component.setProps({...component.props(), selected: 2});
        expect(component.html()).toEqual('<div style="display:none"><div>C2</div></div><div style="display:contents"><div>C3</div></div>');

        // [C1] (C2) (C3)
        component.setProps({...component.props(), selected: 0});
        expect(component.html()).toEqual('<div style="display:contents"><div>C1</div></div><div style="display:none"><div>C2</div></div><div style="display:none"><div>C3</div></div>');


    })
    it('action sequence using maxHidden 2 and prefetch', () => {
        // C1 [C2] C3
        const component: ShallowWrapper<Switch["props"], Switch["state"], Switch> = shallow(
            <Switch views={[<C1/>, <C2/>, <C3/>]} selected={1} maxHidden={2}/>
        )
        expect(component.html()).toEqual('<div style="display:contents"><div>C2</div></div>');

        // C1 (C2) [C3]
        component.setProps({...component.props(), selected: 2});
        expect(component.html()).toEqual('<div style="display:none"><div>C2</div></div><div style="display:contents"><div>C3</div></div>');

        // [C1] (C2) (C3)
        component.setProps({...component.props(), selected: 0});
        expect(component.html()).toEqual('<div style="display:contents"><div>C1</div></div><div style="display:none"><div>C2</div></div><div style="display:none"><div>C3</div></div>');


    })
})
