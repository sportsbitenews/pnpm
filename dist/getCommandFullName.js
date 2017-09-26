"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCommandFullName(cmd) {
    switch (cmd) {
        case 'add':
        case 'install':
        case 'i':
            return 'install';
        case 'uninstall':
        case 'r':
        case 'rm':
        case 'un':
        case 'unlink':
            return 'uninstall';
        case 'link':
        case 'ln':
            return 'link';
        case 'install-test':
        case 'it':
            return 'install-test';
        case 'update':
        case 'up':
        case 'upgrade':
            return 'update';
        case 'list':
        case 'ls':
        case 'll':
        case 'la':
            return 'list';
        // some commands have no aliases: publish, prune
        default:
            return cmd;
    }
}
exports.default = getCommandFullName;
//# sourceMappingURL=getCommandFullName.js.map