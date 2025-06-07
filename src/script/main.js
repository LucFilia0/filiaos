import { cli } from './inc/cli.js';

window.addEventListener('DOMContentLoaded', () => {

    cli.CLI.addEventListener('keyup', (e) => {
        switch (e.key) {
            case 'Enter':
                cli.process(e.target.value);
                cli.newInput();
                break;
            case 'ArrowUp':
                cli.up();
                break;
            case 'ArrowDown':
                cli.down();
                break;
        }
    });

    cli.newInput();

});