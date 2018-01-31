"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_dom_1 = require("react-dom");
class MainView extends react_1.default.Component {
    render() {
        return react_1.default.createElement("div", null, this.props.greeting);
    }
}
function onLoad() {
    return __awaiter(this, void 0, void 0, function* () {
        document.addEventListener("DOMContentLoaded", (event) => __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("/api/hello");
            const result = yield response.json();
            react_dom_1.default.render(react_1.default.createElement(MainView, { greeting: result.hello }), document.getElementById("container"));
        }));
    });
}
onLoad();
//# sourceMappingURL=index.js.map