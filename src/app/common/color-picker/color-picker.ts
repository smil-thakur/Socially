import { Component, input, output } from '@angular/core';
import { HlmSeparator } from '@spartan-ng/helm/separator';
@Component({
  selector: 'app-color-picker',
  imports: [HlmSeparator],
  templateUrl: './color-picker.html',
  styleUrl: './color-picker.scss',
})
export class ColorPicker {
  selectedColor = '';
  isCustomColor = false;
  public selectedColorChange = output<string>();
  public primaryColors = input.required<string[]>();

  constructor() {
    try {
      if (!this.primaryColors) {
        throw new Error('primaryColors is a required input.');
      }
    } catch (error) {
      console.error('Error in ColorPicker component:', error);
    }
  }

  onColorSelected(color: string) {
    this.selectedColor = color;
    this.isCustomColor = false;
    this.selectedColorChange.emit(color);
  }

  onColorpickerChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.isCustomColor = true;
    this.selectedColor = input.value;
    this.selectedColorChange.emit(input.value);
  }
}
