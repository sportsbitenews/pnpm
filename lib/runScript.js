"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pnpm_logger_1 = require("pnpm-logger");
const path = require("path");
const byline = require("byline");
const spawn = require("cross-spawn");
const PATH = require("path-name");
const scriptLogger = pnpm_logger_1.default('run_script');
function runScript(command, args, opts) {
    opts = Object.assign({ log: (() => { }) }, opts);
    args = args || [];
    const log = opts.log;
    const script = `${command}${args.length ? ' ' + args.join(' ') : ''}`;
    if (script)
        scriptLogger.debug('runscript', script);
    if (!command)
        return Promise.resolve();
    return new Promise((resolve, reject) => {
        const proc = spawn(command, args, {
            cwd: opts.cwd,
            env: createEnv(opts)
        });
        log('stdout', '$ ' + script);
        proc.on('error', reject);
        byline(proc.stdout).on('data', (line) => log('stdout', line.toString()));
        byline(proc.stderr).on('data', (line) => log('stderr', line.toString()));
        proc.on('close', (code) => {
            if (code > 0)
                return reject(new Error('Exit code ' + code));
            return resolve();
        });
    });
}
exports.default = runScript;
function sync(command, args, opts) {
    opts = Object.assign({}, opts);
    return spawn.sync(command, args, Object.assign({}, opts, {
        env: createEnv(opts)
    }));
}
exports.sync = sync;
function createEnv(opts) {
    const env = Object.create(process.env);
    env[PATH] = [
        path.join(opts.cwd, 'node_modules', '.bin'),
        path.dirname(process.execPath),
        process.env[PATH]
    ].join(path.delimiter);
    if (opts.userAgent) {
        env['npm_config_user_agent'] = opts.userAgent;
    }
    return env;
}
//# sourceMappingURL=runScript.js.map