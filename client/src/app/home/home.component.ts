import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  isAuthenticated: boolean; 
  public slideIndex:number= 1;

  constructor(private oauthService: OAuthService, private router: Router){//private oktaAuth: OktaAuthService) {
  }

  ngOnInit() {
    this.showSlides(this.slideIndex); 
    // const claims = this.oauthService.getIdentityClaims();
    // if (claims) {
    //   this.router.navigateByUrl("/dashboard");
    // }
  }

  // Next/previous controls
  plusSlides(n) {
    console.log("hello this is plusSlides");
    this.slideIndex += n
    this.showSlides(this.slideIndex);
  }
  
  // Thumbnail image controls
  currentSlide(n) { 
    console.log("hello this is currentSlide"); 
    this.slideIndex = n 
    this.showSlides(n);
  }

  showSlides(n) {
    console.log("hello this is showSlides  "+n);
    console.log("slideIndex="+this.slideIndex);
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {this.slideIndex = 1} 
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        (slides[i] as HTMLElement).style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    (slides[this.slideIndex-1] as HTMLElement).style.display = "block"; 
    dots[this.slideIndex-1].className += " active";
    console.log((slides[this.slideIndex-1] as HTMLElement).style.display);
  }

}