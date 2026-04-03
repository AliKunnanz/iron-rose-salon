import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Services } from './pages/services/services';
import { Gallery } from './pages/gallery/gallery';
import { Contact } from './pages/contact/contact';
import { Stylists } from './pages/stylists/stylists';
import { Booking } from './pages/booking/booking';
import { Admin } from './pages/admin/admin';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'services', component: Services },
  { path: 'gallery', component: Gallery },
  { path: 'contact', component: Contact },
  { path: 'stylists', component: Stylists },
  { path: 'book', component: Booking },
  { path: 'admin', component: Admin },
  { path: '**', redirectTo: '' }
];
