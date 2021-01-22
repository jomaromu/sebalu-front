"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PrincipalComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var sweetalert2_1 = require("sweetalert2");
var PrincipalComponent = /** @class */ (function () {
    function PrincipalComponent(router, fb, correoService) {
        this.router = router;
        this.fb = fb;
        this.correoService = correoService;
        // tslint:disable-next-line: quotemark
        this.patternCorreo = "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$";
    }
    PrincipalComponent.prototype.ngOnInit = function () {
        // this.cargarLoading();
        this.videoResponsive();
        this.crearFormulario();
        this.playVideo();
    };
    PrincipalComponent.prototype.playVideo = function () {
        // video.play();
        var contenedorElegirnos = document.getElementById('contenedorElegirnos');
        var contContacto = document.getElementById('contContacto');
        var video = document.getElementById('video');
        var alturaContenedor = contenedorElegirnos.offsetTop;
        var alturaScroll = contenedorElegirnos.clientHeight;
        var alturaContacto = contContacto.clientHeight;
        window.addEventListener('scroll', function (e) {
            if (window.scrollY >= (alturaContenedor + alturaScroll)) {
                video.play();
            }
            if (window.scrollY < alturaContenedor || window.scrollY >= (alturaContenedor + alturaScroll + alturaContacto)) {
                video.pause();
            }
        });
    };
    PrincipalComponent.prototype.crearFormulario = function () {
        this.forma = this.fb.group({
            nombre: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(100)]],
            // tslint:disable-next-line: quotemark
            correo: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(100), forms_1.Validators.pattern(this.patternCorreo)]],
            mensaje: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(300)]]
        });
    };
    PrincipalComponent.prototype.cargarLoading = function () {
        var body = document.body;
        var divLoading = this.divLoading.nativeElement;
        var imgLoader = this.imgLoader.nativeElement;
        var alturaWindowCalculada = window.innerHeight / 2;
        var scrolly = window.scrollY;
        var alturaImgLoader = imgLoader.clientHeight;
        var calculoScroll = window.scrollY + (alturaWindowCalculada - alturaImgLoader);
        // const alturaImg = alturaWindowCalculada - (alturaImgLoader / 2);
        imgLoader.style.marginTop = calculoScroll + "px";
        body.style.overflow = 'hidden';
        divLoading.style.height = body.clientHeight + "px";
        divLoading.classList.add('loading');
        var interval = setInterval(function () {
            var wait = document.readyState;
            if (wait === 'complete') {
                divLoading.classList.add('animate__fadeOut');
                body.style.overflow = 'auto';
                setTimeout(function () {
                    divLoading.style.display = 'none';
                }, 1000);
                clearInterval(interval);
            }
        }, 2000);
    };
    PrincipalComponent.prototype.videoResponsive = function () {
        var colBienvenida = document.getElementById('colBienvenida');
        var videoBaner = document.getElementById('videoBaner');
        // @ts-ignore
        var videoSizeChange = new ResizeObserver(function (entries) {
            var altoVideo = entries[0].contentRect.height;
            colBienvenida.style.height = altoVideo + "px";
        });
        videoSizeChange.observe(videoBaner);
    };
    PrincipalComponent.prototype.enviarMensaje = function () {
        // console.log(this.forma)
        var _this = this;
        // return;
        var nombre = this.forma.controls.nombre.status;
        var correo = this.forma.controls.correo.status;
        var mensaje = this.forma.controls.mensaje.status;
        if (this.forma.status === 'INVALID') {
            // caso nombre
            if (nombre === 'INVALID') {
                this.banderaNombre = false;
            }
            else {
                this.banderaNombre = true;
            }
            // caso correo
            if (correo === 'INVALID') {
                this.banderaCorreo = false;
            }
            else {
                this.banderaCorreo = true;
            }
            // caso mensaje
            if (mensaje === 'INVALID') {
                this.banderaMensaje = false;
            }
            else {
                this.banderaMensaje = true;
            }
        }
        else if (this.forma.status === 'VALID') {
            this.banderaNombre = true;
            this.banderaMensaje = true;
            this.banderaCorreo = true;
            var name = this.forma.controls.nombre.value;
            var message = this.forma.controls.mensaje.value;
            var email = this.forma.controls.correo.value;
            var data = new FormData();
            data.append('nombre', name);
            data.append('correo', email);
            data.append('mensaje', message);
            var anchoDiv = window.innerHeight;
            var offSet = window.scrollY;
            var body_1 = document.body;
            body_1.style.overflowY = 'hidden';
            // loading
            var loader_1 = this.loadgin.nativeElement;
            loader_1.style.position = 'absolute';
            loader_1.style.backgroundColor = 'rgba(226, 226, 226, 0.3)';
            loader_1.style.width = '100%';
            loader_1.style.height = anchoDiv + "px";
            loader_1.style.top = offSet + "px";
            loader_1.style.display = 'flex';
            loader_1.style.justifyContent = 'center';
            loader_1.style.alignItems = 'center';
            this.correoService.enviarCorreo(data).subscribe(function (resp) {
                if (resp.ok === true) {
                    loader_1.style.display = 'none';
                    body_1.style.overflow = 'auto';
                    sweetalert2_1["default"].fire('Mensaje', 'Correo enviado, muy pronto te contactaremos', 'info');
                    _this.forma.reset();
                }
                if (resp.ok === false) {
                    loader_1.style.display = 'none';
                    body_1.style.overflow = 'auto';
                    sweetalert2_1["default"].fire('Mensaje', 'No se pudo enviar el correo, intentelo más tarde', 'error');
                }
            });
        }
    };
    __decorate([
        core_1.ViewChild('loading', { static: true })
    ], PrincipalComponent.prototype, "divLoading");
    __decorate([
        core_1.ViewChild('imgLoader', { static: true })
    ], PrincipalComponent.prototype, "imgLoader");
    __decorate([
        core_1.ViewChild('loadgin', { static: true })
    ], PrincipalComponent.prototype, "loadgin");
    __decorate([
        core_1.ViewChild('video', { static: true })
    ], PrincipalComponent.prototype, "video");
    PrincipalComponent = __decorate([
        core_1.Component({
            selector: 'app-principal',
            templateUrl: './principal.component.html',
            styleUrls: ['./principal.component.css']
        })
    ], PrincipalComponent);
    return PrincipalComponent;
}());
exports.PrincipalComponent = PrincipalComponent;
