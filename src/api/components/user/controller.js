var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { registerService, loginService } from './service.js';
import { handleError } from '../../utils/handleError.js';
export const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email, password } = (_a = req.body) !== null && _a !== void 0 ? _a : {};
        const user = yield registerService(email, password);
        res.status(201).json(user);
    }
    catch (error) {
        handleError(res, error);
    }
});
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email, password } = (_a = req.body) !== null && _a !== void 0 ? _a : {};
        const token = yield loginService(email, password);
        res.status(200).json({ token });
    }
    catch (error) {
        handleError(res, error);
    }
});
//# sourceMappingURL=controller.js.map