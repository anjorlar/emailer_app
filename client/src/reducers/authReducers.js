export default function (state = {}, action) {
    console.log('actions >>>>>>>', action);
    switch (action.type) {
        default:
            return state;
    };
};