import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/* ========================================
   SERVICES PAGE COMPONENT
   ========================================
   This page displays all salon services and pricing.
   
   To edit services:
   - Edit the HTML file: src/app/pages/services/services.html
   - Each service is in a <div class="service-item">
   
   To add new services:
   1. Open services.html
   2. Copy a service-item div
   3. Change the name, description, and price
   
   To add a new category:
   1. Open services.html
   2. Copy the entire service-category div
   3. Change the category title and add services
   ======================================== */

@Component({
  selector: 'app-services',
  imports: [RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {}
