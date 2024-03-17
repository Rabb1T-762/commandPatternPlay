// Command Stack class
// takes in an inital state 
// Will call execute on the command passed in and store the result
// Then it adds the command onto the stack
class CommandStack {
    #stack = [];
    #state;

    constructor(initialState = 0) {
        this.#state = initialState;
    }

    get state() {
        return this.#state;
    }

    execute(command) {
        this.#state = command.execute(this.#state);
        this.#stack.push(command);
    }

    undo() {
        // Will always undo the most recent command executed
        const command = this.#stack.pop()

        // Guard in case stack is empty
        if (command) {
            this.#state = command.undo(this.#state);
        }
    }
};

// Abstract Class to define command functions
class Command {

    execute(state) {
        throw new Error("implement in derived class");
    }

    undo(state) {
        throw new Error("implement in derived class");
    }

}

// Concrete Command Class
class AddOne extends Command {

    execute(state) {
        return Number(state) + 1;
    }

    undo(state) {
        return Number(state) - 1;
    }
}


class SubtractOne extends Command {

    execute(state) {
        return Number(state) - 1;
    }

    undo(state) {
        return Number(state) + 1;
    }
}

class SetState extends Command {
    #originalState;
    #value;

    constructor(state) {
        super();
        this.#value = state;
    }

    execute(state) {
        this.#originalState = state;
        return this.#value;
    }

    undo(state) {
        return this.#originalState;
    }
}

const stack = new CommandStack();
console.log(stack.state);


const testCommand = new AddOne();
stack.execute(testCommand);
console.log(stack.state);
stack.undo();
console.log(stack.state);

const minusOne = new SubtractOne();
stack.execute(minusOne);
console.log(stack.state);
stack.undo();
console.log(stack.state);

const setState = new SetState(69);
stack.execute(setState);
console.log(stack.state);
stack.undo();
console.log(stack.state);
