module.exports = {
    preset: "ts-jest",
    collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}"
    ],
    transform: {
        "^.+\\.tsx?$": "babel-jest",
    },
    roots: [
        "<rootDir>/src"
    ],
    globals: {
        "ts-jest": {
            "babelConfig": true
        },
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/"],
    moduleNameMapper: {
        "\\.(css)$": "<rootDir>/node_modules/jest-css-modules"
    },
    snapshotSerializers: ["enzyme-to-json/serializer"],
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
}