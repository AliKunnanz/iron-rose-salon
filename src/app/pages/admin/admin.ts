import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalonApiService, Message } from '../../services/salon-api.service';
import { BookingResponse } from '../../services/models';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  bookings: BookingResponse[] = [];
  filteredBookings: BookingResponse[] = [];
  messages: Message[] = [];
  loading = true;
  
  activeTab: 'bookings' | 'messages' = 'bookings';
  
  filterDate: string = '';
  filterStatus: string = '';
  selectedBooking: BookingResponse | null = null;
  selectedMessage: Message | null = null;
  
  statuses = ['confirmed', 'completed', 'cancelled', 'no-show'];

  constructor(private api: SalonApiService) {}

  ngOnInit(): void {
    this.loadBookings();
    this.loadMessages();
  }

  loadBookings(): void {
    this.loading = true;
    this.api.getBookings(this.filterDate || undefined, this.filterStatus || undefined).subscribe({
      next: (data) => {
        this.bookings = data;
        this.filteredBookings = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load bookings:', err);
        this.loading = false;
      }
    });
  }

  loadMessages(): void {
    this.api.getMessages().subscribe({
      next: (data) => this.messages = data,
      error: (err) => console.error('Failed to load messages:', err)
    });
  }

  applyFilters(): void {
    this.loadBookings();
  }

  clearFilters(): void {
    this.filterDate = '';
    this.filterStatus = '';
    this.loadBookings();
  }

  viewDetails(booking: BookingResponse): void {
    this.selectedBooking = booking;
  }

  closeModal(): void {
    this.selectedBooking = null;
    this.selectedMessage = null;
  }

  viewMessage(message: Message): void {
    this.selectedMessage = message;
    if (!message.read) {
      this.api.markMessageRead(message.id).subscribe({
        next: () => {
          message.read = 1;
          this.loadMessages();
        }
      });
    }
  }

  deleteMessage(id: number): void {
    if (confirm('Are you sure you want to delete this message?')) {
      this.api.deleteMessage(id).subscribe({
        next: () => {
          this.loadMessages();
          this.selectedMessage = null;
        }
      });
    }
  }

  updateStatus(id: number, status: string): void {
    this.api.updateBookingStatus(id, status).subscribe({
      next: () => {
        this.loadBookings();
        if (this.selectedBooking && this.selectedBooking.id === id) {
          this.selectedBooking.status = status;
        }
      },
      error: (err) => console.error('Failed to update status:', err)
    });
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  }

  formatDateTime(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'confirmed': return 'status-confirmed';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      case 'no-show': return 'status-noshow';
      default: return '';
    }
  }

  getTodayCount(): number {
    const today = new Date().toISOString().split('T')[0];
    return this.bookings.filter(b => b.appointment_date === today && b.status === 'confirmed').length;
  }

  getUpcomingCount(): number {
    const today = new Date().toISOString().split('T')[0];
    return this.bookings.filter(b => b.appointment_date >= today && b.status === 'confirmed').length;
  }

  getCompletedCount(): number {
    return this.bookings.filter(b => b.status === 'completed').length;
  }

  getUnreadMessagesCount(): number {
    return this.messages.filter(m => !m.read).length;
  }
}
