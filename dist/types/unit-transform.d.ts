declare type TransformOptions = {
    /**
     * 端点传输倍数，即保留N位小数
     * @example 端点值 56，传输倍数 0，则界面应显示 56
     * @example 端点值 103，传输倍数 1，则界面应显示 10.3
     */
    scale?: number;
    /**
     * 温标
     */
    unit: 'c' | 'f';
};
export declare function createUnitTransform(options: TransformOptions): {
    formatScale: (anyTemp: number) => number;
    isC: () => boolean;
    isF: () => boolean;
    c2val: (c: number) => number;
    val2c: (c: number | any) => number;
    c2f: (c: number) => number;
    f2c: (f: number) => number;
    val2cf: (val: number) => number;
    c2cf: (c: number) => number;
    f2cf: (f: number) => number;
    cf2c: (cORf: number) => number;
    cf2f: (cORf: number) => number;
    cf2val: (cORf: number) => number;
    tempUnitString: () => "℃" | "℉";
    displayTempByC: (c: number) => string;
    displayTempByVal: (val: number) => string;
};
export {};
