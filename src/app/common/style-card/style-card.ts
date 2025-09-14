import { Component, input, output } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-style-card',
  imports: [],
  templateUrl: './style-card.html',
  styleUrl: './style-card.scss',
})
export class StyleCard {
  public title = input.required<string>();
  public desc = input.required<string>();
}
