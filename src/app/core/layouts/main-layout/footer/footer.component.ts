import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Divider, DividerModule } from 'primeng/divider';
import { environment as env } from "../../../../../environments/environment";
import { Button } from "primeng/button";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: 'footer',
  imports: [ 
    CommonModule,
    TranslatePipe,
    Divider,
    Button
  ],
  template: `
    <p-divider styleClass="justify-self-center !w-[90%] !my-2" />

    <div class="flex flex-col w-full pt-0 pb-10 md:py-2 text-center *:w-full">
      <ng-container *ngTemplateOutlet="socials"></ng-container>
      <p class="italic text-xs md:text-sm mb-2">Take all your dreams, make your memories</p>
      <p class="text-xs opacity-75">Julián Czerweny - © {{ currentYear }} {{ 'footer.rights' | translate }}</p>
    </div>

    <ng-template #socials>
      <div class="inline-flex justify-center items-center gap-2 w-full">
        <ng-container *ngTemplateOutlet="socialBtn; context: { $implicit: 'email', icon: 'pi pi-envelope' }"></ng-container> 
        <!-- <nz-divider nzType="vertical"></nz-divider> -->
        <ng-container *ngTemplateOutlet="socialBtn; context: { $implicit: 'linkedin', icon: 'pi pi-linkedin' }"></ng-container>
        <!-- <nz-divider nzType="vertical"></nz-divider> -->
        <ng-container *ngTemplateOutlet="socialBtn; context: { $implicit: 'github', icon: 'pi pi-github' }"></ng-container>
      </div>
    </ng-template>

    <ng-template #socialBtn let-social let-icon="icon">
      <p-button
        text rounded
        size="small"
        styleClass="border-0"
        [icon]="icon"
        (click)="onSocialsClick(social)"
      />
    </ng-template>
  `
})
export class FooterComponent {

  protected currentYear = new Date().getFullYear();
  
  protected onSocialsClick(social: string) {
    let url = "";
    switch (social) {
      case 'email': url = `mailto:${env.links.email}`; break;
      case 'linkedin': url = env.links.linkedin; break;
      case 'github': url = env.links.github; break;
    }
    window.open(url, '_blank');
  }
}