import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor(private router:Router) {}

  redirectToProducts(){
    this.router.navigateByUrl('/products');
  }

  redirectToHome(){
    this.router.navigateByUrl('/home');
  }

  redirectToAccount(){
    this.router.navigateByUrl('/account');
  }
}
