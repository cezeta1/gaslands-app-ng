import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ScrollTop } from "primeng/scrolltop";
import { LIB_VERSION } from "../../../../version";
import { ThemeService } from "../../services/themes/theme.service";
import { FooterComponent } from "./footer/footer.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";

@Component({
  selector: 'main-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    NavBarComponent,
    FooterComponent,
    ScrollTop
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  
  protected LIB_VERSION = LIB_VERSION;

  protected themeService = inject(ThemeService);

  protected avatarSrc = signal('https://avatars.githubusercontent.com/u/73889711');
}
