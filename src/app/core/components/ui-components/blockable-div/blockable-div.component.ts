import { Component, ElementRef, inject } from '@angular/core';
import { BlockableUI } from 'primeng/api';

@Component({
  selector: 'blockable-div',
  template: `<ng-content></ng-content>`
})
export class BlockableDivComponent implements BlockableUI {
  private _el = inject(ElementRef);
  getBlockableElement = (): HTMLElement => this._el.nativeElement;
}

/*
  <cz-ui-blocker [target]="pnl" [blocked]="true"></cz-ui-blocker>

  <blockable-div #pnl>
    <!-- Content --> 
  </blockable-div>
*/