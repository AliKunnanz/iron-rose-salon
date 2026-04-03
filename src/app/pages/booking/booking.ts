import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalonApiService } from '../../services/salon-api.service';
import { Service, Stylist, Availability, BookingRequest } from '../../services/models';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking implements OnInit {
  services: Service[] = [];
  stylists: Stylist[] = [];
  availableSlots: string[] = [];
  
  selectedService: Service | null = null;
  selectedStylist: Stylist | null = null;
  selectedDate: string = '';
  selectedTime: string = '';
  
  customerName: string = '';
  customerEmail: string = '';
  customerPhone: string = '';
  notes: string = '';
  
  loadingServices = true;
  loadingSlots = false;
  submitting = false;
  error = '';
  success = '';
  
  showSuccessPopup = false;
  
  minDate: string = '';
  allSlots: string[] = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'
  ];

  step: 1 | 2 | 3 | 4 | 5 = 1;

  constructor(private api: SalonApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadServices();
    this.loadStylists();
    this.setMinDate();
  }

  setMinDate(): void {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  loadServices(): void {
    this.api.getServices().subscribe({
      next: (data) => {
        setTimeout(() => {
          this.services = data || [];
          this.loadingServices = false;
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        setTimeout(() => {
          this.error = 'Failed to load services';
          this.loadingServices = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

  loadStylists(): void {
    this.api.getStylists().subscribe({
      next: (data) => this.stylists = data,
      error: (err) => console.error('Failed to load stylists:', err)
    });
  }

  selectService(service: Service): void {
    this.selectedService = service;
    this.selectedTime = '';
    if (this.selectedDate && this.selectedStylist) {
      this.loadAvailability();
    }
  }

  selectStylist(stylist: Stylist): void {
    this.selectedStylist = stylist;
    this.selectedTime = '';
    if (this.selectedDate) {
      this.loadAvailability();
    }
  }

  onDateChange(): void {
    this.selectedTime = '';
    if (this.selectedDate && this.selectedStylist) {
      this.loadAvailability();
    }
  }

  loadAvailability(): void {
    if (!this.selectedDate || !this.selectedStylist) return;

    this.loadingSlots = true;
    this.api.getAvailability(this.selectedDate, this.selectedStylist.id).subscribe({
      next: (data) => {
        this.availableSlots = data.available_slots;
        this.loadingSlots = false;
      },
      error: (err) => {
        this.error = 'Failed to load availability';
        this.loadingSlots = false;
      }
    });
  }

  isSlotAvailable(slot: string): boolean {
    return this.availableSlots.includes(slot);
  }

  selectTime(time: string): void {
    this.selectedTime = time;
  }

  nextStep(): void {
    if (this.step < 4) {
      this.step = (this.step + 1) as 1 | 2 | 3 | 4;
    }
  }

  prevStep(): void {
    if (this.step > 1) {
      this.step = (this.step - 1) as 1 | 2 | 3 | 4;
    }
  }

  canProceedToStep2(): boolean {
    return this.selectedService !== null;
  }

  canProceedToStep3(): boolean {
    return this.selectedStylist !== null && this.selectedDate !== '';
  }

  canProceedToStep4(): boolean {
    return this.selectedTime !== '';
  }

  submitBooking(): void {
    if (!this.selectedService || !this.selectedStylist || !this.selectedTime) return;

    this.submitting = true;
    this.error = '';
    this.success = '';

    const booking: BookingRequest = {
      customer_name: this.customerName,
      customer_email: this.customerEmail,
      customer_phone: this.customerPhone,
      service_id: this.selectedService.id,
      stylist_id: this.selectedStylist.id,
      appointment_date: this.selectedDate,
      appointment_time: this.selectedTime,
      notes: this.notes
    };

    this.api.createBooking(booking).subscribe({
      next: (response) => {
        this.submitting = false;
        this.success = `Booking confirmed! Your confirmation has been sent to ${this.customerEmail}`;
        this.showSuccessPopup = true;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.submitting = false;
        this.error = err.error?.error || 'Failed to book appointment. Please try again.';
        this.cdr.detectChanges();
      }
    });
  }

  closeSuccessPopup(): void {
    this.showSuccessPopup = false;
    this.step = 5;
  }

  resetForm(): void {
    this.selectedService = null;
    this.selectedStylist = null;
    this.selectedDate = '';
    this.selectedTime = '';
    this.customerName = '';
    this.customerEmail = '';
    this.customerPhone = '';
    this.notes = '';
    this.step = 1;
    this.success = '';
  }

  getDayOfWeek(dateStr: string): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateStr + 'T00:00:00');
    return days[date.getDay()];
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  }
}
