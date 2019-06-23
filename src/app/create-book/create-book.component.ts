import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent {

  constructor(private bs: BookStoreService,
              private router: Router) { }

  bookForm = new FormGroup({
    isbn: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    title: new FormControl('', Validators.required),
    description: new FormControl('')
  });

  isInvalid(name: string) {
    const control = this.bookForm.get(name);
    return control.dirty && control.invalid;
  }

  hasError(name: string, errorCode: string) {
    const control = this.bookForm.get(name);
    return control.hasError(errorCode) && control.dirty;
  }

  submitForm() {
    this.bs.createBook(this.bookForm.value).subscribe(
      () => this.router.navigate(['dashboard'])
    );
  }
}
