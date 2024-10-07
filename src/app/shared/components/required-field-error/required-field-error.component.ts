import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: "app-required-field-error",
  templateUrl: "./required-field-error.component.html",
  styleUrls: ["./required-field-error.component.scss"],
  standalone: true
})
export class RequiredFieldErrorComponent implements OnInit {
  constructor() {
  }

  @Input()
  public formGroup: any;

  @Input()
  public field!: string;


  ngOnInit() {
  }
}
