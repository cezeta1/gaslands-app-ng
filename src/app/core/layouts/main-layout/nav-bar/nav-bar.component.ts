import { Component, signal } from "@angular/core";
import { Toolbar } from 'primeng/toolbar';
import { Avatar } from 'primeng/avatar';
import { LangSelectorComponent } from "../../../components/lang-selector/lang-selector.component";
import { DarkModeSwitchComponent } from "../../../components/dark-mode-switch/dark-mode-switch.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'nav-bar',
  imports: [
    CommonModule,
    Toolbar,
    Avatar,
    DarkModeSwitchComponent,
    LangSelectorComponent
  ],
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {
  protected avatarSrc = signal('https://avatars.githubusercontent.com/u/73889711');
}