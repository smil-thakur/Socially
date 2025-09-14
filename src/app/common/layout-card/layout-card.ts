import { Component, input } from '@angular/core';

@Component({
  selector: 'app-layout-card',
  imports: [],
  templateUrl: './layout-card.html',
  styleUrl: './layout-card.scss',
})
export class LayoutCard {
  type = input.required<
    'heroTop' | 'projectTop' | 'sidePanel' | 'gridLayout'
  >();
}
