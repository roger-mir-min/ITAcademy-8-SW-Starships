import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  @Input() message = '';

  constructor() { }

  ngOnInit() {
    console.log("Spinner on.");
  }

  ngOnDestroy() {
    console.log("Spinner off.");
  }
}
