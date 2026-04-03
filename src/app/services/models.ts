export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  in_stock: number;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
}

export interface Stylist {
  id: number;
  name: string;
  specialties: string;
  image_url: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Availability {
  date: string;
  stylist_id: number | null;
  available_slots: string[];
  booked_slots: string[];
}

export interface BookingRequest {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service_id: number;
  stylist_id: number;
  appointment_date: string;
  appointment_time: string;
  notes?: string;
}

export interface BookingResponse {
  id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service_id: number;
  stylist_id: number;
  appointment_date: string;
  appointment_time: string;
  notes: string;
  status: string;
  created_at: string;
  service_name?: string;
  service_price?: number;
  duration?: number;
  stylist_name?: string;
}
