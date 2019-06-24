import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'br-book',
  templateUrl: './book.component.html'
})
export class BookComponent {
  @Input() book: any;
}
