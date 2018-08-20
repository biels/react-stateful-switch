import React from "react";
import renderer from 'react-test-renderer';
import Switch from "./Switch";
import { shallow } from 'enzyme'

describe('Switch', () => {
    it('renders nothing by default', () => {
        const component = shallow(
            <Switch/>
        )
        expect(component.html()).toMatch('')
    })
    const C1 = (props) => <div>C1</div>
    const C2 = (props) => <div>C2</div>
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

})
