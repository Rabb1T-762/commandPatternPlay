//Create Stack 
function createCommandStack(state) {
    const stack = [];
    const _state = state;

    const executeStateUpdate = function execute(command) {
        const [newState, undoFunction] = command(_state);
        _state = newState;
        stack.push(undoFunction);
        return _state;
    }

    const undoFunction = function undo(command) {
        const [newState, undoFunction] = command(_state);
        _state = newState
        stack.pop(command);
        return _state;
    }


    return [{newState, undoFunction}];

}

//Create Command

