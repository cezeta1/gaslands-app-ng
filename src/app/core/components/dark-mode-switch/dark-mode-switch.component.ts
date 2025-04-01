import { Component, inject, input } from "@angular/core";
import { ButtonModule } from 'primeng/button';
import { ThemeService } from "../../services/themes/theme.service";

@Component({
  selector: 'dark-mode-switch',
  imports: [ButtonModule],
  templateUrl: './dark-mode-switch.component.html'
})
export class DarkModeSwitchComponent {
  protected themeService = inject(ThemeService);
  
  public rounded = input<boolean>(false);

  protected onDarkModeSwitch = () =>    
    this.themeService.toggleDarkMode();
}
