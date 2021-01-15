import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  rowBievenida: any;
  bandera = false;

  constructor() { }

  ngOnInit(): void {
  }

  showToggle(evento): any {
    const botonToggle = document.getElementById('botonToggle');
    const navToggle = document.getElementById('navToggle');

    if (this.bandera === false) {

      navToggle.style.display = 'flex';
      navToggle.classList.add('animate__bounceInLeft');
      this.bandera = true;

    } else if (this.bandera === true) {

      navToggle.style.display = 'none';
      this.bandera = false;
    }
  }
}
