import { proc } from './proc.js';
import { history } from './history.js';

/**
 * The console element, on which the text is displayed.
 */
const _CLI = document.getElementById('cli');

/**
 * Disables the former input and creates a new one.
 */
function _newInput() {
    const currentInput = document.querySelector('.current');
    if (currentInput) {
        document.querySelector('.current input').setAttribute('disabled', true);
        currentInput.classList.remove('current');
    }
    const newInput = document.createElement('div');
    newInput.classList.add('cli-input', 'current');
    newInput.innerHTML += `<span class="cli-primary">></span><input type="text">`;
    _CLI.appendChild(newInput);
    newInput.querySelector('input').focus();
}

/**
 * Adds a new output to the CLI.
 * @param {string} content The content to add.
 */
function _newOutput(content) {
    const newOutput = document.createElement('div');
    newOutput.classList.add('cli-output');
    newOutput.innerHTML = content;
    _CLI.appendChild(newOutput);
}

/**
 * Executes the process requested by the user's entry.
 * @param {string} cmd The command to execute. 
 */
function _process(cmd) {
    if (cmd !== '') {
        history.store(cmd); // Stores the command in history.
        proc[cmd] ? proc[cmd]() : proc['error'](); // The output is the process called if exists, else error process.
    }
}

/**
 * Calls the history and replace the content of the current line by the former executed command.
 * Can be used multiple times.
 */
function _up() {
    if (history.previous()) { // Returns false if we already are at the first command.
        _CLI.querySelector('.current input').value = history.current(); // Replace the current line content by the former value.
    }
}

function _down() {
    if (history.next()) { // Returns false if we already are at the last command.
        _CLI.querySelector('.current input').value = history.current();
    }
}

/* === EXPORT === */

export const cli = {
    CLI             : _CLI,
    newInput        : _newInput,
    newOutput       : _newOutput,
    process         : _process,
    up              : _up,
    down            : _down
};