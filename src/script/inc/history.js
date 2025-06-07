const hist = [];

/**
 * Stores a command in the history.
 * 
 * @param {string} cmd The command you wich to store in history.
 */
function _store(cmd) {
    hist.push(cmd);
    history.cursor += 1;
    console.log(history.cursor); // TODO X
}

function _current() {
    let ret = null;
    if (history.cursor >= 0)
        ret = hist[history.cursor] ?? ''; // Returns empty string if we happen to ask for the last input.
    return ret;
}

function _previous() {
    let ret = false;
    if (history.cursor > 0) {
        history.cursor -= 1;
        ret = true;
    }
    return ret;
}

function _next() {
    let ret = false;
    if (history.cursor < hist.length) {
        history.cursor += 1;
        ret = true;
    }
    return ret;
}

/* === EXPORT === */

export const history = {
    cursor      : 0,
    store       : _store,
    current     : _current,
    previous    : _previous,
    next        : _next
};