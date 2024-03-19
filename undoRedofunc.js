//Create Stack 
function createCommandStack(state) {
    const stack = [];
    let _state = state;

    const executeStateUpdate = function execute(command) {
        const { newState, undoFunction } = command(_state);
        _state = newState;
        stack.push(undoFunction);

        console.log("No, Oni-san! Don't look at my stack!");
        console.log(stack);
        console.log("I'm in a state:");
        console.log(_state);

        return _state;
    }

    const undoFunction = function undo(command) {
        if (stack.length > 0) {
            const undoFunction = stack.pop();
            _state = undoFunction(_state);
            console.log("No, Oni-san! Don't look at my stack!");
            console.log(stack);
        console.log("I'm in a state:");
            console.log(_state);
        } else {
            console.log("No, Oni-san! My stack is empty I can't pop again!");
        }
    }

    return { executeStateUpdate, undoFunction };
}

function createIncrementCommand(state) {
    const newState = state + 1;

    const undoFunction = function undo(state) {
        return state - 1;
    }

    return { newState, undoFunction };
}

function createDecrementCommand(state) {
    const newState = state - 1;

    const undoFunction = function undo(state) {
        return state + 1;
    }

    return { newState, undoFunction };
}

const state = 0;
const commandStack = createCommandStack(state);
commandStack.executeStateUpdate(createIncrementCommand);
commandStack.undoFunction();
commandStack.executeStateUpdate(createDecrementCommand);
commandStack.undoFunction();
commandStack.undoFunction();


