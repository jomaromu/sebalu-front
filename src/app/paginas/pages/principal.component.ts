import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CorreoService } from 'src/app/servicios/correo.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  @ViewChild('loading', { static: true }) divLoading: ElementRef<HTMLElement>;
  @ViewChild('imgLoader', { static: true }) imgLoader: ElementRef<HTMLElement>;

  @ViewChild('loadgin', { static: true }) loadgin: ElementRef<HTMLElement>;
  @ViewChild('video', { static: true }) video: ElementRef<HTMLElement>;

  nombre: string;
  correo: string;
  mensaje: string;
  forma: FormGroup;

  banderaNombre: boolean;
  banderaCorreo: boolean;
  banderaMensaje: boolean;

  // tslint:disable-next-line: quotemark
  patternCorreo = "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$";

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private correoService: CorreoService
  ) {

  }

  ngOnInit(): void {

    // this.cargarLoading();

    this.videoResponsive();

    this.crearFormulario();

    this.playVideo();
  }

  playVideo(): any {

    // video.play();
    const contenedorElegirnos = document.getElementById('contenedorElegirnos');
    const contContacto = document.getElementById('contContacto');
    const video: any = document.getElementById('video');

    const alturaContenedor = contenedorElegirnos.offsetTop;
    const alturaScroll = contenedorElegirnos.clientHeight;
    const alturaContacto = contContacto.clientHeight;
    
    window.addEventListener('scroll', (e) => {

      if (window.scrollY >= (alturaContenedor + alturaScroll)) {
        video.play();
      }

      if (window.scrollY < alturaContenedor || window.scrollY >= (alturaContenedor + alturaScroll + alturaContacto)) {
        video.pause();
      }
    });
  }

  crearFormulario(): any {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      // tslint:disable-next-line: quotemark
      correo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.pattern(this.patternCorreo)]],
      mensaje: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(300)]]
    });
  }

  cargarLoading(): any {
    const body = document.body;
    const divLoading = this.divLoading.nativeElement;
    const imgLoader = this.imgLoader.nativeElement;

    const alturaWindowCalculada = window.innerHeight / 2;
    const scrolly = window.scrollY;
    const alturaImgLoader = imgLoader.clientHeight;

    const calculoScroll = window.scrollY + (alturaWindowCalculada - alturaImgLoader);

    // const alturaImg = alturaWindowCalculada - (alturaImgLoader / 2);

    imgLoader.style.marginTop = `${calculoScroll}px`;

    body.style.overflow = 'hidden';
    divLoading.style.height = `${body.clientHeight}px`;
    divLoading.classList.add('loading');

    const interval = setInterval(() => {

      const wait = document.readyState;
      if (wait === 'complete') {
        divLoading.classList.add('animate__fadeOut');
        body.style.overflow = 'auto';

        setTimeout(() => {
          divLoading.style.display = 'none';
        }, 1000);

        clearInterval(interval);
      }
    }, 2000);
  }

  videoResponsive(): any {

    const colBienvenida = document.getElementById('colBienvenida');
    const videoBaner = document.getElementById('videoBaner');

    // @ts-ignore
    const videoSizeChange = new ResizeObserver(entries => {

      const altoVideo = entries[0].contentRect.height;
      colBienvenida.style.height = `${altoVideo}px`;
    });

    videoSizeChange.observe(videoBaner);
  }

  enviarMensaje(): any {
    // console.log(this.forma)

    // return;
    const nombre = this.forma.controls.nombre.status;
    const correo = this.forma.controls.correo.status;
    const mensaje = this.forma.controls.mensaje.status;

    if (this.forma.status === 'INVALID') {

      // caso nombre
      if (nombre === 'INVALID') {
        this.banderaNombre = false;
      } else {
        this.banderaNombre = true;
      }
      // caso correo
      if (correo === 'INVALID') {
        this.banderaCorreo = false;
      } else {
        this.banderaCorreo = true;
      }
      // caso mensaje
      if (mensaje === 'INVALID') {
        this.banderaMensaje = false;
      } else {
        this.banderaMensaje = true;
      }
    } else if (this.forma.status === 'VALID') {

      this.banderaNombre = true;
      this.banderaMensaje = true
      this.banderaCorreo = true;

      const name = this.forma.controls.nombre.value;
      const message = this.forma.controls.mensaje.value;
      const email = this.forma.controls.correo.value;

      const data = new FormData();

      data.append('nombre', name);
      data.append('correo', email);
      data.append('mensaje', message);

      const anchoDiv = window.innerHeight;
      const offSet = window.scrollY;
      const body = document.body;

      body.style.overflowY = 'hidden';

      // loading
      const loader = this.loadgin.nativeElement;
      loader.style.position = 'absolute';
      loader.style.backgroundColor = 'rgba(226, 226, 226, 0.3)';
      loader.style.width = '100%';
      loader.style.height = `${anchoDiv}px`;
      loader.style.top = `${offSet}px`;
      loader.style.display = 'flex';
      loader.style.justifyContent = 'center';
      loader.style.alignItems = 'center';

      this.correoService.enviarCorreo(data).subscribe((resp: any) => {
        if (resp.ok === true) {
          loader.style.display = 'none';
          body.style.overflow = 'auto';
          Swal.fire(
            'Mensaje',
            'Correo enviado, muy pronto te contactaremos',
            'info'
          );
          this.forma.reset();
        }

        if (resp.ok === false) {
          loader.style.display = 'none';
          body.style.overflow = 'auto';
          Swal.fire(
            'Mensaje',
            'No se pudo enviar el correo, intentelo más tarde',
            'error'
          );
        }
      });
    }
  }

}
