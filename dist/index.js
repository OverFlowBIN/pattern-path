"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = patternPath;
exports.main = main;
const fs = require("fs/promises");
const path = require("path");
function patternPath(directory, pattern) {
    return __awaiter(this, void 0, void 0, function* () {
        let results = [];
        function searchDirectory(currentDirectory) {
            return __awaiter(this, void 0, void 0, function* () {
                const files = yield fs.readdir(currentDirectory);
                for (const file of files) {
                    const fullPath = path.join(currentDirectory, file);
                    const stat = yield fs.stat(fullPath);
                    if (stat.isDirectory()) {
                        yield searchDirectory(fullPath);
                    }
                    else if (stat.isFile() && pattern.test(file)) {
                        results.push(fullPath);
                    }
                }
            });
        }
        yield searchDirectory(directory);
        return results;
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield patternPath('.', /\.ts$/);
        console.log(files);
    });
}
main();
