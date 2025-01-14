const initialState = [
    {
        _id: '',
        category: '',  
        createAt: '',  
        amount: 0,      
    },
];


export const investmentReducer = (state = initialState, action) => {
    switch (action.type) 
    {
        default: return state;
    }
};
