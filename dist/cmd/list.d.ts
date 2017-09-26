export default function (args: string[], opts: {
    prefix: string;
    depth?: number;
    only?: 'dev' | 'prod';
    long?: boolean;
    parseable?: boolean;
    global: boolean;
    independentLeaves: boolean;
}, command: string): Promise<void>;
