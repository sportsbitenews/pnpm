"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const supi_1 = require("supi");
exports.default = (input, opts) => {
    const cwd = opts && opts.prefix || process.cwd();
    // pnpm link
    if (!input || !input.length) {
        return supi_1.linkToGlobal(cwd, opts);
    }
    return input.reduce((previous, inp) => {
        // pnpm link ../foo
        if (inp[0].indexOf('.') === 0) {
            const linkFrom = path.join(cwd, inp);
            return previous.then(() => supi_1.link(linkFrom, cwd, opts));
        }
        // pnpm link foo
        return previous.then(() => supi_1.linkFromGlobal(inp, cwd, opts));
    }, Promise.resolve());
};
//# sourceMappingURL=link.js.map