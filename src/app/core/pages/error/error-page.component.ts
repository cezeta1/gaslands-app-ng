import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Avatar } from "primeng/avatar";

@Component({
  selector: 'error-page',
  imports: [Avatar],
  templateUrl: './error-page.component.html'
})
export class ErrorPageComponent {
  private _router = inject(Router);
  private _errorState = this._router.lastSuccessfulNavigation?.extras?.state;
}
