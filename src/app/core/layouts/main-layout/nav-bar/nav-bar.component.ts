import { CommonModule } from "@angular/common";
import { Component, computed, inject, input, signal } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { TranslatePipe } from "@ngx-translate/core";
import { Avatar } from 'primeng/avatar';
import { TabsModule } from 'primeng/tabs';
import { Toolbar } from 'primeng/toolbar';
import { DarkModeSwitchComponent } from "../../../components/dark-mode-switch/dark-mode-switch.component";
import { LangSelectorComponent } from "../../../components/lang-selector/lang-selector.component";

export interface AppRouteTab {
  route: string, 
  label: string, 
  icon: string
}

@Component({
  selector: 'nav-bar',
  imports: [
    CommonModule,
    RouterModule,
    TranslatePipe,
    Toolbar,
    Avatar,
    TabsModule,
    DarkModeSwitchComponent,
    LangSelectorComponent
  ],
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {
  protected router = inject(Router);

  protected avatarSrc = signal('https://avatars.githubusercontent.com/u/73889711');
  
  protected showTabs = computed(() => !!this.tabs().length);
  protected tabs = input<AppRouteTab[]>([
    // { route: AppRoutesEnum.Home, label: 'home.title', icon: 'pi-home' },
    // { route: AppRoutesEnum.Projects, label: 'projects.title',  icon: 'pi-star' }
  ]);

  protected goHome = () => this.router.navigate(['./']);
}