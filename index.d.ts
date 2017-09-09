declare const PDFS: {
    normal: ({mean, variance}: {
        mean?: number;
        variance?: number;
    }) => (x: any) => number;
    symmetricNormalBimodal: ({xs, mean, variance}: {
        xs: any;
        mean?: number;
        variance?: number;
    }) => (x: any) => number;
    symmetricNormalTrimodal: ({xs, mean, variance}: {
        xs: any;
        mean?: number;
        variance?: number;
    }) => (x: any) => number;
    logNormal: ({mean, variance}: {
        mean?: number;
        variance?: number;
    }) => (x: any) => number;
    zipf: ({s}: {
        s?: number;
    }) => (x: any) => number;
    uniform: ({count}: {
        count: any;
    }) => (x: any) => number;
    uniformBimodal: ({count}: {
        count: any;
    }) => (x: any) => number;
    uniformTrimodal: ({count}: {
        count: any;
    }) => (x: any) => number;
};
export default PDFS;
