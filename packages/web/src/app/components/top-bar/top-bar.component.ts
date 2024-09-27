import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import type { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
  constructor(
    private _Renderer:Renderer2,

  ){}

  @ViewChild('topBar') navbarElement!:ElementRef
  @HostListener('window:scroll')
  onScroll():void{
    if(scrollY > 600){
      this._Renderer.setStyle(this.navbarElement.nativeElement,'opacity',0);
      
    }else{
      this._Renderer.removeStyle(this.navbarElement.nativeElement,'opacity');
      
    }
  }
  
  // main slider
  topBarSlide: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    items: 1,
    nav: false,
    autoplay: true,
    autoplayTimeout: 10000,
    autoplaySpeed: 20000,

    autoplayHoverPause: true,
  };
}
