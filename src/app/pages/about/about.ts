import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  carouselImages = [
    '/carousel-3.jpg',
    '/carousel-4.jpg',
    '/carousel-5.jpg',
    '/carousel-6.jpg',
    '/carousel-7.jpg',
  ];
  sideImages = [
    { left: '/carousel-8.jpg', right: '/carousel-9.jpg' },
    { left: '/carousel-10.jpg', right: '/carousel-11.jpg' },
  ];
  showFullStory = false;

  toggleStory() {
    this.showFullStory = !this.showFullStory;
  }
}
