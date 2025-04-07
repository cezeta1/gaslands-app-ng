import { Component, inject, Injector, input, OnInit, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { AbstractControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslatePipe } from "@ngx-translate/core";
import { CheckboxModule } from 'primeng/checkbox';
import { cz_takeUntilDestroyed } from "../../../utils";
import { CZErrorConfig } from "./cz-error-message.config";

@Component({
  selector: 'cz-form-error-message',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe,
    CheckboxModule
  ],
  templateUrl: './cz-form-error-message.component.html'
})
export class CZFormErrorMessageComponent implements OnInit {
  
  private _inj = inject(Injector);

  public form = input.required<AbstractControl<any,any>| null>();
  public labelInput = input<string>("", { alias: "label" });

  protected currentMessage = signal<string>("");
  protected messagePayload = {};

  // --- NG Methods --- //
  
  ngOnInit(): void {
    toObservable(this.labelInput, { injector: this._inj })
      .pipe(cz_takeUntilDestroyed(this._inj))
      .subscribe(_ => this._applyDefaultMessagePayload());
    
    this.form()?.statusChanges
      .pipe(cz_takeUntilDestroyed(this._inj))
      .subscribe(_ => this._updateMessages());
  }

  // --- Private Methods --- //

  private _updateMessages() {

    if (!this.form()?.errors || this.form()?.pristine) {
      this.currentMessage.set("");
      return;
    }

    var errorTypes = Object.keys(this.form()?.errors ?? {})
    const foundErrors = CZErrorConfig.filter(c => errorTypes.includes(c.error));

    if (foundErrors.length == 0) {
      this.currentMessage.set("default");
      return;
    }

    // Take the first error found as priority
    this.currentMessage.set(foundErrors[0].message);
    this.messagePayload = foundErrors[0]
      ?.getInterpolationData?.(this.form()?.errors?.[foundErrors[0].error] ?? {})
      ?? {}

    this._applyDefaultMessagePayload();
  }

  private _applyDefaultMessagePayload() {
    this.messagePayload = {
      ...this.messagePayload,
      label: !!this.labelInput() ? this.labelInput() : "Input"
    }
  }
}