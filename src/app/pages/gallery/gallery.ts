import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {
  images = [
    { url: 'https://static.wixstatic.com/media/43a0fe_8c8d807dad2b47a69136611c3f24960a~mv2.jpeg', alt: 'Fire braid style' },
    { url: 'https://static.wixstatic.com/media/43a0fe_14f587df236e4bc29eb95e4ed103a335~mv2.jpeg', alt: 'Pink hair' },
    { url: 'https://static.wixstatic.com/media/43a0fe_2a6b21a64279473e9dd623f9d81775ee~mv2.jpeg', alt: 'Purple hair' },
    { url: 'https://static.wixstatic.com/media/43a0fe_b8b1b8e27b1e4673b237f045121e1dbb~mv2.png', alt: 'Salon interior' },
    { url: 'https://static.wixstatic.com/media/43a0fe_31ada341ddab4ae48b8de608b71ee879~mv2.jpeg', alt: 'Blonde highlights' },
    { url: 'https://static.wixstatic.com/media/43a0fe_ba48129c5fc643758f3a37ecfe4fa3ae~mv2.jpeg', alt: 'Rainbow hair' },
    { url: 'https://static.wixstatic.com/media/43a0fe_e246226747c04a3ba4b36cb9fe5c1ac1~mv2.jpeg', alt: 'Curly style' },
    { url: 'https://static.wixstatic.com/media/43a0fe_851c30dd2f4046ff9e2d7c9d88cc349c~mv2.jpeg', alt: 'Fire hair' },
    { url: 'https://static.wixstatic.com/media/43a0fe_c4179b7f8f9c4fb79c3f5eecc563e6ae~mv2.jpeg', alt: 'Rainbow mohawk' },
    { url: 'https://static.wixstatic.com/media/43a0fe_1d0b7106713c4af5a6282bfe76a679b6~mv2.png', alt: 'Vivid colors by Katie' },
    { url: 'https://static.wixstatic.com/media/43a0fe_daaa8f643c444dd291be206487857786~mv2.jpeg', alt: 'Tie dye hair by Sade' },
    { url: 'https://static.wixstatic.com/media/43a0fe_f7e301fd8a7549c09ca5c4b34ff82e9b~mv2.jpg', alt: 'Salon chairs' },
  ];
}
