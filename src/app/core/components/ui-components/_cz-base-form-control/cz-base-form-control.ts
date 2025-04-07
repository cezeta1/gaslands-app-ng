import { inject, Injector } from "@angular/core";
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NgControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { forEach, mapValues, pickBy } from "lodash";
import { map } from "rxjs";
import { cz_debounceUntilChanged, cz_takeUntilDestroyed } from "../../../utils";

export abstract class CZBaseInputWithControl implements ControlValueAccessor {
  
  private _inj = inject(Injector);
  private _fb = inject(FormBuilder);
  private _ngControl = inject(NgControl, { self: true, optional: false });

  protected internalForm!: FormGroup;

  constructor() {
    if (this._ngControl)
      this._ngControl.valueAccessor = this;
  }

  /* ========================== Cz Base Input ========================== */
  //
  //  Base input class for all "cz" wrapper inputs. 
  //    Creates an interface between the parent formGroup/Control and the internalForm.
  //
  //    How to use:
  //     *  extend from this class.
  //     *  onInit, call "initInternalForm".
  //     *  override necessary methods. "formControlsMap" is REQUIRED
  //    
  //     --- Overridable methods --
  //
  //     * formControlsMap   => called on constructor. Creates internal form structure. *REQUIRED OVERRIDE* 
  //     * inboundMap        => called when Angular wants to update control's internal value.
  //     * outboundMap       => called when the control's value changes.
  //     * onDisableChange   => called when parent formControl's disabled state changes.
  //     * onValidatorChange => called when parent formControl's Validators change.
  //     * onTouched         => called when internal formControl is touched. (currently not in use - to test -)
  //
  /* ======================================================================= */

  protected initInternalForm() {
    // Build internal form using overriden method
    this.internalForm = this._fb.group(
      this.formControlsMap(this._ngControl.control?.value)
    );
    
    // Let parent control know of any internal changes
    this.internalForm.valueChanges
      .pipe(cz_takeUntilDestroyed(this._inj)) 
      .subscribe(_ => this._onChange(_));
    
    // React upon validator changes on parent control
    this._updateInternalValidators();
    this._ngControl.control?.statusChanges
      .pipe(
        map(_ => this._ngControl.control?.validator),
        cz_debounceUntilChanged(),
        cz_takeUntilDestroyed(this._inj)
      )
      .subscribe(_ => this._updateInternalValidators());

    // Initialize disabled state
    const isDisabled = !!this._ngControl.control?.disabled;
    if (isDisabled) 
      this.onDisableChange(isDisabled);
  }

  protected hasValidator = (fn: ValidatorFn) => 
    this._ngControl.control?.hasValidator(fn)
      ?? false;

  // --- Overridable Methods --- //
 
  protected abstract formControlsMap: (inboundVal: any) => { [k: string]: any[] }
  
  protected inboundMap: (_: any) => any = this._defaultInboundMap;
  protected outboundMap: (_: any) => any = this._defaultOutboundMap;
  protected onDisableChange: (isDisabled: boolean) => void = this._defaultSetDisabled;
  protected onValidatorChange: (newValidators: ValidatorFn[]) => void = () => {};
  protected onTouched: () => void = this._defaultOnTouched;

  // --- Private Methods --- //

  private _updateInternalValidators() {

    this._ngControl.control?.removeValidators(this._mirroringValidator);

    const newValidators = this._ngControl?.control?.['_rawValidators' as keyof AbstractControl<any,any>];

    this.onValidatorChange(newValidators);
    this._updateInternalFormControls();

    this._ngControl.control?.addValidators(this._mirroringValidator);
    this._ngControl.control?.updateValueAndValidity({ onlySelf: true, emitEvent: false });
  }

  private _updateInternalFormControls() {
    this._forEachInternalCtrl(c => c.updateValueAndValidity({ onlySelf: true }));
  }

  private _forEachInternalCtrl = (fn: (c: AbstractControl<any, any>) => void) => 
    forEach(this.internalForm?.controls, c => fn(c));

  // --- ControlValueAccesor Interface --- //

  //** DO NOT OVERRIDE THESE **//
  
  private _onChange = (_: any) => {};
  private _onTouched = () => {};

  writeValue(_: any): void { this.internalForm?.setValue(this.inboundMap(_)) }
  registerOnChange(fn: any): void { this._onChange = (_) => { fn(this.outboundMap(_)) }}
  registerOnTouched(fn: any): void { this._onTouched = () => { this.onTouched(); fn(); }}
  setDisabledState?(_: boolean): void { this.onDisableChange(_) }

  // ------------------------------------- //

  private _mirroringValidator: ValidatorFn = (_: AbstractControl): ValidationErrors | null => {
    const ks = Object.keys(this.internalForm.controls);
    return ks.length == 1
      ? this.internalForm.controls[ks[0]].errors
      : this._getInternalErrors();
  };

  private _getInternalErrors() {
    
    const errors = {} as ValidationErrors;

    forEach(
      Object.keys(this.internalForm.controls), 
      k => {
        const e = this.internalForm.controls[k].errors;
        if (!!e) errors[k] = { ...e }; 
      });
    
    const l = Object.keys(errors).length;
    return (l > 0) ? errors : null;
  }

  // --- Default overridable method implementations --- //

  private _defaultInboundMap(inboundVal: any) {
    const ctrlKeyList = Object.keys(this.internalForm.controls);
        
    // If internalForm only has a single control, assign the full value
    if (ctrlKeyList.length == 1)
      return { [ctrlKeyList[0]]: inboundVal };

    // If internal form has multiple controls, try to map props by control name
    var newVals = mapValues(
      this.internalForm.controls,
      (_, k) => inboundVal?.[k] ?? undefined);
    newVals = pickBy(newVals, v => !!v);

    return {
      ...this.internalForm.value,
      ...newVals
    };
  }

  private _defaultOutboundMap(outboundValue: any) { 
    const ctrlKeyList = Object.keys(this.internalForm.controls)

    // If internalForm only has a single control, only return that value
    // If not, return the full object
    return (ctrlKeyList.length == 1) 
      ? outboundValue[ctrlKeyList[0]]
      : outboundValue;
  }

  private _defaultSetDisabled(isDisabled: boolean) { 
    this._forEachInternalCtrl(c => { isDisabled ? c.disable() : c.enable() });
  }
  
  private _defaultOnTouched() { 
    this._forEachInternalCtrl(c => c.markAllAsTouched());
  }
}