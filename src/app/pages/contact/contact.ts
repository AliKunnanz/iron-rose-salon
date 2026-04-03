import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalonApiService } from '../../services/salon-api.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  submitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private api: SalonApiService) {}

  submitBooking(event: Event): void {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const service = formData.get('service') as string;
    const message = formData.get('notes') as string;

    this.submitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.api.sendMessage({ name, email, phone, service, message }).subscribe({
      next: () => {
        this.submitting = false;
        this.successMessage = 'Thank you for your message! We will get back to you shortly.';
        form.reset();
      },
      error: (err) => {
        this.submitting = false;
        this.errorMessage = err.error?.error || 'Failed to send message. Please try again.';
      }
    });
  }
}
