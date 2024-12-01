import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';

@Component({
  selector: 'app-termsandconditions',
  standalone: true,
  imports: [CommonModule, TranslateModule, SpinnerComponent],
  templateUrl: './termsandconditions.component.html',
  styleUrls: ['./termsandconditions.component.css'],
})
export class TermsandconditionsComponent implements OnInit {
  constructor() {}

  // start Custome Spinner
  customSpinIsLoading = false;
  //end Custome Spinner

  ngOnInit(): void {
    this.customSpinIsLoading = true;
    setInterval(() => {
      this.customSpinIsLoading = false;
    }, 1000);
  }
}
