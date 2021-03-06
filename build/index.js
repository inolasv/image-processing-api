"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
const port = 3000;
// set view engine as ejs
app.set('view engine', 'ejs');
app.use(express_1.default.static('assets'));
// using main api route
app.use('/api', index_1.default);
// Starts the Express Server at port 3000
app.listen(port, () => {
    // console.log(`Server started at http://localhost:${port}`);
});
exports.default = app;
