import { Component, input } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FloatLabel } from "primeng/floatlabel";

@Component({
  selector: 'cz-float-label',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FloatLabel
  ],
  templateUrl: './cz-float-label.component.html'
})
export class CZFloatLabelComponent {
  // Input / Outputs //
  public labelText = input<string>();
  public showRequiredDot = input<boolean>(true);
  public useTranslate = input<boolean>(true);
}