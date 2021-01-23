"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CorreoService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var CorreoService = /** @class */ (function () {
    function CorreoService(http) {
        this.http = http;
    }
    CorreoService.prototype.enviarCorreo = function (data) {
        var url = 'https://correo.sebalulogistics.com/envio';
        // const url = 'http://172.31.62.232:3000/envio';
        // const url = 'http://localhost:3000/envio';
        return this.http.post(url, data)
            .pipe(operators_1.map(function (resp) {
            return resp;
        }));
    };
    CorreoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CorreoService);
    return CorreoService;
}());
exports.CorreoService = CorreoService;
