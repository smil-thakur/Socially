import { Component, inject, Input } from '@angular/core';
import { dummyData } from '../../enums/dummy-data';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/helm/card';
import { OnlyBackNavBar } from '../../common/only-back-nav-bar/only-back-nav-bar';
import { HlmLabelDirective } from '@spartan-ng/helm/label';
import {
  HlmErrorDirective,
  HlmFormFieldComponent,
} from '@spartan-ng/helm/form-field';
import { HlmInputDirective } from '@spartan-ng/helm/input';
import { BasePageScreen } from '../../common/base-page-screen/base-page-screen';
import { UserService } from '../../services/user-service';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  HlmAccordionContentComponent,
  HlmAccordionDirective,
  HlmAccordionIconDirective,
  HlmAccordionItemDirective,
  HlmAccordionTriggerDirective,
} from '@spartan-ng/helm/accordion';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { lucideChevronDown, lucideInfo } from '@ng-icons/lucide';
import { HlmTooltipTriggerDirective } from '@spartan-ng/helm/tooltip';

@Component({
  selector: 'app-analytics-screen',
  imports: [
    HlmCardDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
    HlmCardHeaderDirective,
    HlmCardDescriptionDirective,
    HlmLabelDirective,
    HlmInputDirective,
    HlmFormFieldComponent,
    OnlyBackNavBar,
    HlmButtonDirective,
    HlmCardFooterDirective,
    HlmAccordionItemDirective,
    HlmAccordionTriggerDirective,
    HlmAccordionIconDirective,
    HlmAccordionContentComponent,
    HlmAccordionDirective,
    NgIcon,
    HlmIconDirective,
    HlmTooltipTriggerDirective,
  ],
  templateUrl: './analytics-screen.html',
  styleUrl: './analytics-screen.scss',
  providers: [
    provideIcons({
      lucideChevronDown,
      lucideInfo,
    }),
  ],
})
export class AnalyticsScreen extends BasePageScreen {
  private userService = inject(UserService);
  public dummyData = dummyData;
  public userProfileURL = this.userService.getCurrentUserObject().photoURL;
}
