import { Component } from '@angular/core';
import { OnlyBackNavBar } from '../../common/only-back-nav-bar/only-back-nav-bar';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';
import { StyleCard } from '../../common/style-card/style-card';
import { ColorPicker } from '../../common/color-picker/color-picker';
import { HlmLabel } from '@spartan-ng/helm/label';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { LayoutCard } from '../../common/layout-card/layout-card';
import { LayoutType } from '../../enums/layoutType';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-portfolio-screen',
  imports: [
    OnlyBackNavBar,
    HlmCardImports,
    HlmRadioGroupImports,
    StyleCard,
    ColorPicker,
    HlmLabel,
    BrnSelectImports,
    HlmSelectImports,
    LayoutCard,
    HlmButton,
  ],
  templateUrl: './portfolio-screen.html',
  styleUrl: './portfolio-screen.scss',
})
export class PortfolioScreen {
  public colorArray: string[] = [];
  public selectedColor: string | null = null;
  public selectedLayout: LayoutType | null = null;
  public minimalColor = [
    '#007BFF',
    '#FF6B6B',
    '#4CAF50',
    '#FFC107',
    '#00BCD4',
    '#6C757D',
    '#9C27B0',
  ];
  retroColors = ['#FF6B6B', '#FFC107', '#9C27B0', '#FF5722', '#795548'];
  modernColors = ['#007BFF', '#00BCD4', '#4CAF50', '#03A9F4', '#E91E63'];
  professionalColors = ['#007BFF', '#6C757D', '#4CAF50', '#343A40', '#212529'];
  public styleChange(event: string) {
    switch (event) {
      case 'monochrome':
        this.colorArray = [];
        break;
      case 'minimal':
        this.colorArray = this.minimalColor;
        break;
      case 'retro':
        this.colorArray = this.retroColors;
        break;
      case 'professional':
        this.colorArray = this.professionalColors;
        break;
      case 'modern':
        this.colorArray = this.modernColors;
        break;
      default:
        this.colorArray = [];
        break;
    }
  }
  public googleFontOptions: string[] = [
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Source Sans Pro',
    'Poppins',
    'Raleway',
    'Nunito',
    'Work Sans',
    'Press Start 2P',
  ];

  public layoutTypes: LayoutType[] = [
    'heroTop',
    'projectTop',
    'sidePanel',
    'gridLayout',
  ];

  public onSelectedColorChange(value: string) {
    this.selectedColor = value;
    console.log(this.selectedColor);
  }

  public onLayoutChange(value: LayoutType) {
    this.selectedLayout = value;
    console.log(this.selectedLayout);
  }
}
