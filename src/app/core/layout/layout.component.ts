import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { Toolbar } from 'primeng/toolbar';
import { DarkModeSwitchComponent } from "../components/dark-mode-switch/dark-mode-switch.component";
import { Avatar } from 'primeng/avatar';

@Component({
  selector: 'main-layout',
  imports: [
    CommonModule,
    Toolbar,
    Avatar,
    DarkModeSwitchComponent,
  ],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {

  protected avatarSrc = signal('https://avatars.githubusercontent.com/u/73889711');

}
