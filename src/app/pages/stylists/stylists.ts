import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/* ========================================
   STYLIST DATA INTERFACE
   ======================================== */
interface Stylist {
  name: string;
  initials: string; /* Initials shown on placeholder */
  title: string; /* Job title */
  bio: string; /* Bio description */
  specialties: string[]; /* Array of specialties */
  photoColor: string; /* Background gradient color */
  photo: string; /* Path to real photo */
}

@Component({
  selector: 'app-stylists',
  imports: [RouterLink],
  templateUrl: './stylists.html',
  styleUrl: './stylists.css',
})
export class Stylists {
  /* ========================================
     SELECTED STYLIST FOR DETAIL VIEW
     ======================================== */
  selectedStylist: Stylist | null = null;

  /* ========================================
     STYLIST DATA - EDIT THIS TO CHANGE STYLISTS
     
     To add your own stylists:
     1. Copy one of the stylist objects below
     2. Change the name, initials, title, bio, and specialties
     3. Change the photoColor to match their style
     
     To add real photos later:
     1. Add a 'photo' property to the Stylist interface above
     2. Add the photo path like: photo: '/assets/stylists/rose.jpg'
     3. Update the HTML template to use <img [src]="stylist.photo">
     ======================================== */
  stylists: Stylist[] = [
    {
      name: 'Sophie Rightmire',
      initials: 'SR',
      title: 'Cuts, Color, and Blowouts',
      bio: 'Sophie has been perfecting her craft for over 15 years now. She takes most of her creative inspiration from old films, as well as from the metal and punk scene. She obviously loves knocking out unorthodox cuts and colors, but she doesnt limit her skills there. She also has a passion for blonding, color corrections, all haircuts, and bouncy blowouts! She is happy to laugh and nerd out with each client in her chair, but is also more than willing to offer silent services. Her goal is not only to make you feel confident during each service, but also as comfortable as possible. Books are open to all, check whats available now!',
      specialties: ['Vivid Colors', 'Asymmetric Cuts', 'Bouncy Blowouts'],
      photoColor: 'linear-gradient(135deg, #d4145a, #8b0000)',
      photo: '/stylist-sophie-rightmire.png',
    },
    {
      name: 'Misty Byrd',
      initials: 'MB',
      title: 'Owner',
      bio: ' Misty, has had a mad passion for hair since a young age and has been working behind the chair since 2007. Misty loves doing extreme punk rock styles, edgy cuts, and colors. She specializes in color corrections as well as cutting corrections. Single-process color, highlighting of all Techniques, Fantasy hair color, and all the bright colors. She also loves working on Dreadlocks! She does permanent installs, maintenance, and human hair dread extension work. If you are new she asks you please schedule a consultation. If out of town she will do FaceTime consults:)',
      specialties: ['Punk Rock Styles', 'Edgy Cuts', 'Vivid Colors'],
      photoColor: 'linear-gradient(135deg, #461de9, #32d047)',
      photo: '/stylist-misty-byrd.png',
    },
    {
      name: 'Pinky Jones',
      initials: 'PJ',
      title: 'Color Specialist',
      bio: 'Hey there! I am Pinky, and I am all about bringing some color and movement to your hair. Based in Oklahoma, I have been honing my skills as a hair artist for years now, and I specialize in cutting and coloring. I take inspiration from the city around me to create truly unique and beautiful looks. Whether you are looking for some vivids to really make a statement or a whimsical, playful haircut that has some serious movement, I am your guy. If you want to see some of my latest work, be sure to check out my Instagram at @Therealpinkymalinkyjones',
      specialties: ['Vivid Colors', 'Ombre', 'Fashion Colors', 'Creative Cuts'],
      photoColor: 'linear-gradient(135deg, #9b59b6, #3498db)',
      photo: '/stylist-pinky-jones.png',
    },
    {
      name: 'Cady Woolly',
      initials: 'CW',
      title: 'Stylist',
      bio: 'I have been a licensed cosmetologist since 2014. I love color corrections and creating bright bold colors. I live for the art as well as the science behind my craft. I love making new connections and am always striving to find new ways to make my guests look the best.',
      specialties: ['Classic Cuts', 'Textured Hair', 'Volumizing', 'Scalp Treatments'],
      photoColor: 'linear-gradient(135deg, #e74c3c, #f39c12)',
      photo: '/stylist-cady-woolly.png',
    },
    {
      name: 'Brittney Ragland',
      initials: 'BR',
      title: 'Stylist',
      bio: 'Brittney has a passion for all things art. She plays several musical instruments, sings, draws and paints; which all bleed over into her love for the beauty industry. It started with vivid eyeshadow and funky makeup but turned into a love for all things hair. Brittney graduated hair school in 2014. She specializes in fantasy hair/vivids, specialty cuts, and lived in vivids. Known for being sociable, she loves making her clients feel at home in her chair. Drawing inspiration from nature and art, Brittney customizes each color to give her clients the fantasy hair they have always dreamt of.',
      specialties: ['Fantasy Hair', 'Vivid Colors', 'Specialty Cuts', 'Color Customization'],
      photoColor: 'linear-gradient(135deg, #db9b34, #17adce)',
      photo: '/stylist-brittney-ragland.png',
    },
    {
      name: 'Madeline Noble',
      initials: 'MN',
      title: 'Stylist',
      bio: 'Maddie is a kind and welcoming stylist, her main priority beyond amazing hair is to create a comfortable and safe environment. She loves doing magical vivid colors, dynamic haircuts, and blended lived-in balayages. Maddie is inspired by fantasy, video games, and art. Always down to talk astrology, anime, and the best food spots! All hair types welcome!',
      specialties: ['Vivid Colors', 'Fantasy Hair', 'Blended Balayage', 'Dynamic Cuts'],
      photoColor: 'linear-gradient(135deg, #8e44ad, #c0392b)',
      photo: '/stylist-madeline-noble.png',
    },
    {
      name: 'Hae Harrison',
      initials: 'HH',
      title: 'Stylist',
      bio: 'hiii!! I am Haedyn! I love doing hair and love people! it would be an honor to have you in my chair!! A little about me, I am 24, I am the oldest of four siblings, I am a Leo, I am obsessed with hotdogs and disco balls, and antiquing is my favorite thing to do! Lets talk hair, i am so beyond happy to do any type of hair!! I especially love doing vivds, blondes, layers, and blowouts. I hope to see you in my chair soon!',
      specialties: ['Vivid Colors', 'Blondes', 'Layers', 'Blowouts'],
      photoColor: 'linear-gradient(135deg, #e67e22, #2ecc71)',
      photo: '/stylist-hae-harrison.png',
    },
  ];

  /* ========================================
     SELECT STYLIST - OPENS DETAIL VIEW
     ======================================== */
  selectStylist(stylist: Stylist) {
    this.selectedStylist = stylist;
  }
}
