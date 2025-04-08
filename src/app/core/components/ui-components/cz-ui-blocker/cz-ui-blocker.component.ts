import { Component, input } from '@angular/core';
import { BlockUI } from 'primeng/blockui';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'cz-ui-blocker',
  imports: [
    BlockUI,
    ProgressSpinner
  ],
  template: `
    <p-blockUI 
      styleClass="flex w-full items-center justify-center"
      [target]="target()" 
      [blocked]="blocked()" 
    >
      @if (showLoading()) {
        <p-progressSpinner ariaLabel="loading" />
      }
      <div>{{ text() }}</div>
    </p-blockUI>
  `
})
export class CZUIBlockerComponent {
  public target = input<any>();
  public blocked = input<boolean>(false);
  public text = input<string>('');
  public showLoading = input<boolean>(true);
}