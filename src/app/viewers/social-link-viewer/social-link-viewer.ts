import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-social-link-viewer',
  imports: [],
  templateUrl: './social-link-viewer.html',
  styleUrl: './social-link-viewer.scss',
})
export class SocialLinkViewer {
  id!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')!;
    });
  }
}
