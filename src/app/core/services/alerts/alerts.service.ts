import { inject, Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

export type AlertSeverity = 'success' | 'info' | 'warn' | 'error' | 'contrast' | 'secondary'

@Injectable({
  providedIn: 'root',
})
export class AlertsService {

  private _msgService = inject(MessageService);

  public showAlert(
    severity?: AlertSeverity, 
    title?: string, 
    content?: string
  ): void {
    this._msgService.add({
      severity: severity ?? 'info', 
      summary: title ?? '', 
      detail: content ?? '',
      life: 3000,
      key: 'app-alert'
    })
  }

  public showInfo = (title?: string, content?: string): void => this.showAlert('info', title, content);
  public showSuccess = (title?: string, content?: string): void => this.showAlert('success', title, content);
  public showWarn = (title?: string, content?: string): void => this.showAlert('warn', title, content);
  public showError = (title?: string, content?: string): void => this.showAlert('error', title, content);
}