import supertest from 'supertest';
import app from '../index'
import { images, resizeImage } from '../routes/api/images';

const request = supertest(app);
describe("Server Test", () => {
    it("routes to api", async () => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
    })
    it("routes to images", async () => {
        const response = await request.get('/api/images');
        expect(response.status).toBe(200);
    });
    it("routes to images with invalid arguments", async () => {
        const response = await request.get('/api/images?filename=encenadaport&width=Z00&height=200');
        expect(response.status).toBe(200);
    });
    it("routes to image with valid arguments", async () => {
        const response = await request.get('/api/images?filename=encenadaport&width=200&height=200');
        expect(response.status).toBe(200);
    });

});

describe('Resize Image Test', () => {
    it ('creates new image', async () => {
        const created_image = await resizeImage('encenadaport', 200, 200)
        expect(created_image).toBe("./assets/thumb/encenadaport_thumb.jpg");
    })
    it ('creates new image with proper dims', async () => {
        const new_image = await resizeImage('encenadaport', 200, 200);
        // const img = new Image();
        // console.log("hello");
        // img.src = 'http://localhost:3000/api/images?filename=encenadaport&width=200&height=200';
        // console.log(img.width);
        // expect(img.width).toBe(200);
        // expect(img.height).toBe(200);
    })
})