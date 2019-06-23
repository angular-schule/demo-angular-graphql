import { Component } from '@angular/core';
;
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  books$ = this.service.getAll();

  constructor(private service: BookStoreService) { }
}
