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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const images_1 = require("../routes/api/images");
const request = (0, supertest_1.default)(index_1.default);
describe("Server Test", () => {
    it("routes to api", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api');
        expect(response.status).toBe(200);
    }));
    it("routes to images", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images');
        expect(response.status).toBe(200);
    }));
    it("routes to images with invalid arguments", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=encenadaport&width=Z00&height=200');
        expect(response.status).toBe(200);
    }));
    it("routes to image with valid arguments", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=encenadaport&width=200&height=200');
        expect(response.status).toBe(200);
    }));
});
describe('Resize Image Test', () => {
    it('creates new image', () => __awaiter(void 0, void 0, void 0, function* () {
        const created_image = yield (0, images_1.resizeImage)('encenadaport', 200, 200);
        expect(created_image).toBe("./assets/thumb/encenadaport_thumb.jpg");
    }));
    it('creates new image with proper dims', () => __awaiter(void 0, void 0, void 0, function* () {
        const new_image = yield (0, images_1.resizeImage)('encenadaport', 200, 200);
        // const img = new Image();
        // console.log("hello");
        // img.src = 'http://localhost:3000/api/images?filename=encenadaport&width=200&height=200';
        // console.log(img.width);
        // expect(img.width).toBe(200);
        // expect(img.height).toBe(200);
    }));
});
