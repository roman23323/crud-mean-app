import { Component } from '@angular/core';
import { Contact, ContactService } from '../services/contact.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  contacts: Contact[] = [];
  loading = true;

  newName: string = '';
  newPhone: string = '';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.contactService.getAll().subscribe({
      next: (data) => {
        this.contacts = data;
        this.loading = false;
      },
      error: () => {
        alert('Ошибка загрузки');
        this.loading = false;
      }
    });
  }

  addContact() {
    if (!this.newName.trim() || !this.newPhone.trim()) {
      alert('Заполни имя и email');
      return;
    }

    const newUser: Contact = {
      name: this.newName,
      phone: this.newPhone
    };

    this.contactService.create(newUser).subscribe({
      next: (createdContact) => {
        this.contacts.unshift(createdContact);  // добавляем в начало списка
        this.newName = '';
        this.newPhone = '';
      },
      error: () => alert('Не удалось добавить')
    });
  }

  delete(name: string) {
    this.contactService.delete(name).subscribe(() => {
      this.contacts = this.contacts.filter(c => c.name !== name);
    });
  }
}
