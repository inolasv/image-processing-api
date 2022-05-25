import supertest from 'supertest';
import app from '../index';
import resizeImage from '../utilities/resizeImage';
import validateInput from '../utilities/validateInputs';

const request = supertest(app);
describe('Server Test', () => {
    it('routes to api', async () => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
    });
    it('routes to images', async () => {
        const response = await request.get('/api/images');
        expect(response.status).toBe(200);
    });
    it('routes to images with invalid arguments', async () => {
        const response = await request.get(
            '/api/images?filename=encenadaport&width=Z00&height=200'
        );
        expect(response.status).toBe(200);
    });
    it('routes to image with valid arguments', async () => {
        const response = await request.get(
            '/api/images?filename=encenadaport&width=200&height=200'
        );
        expect(response.status).toBe(200);
    });
});

describe('Validate Input Test', () => {
    it('properly validates correct inputs', async () => {
        const validation = await validateInput('encenadaport', 200, 200);
        expect(validation).toBeTrue();
    });
    it('catches non numbers', async () => {
        const validation = await validateInput(
            'encenadaport',
            Number('3ab'),
            200
        );
        expect(validation).toBeFalse();
    });
    it('catches non integers', async () => {
        const validation = await validateInput('encenadaport', 20.5, 200);
        expect(validation).toBeFalse();
    });
    it('catches non positive integers', async () => {
        const validation = await validateInput('encenadaport', 200, -25);
        expect(validation).toBeFalse();
    });
    it('catches null images', async () => {
        const validation = await validateInput(null, 200, -25);
        expect(validation).toBeFalse();
    });
    it('catches nonexistent  images', async () => {
        const validation = await validateInput('doesNotExist', 200, -25);
        expect(validation).toBeFalse();
    });
});

describe('Resize Image Test', () => {
    it('creates new image', async () => {
        const created_image = await resizeImage('encenadaport', 200, 200);
        expect(created_image).toBe(
            './assets/thumb/encenadaport200x200_thumb.jpg'
        );
    });
});
