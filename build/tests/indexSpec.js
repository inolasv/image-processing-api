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
const resizeImage_1 = __importDefault(require("../utilities/resizeImage"));
const validateInputs_1 = __importDefault(require("../utilities/validateInputs"));
const request = (0, supertest_1.default)(index_1.default);
describe('Server Test', () => {
    it('routes to api', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api');
        expect(response.status).toBe(200);
    }));
    it('routes to images', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images');
        expect(response.status).toBe(200);
    }));
    it('routes to images with invalid arguments', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=encenadaport&width=Z00&height=200');
        expect(response.status).toBe(200);
    }));
    it('routes to image with valid arguments', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=encenadaport&width=200&height=200');
        expect(response.status).toBe(200);
    }));
});
describe('Validate Input Test', () => {
    it('properly validates correct inputs', () => __awaiter(void 0, void 0, void 0, function* () {
        const validation = yield (0, validateInputs_1.default)('encenadaport', 200, 200);
        expect(validation).toBeTrue();
    }));
    it('catches non numbers', () => __awaiter(void 0, void 0, void 0, function* () {
        const validation = yield (0, validateInputs_1.default)('encenadaport', Number('3ab'), 200);
        expect(validation).toBeFalse();
    }));
    it('catches non integers', () => __awaiter(void 0, void 0, void 0, function* () {
        const validation = yield (0, validateInputs_1.default)('encenadaport', 20.5, 200);
        expect(validation).toBeFalse();
    }));
    it('catches non positive integers', () => __awaiter(void 0, void 0, void 0, function* () {
        const validation = yield (0, validateInputs_1.default)('encenadaport', 200, -25);
        expect(validation).toBeFalse();
    }));
    it('catches null images', () => __awaiter(void 0, void 0, void 0, function* () {
        const validation = yield (0, validateInputs_1.default)(null, 200, -25);
        expect(validation).toBeFalse();
    }));
    it('catches nonexistent  images', () => __awaiter(void 0, void 0, void 0, function* () {
        const validation = yield (0, validateInputs_1.default)('doesNotExist', 200, -25);
        expect(validation).toBeFalse();
    }));
});
describe('Resize Image Test', () => {
    it('creates new image', () => __awaiter(void 0, void 0, void 0, function* () {
        const created_image = yield (0, resizeImage_1.default)('encenadaport', 200, 200);
        expect(created_image).toBe('./assets/thumb/encenadaport200x200_thumb.jpg');
    }));
});
