import { Component, input } from '@angular/core';

@Component({
  selector: 'app-promotion-footer',
  imports: [],
  templateUrl: './promotion-footer.html',
  styleUrl: './promotion-footer.scss',
})
export class PromotionFooter {
  title = input.required<string>();
}
