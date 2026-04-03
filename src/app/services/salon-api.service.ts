import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, Service, Stylist, Availability, BookingRequest, BookingResponse } from './models';

export interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  read: number;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class SalonApiService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/services`);
  }

  getStylists(): Observable<Stylist[]> {
    return this.http.get<Stylist[]>(`${this.apiUrl}/stylists`);
  }

  getAvailability(date: string, stylistId?: number): Observable<Availability> {
    let params = new HttpParams().set('date', date);
    if (stylistId) {
      params = params.set('stylist_id', stylistId.toString());
    }
    return this.http.get<Availability>(`${this.apiUrl}/availability`, { params });
  }

  createBooking(booking: BookingRequest): Observable<{ message: string; booking_id: number }> {
    return this.http.post<{ message: string; booking_id: number }>(`${this.apiUrl}/bookings`, booking);
  }

  getBookings(date?: string, status?: string): Observable<BookingResponse[]> {
    let params = new HttpParams();
    if (date) params = params.set('date', date);
    if (status) params = params.set('status', status);
    return this.http.get<BookingResponse[]>(`${this.apiUrl}/bookings`, { params });
  }

  updateBookingStatus(id: number, status: string): Observable<{ message: string }> {
    return this.http.patch<{ message: string }>(`${this.apiUrl}/bookings/${id}`, { status });
  }

  sendMessage(message: { name: string; email: string; phone?: string; service?: string; message?: string }): Observable<{ message: string; id: number }> {
    return this.http.post<{ message: string; id: number }>(`${this.apiUrl}/messages`, message);
  }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/messages`);
  }

  markMessageRead(id: number): Observable<{ message: string }> {
    return this.http.patch<{ message: string }>(`${this.apiUrl}/messages/${id}/read`, {});
  }

  deleteMessage(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/messages/${id}`);
  }
}
