import { createSlice } from "@reduxjs/toolkit";
 
const balanceSlice = createSlice({
    name: "current_balance",
    initialState: {
        current_balance: null,
    },
    reducers: {
        setBalance: (state, action) => {
            state.user = action.payload
        }
    }
})

//action creators
export const { setBalance } = balanceSlice.actions


//selectors
export const selectBalance = mainState => mainState.current_balance?.current_balance
 
export default balanceSlice.reducer