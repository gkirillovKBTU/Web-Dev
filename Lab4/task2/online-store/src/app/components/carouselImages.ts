import { Component, computed, Input, OnDestroy, signal } from "@angular/core";

@Component({
  selector: 'app-carousel',
  standalone: true,
  styles:`
    .carousel { position: relative; overflow: hidden; }

    .track {
        display: flex;
        transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
        max-height: 14vh;
    }

    .slide {
        min-width: 100%;
        overflow: hidden;
    }
    
    .slide img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

  `,
  template: `
    <div class="carousel">
      <div class="track" [style.transform]="trackTransform()" (mouseenter)="onHover(true)" (mouseleave)="onHover(false)">
        @for (image of images; track image) {
          <div class="slide">
            <img [src]="image"/>
          </div>
        }
      </div>
      <div class="dots">
        @for (image of images; track image; let i = $index) {
          <span class="dot" [class.active]="i === current()" (click)="goTo(i)"></span>
        }
      </div>
    </div>
  `
})
export class CarouselComponent implements OnDestroy{
  @Input() images: string[] = [];
  @Input() autoplayInterval = 1000;

  current = signal(0);

  trackTransform = computed(() => `translateX(-${this.current() * 100}%)`);

  next() {
    this.current.update(c => (c + 1) % this.images.length);
  }
  
  goTo(index: number) {
    this.current.set(index);
  }

  private timer?: ReturnType<typeof setInterval>;

  ngOnDestroy() {
    this.stopAutoplay();
  }

  startAutoplay() {
    this.timer = setInterval(() => this.next(), this.autoplayInterval);
  }

  stopAutoplay() {
    clearInterval(this.timer);
  }

  onHover(hoverState: boolean){
    if(hoverState){
        this.startAutoplay();
    }else{
        this.stopAutoplay();
    }
  }
}