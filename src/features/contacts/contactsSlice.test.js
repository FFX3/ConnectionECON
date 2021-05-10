import react from 'react'
import {render as rtlRender } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider} from 'react-redux'

import reducer, { addContact, selectContacts } from './contactsSlice'

/* creating mock react component */
const render = (
    ui,
    {
        initialState,
        store = createStore(reducer, initialState),
        ...renderOptions
    } = {},
) => {
    const Wrapper = ({children}) => {
        return (
            <div>
                <Provider store={store}>{children}</Provider>
            </div>
        )
    }
    return rtlRender(ui, {wrapper: Wrapper, ...renderOptions})
}

describe('contacts slice', () => {
    describe('reducer, actions and selectors', () => {
        it('should return the initial state on first run', () => {
            //Arrange
            //Act
            const result = reducer(undefined, {})
            //Assert
            expect(result).toEqual({
                "value": [],
            })
        })
        describe('addContact action & selectContacts selector', () => {
            it('should increase selectContacts.lenght by 1 when addContact is called', () => {
                //Arrange
                //Act
                //Assert
            })
            it('should add the new contact to the end of the array', () => {
                //Arrange
                //Act
                //Assert
            })
        })
    })
})