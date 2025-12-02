import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Contact {
  _id?: string;
  name: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = '/api/contacts';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/contacts`);
  }

  getByName(name: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/contact/${name}`);
  }

  create(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.apiUrl}/contact`, contact);
  }

  update(name: string, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/contact/${name}`, contact);
  }

  delete(name: string): Observable<Contact> {
    return this.http.delete<Contact>(`${this.apiUrl}/contact/${name}`);
  }
}
