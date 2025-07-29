import { Component, inject, Input, OnInit } from '@angular/core';
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
  HlmFormFieldModule,
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
import { lucideChevronDown, lucideInfo, lucideTrash } from '@ng-icons/lucide';
import { HlmTooltipTriggerDirective } from '@spartan-ng/helm/tooltip';
import {
  Education,
  Experience,
  Project,
  ResumeData,
} from '../../interfaces/ResumeData';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { HlmSelectModule } from '@spartan-ng/helm/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics-screen',
  imports: [
    HlmCardDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
    HlmCardHeaderDirective,
    HlmCardDescriptionDirective,

    ReactiveFormsModule,
    HlmFormFieldModule,
    HlmInputDirective,
    HlmLabelDirective,

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
    CommonModule,
  ],
  templateUrl: './analytics-screen.html',
  styleUrl: './analytics-screen.scss',
  providers: [
    provideIcons({
      lucideChevronDown,
      lucideInfo,
      lucideTrash,
    }),
  ],
})
export class AnalyticsScreen extends BasePageScreen implements OnInit {
  ngOnInit(): void {
    if (this.educations.length === 0) {
      this.addEducation();
    }
  }
  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  public dummyData = dummyData;
  public userProfileURL = this.userService.getCurrentUserObject().photoURL;

  public userDataForm = this.fb.group({
    educations: this.fb.array([]),
  });

  get educations(): FormArray {
    return this.userDataForm.get('educations') as FormArray;
  }

  private updateEducationValidators(group: FormGroup) {
    const degree = group.get('degree');
    const institution = group.get('institution');
    const year = group.get('year');

    const degreeValue = degree?.value?.trim() || '';
    const institutionValue = institution?.value?.trim() || '';
    const yearValue = year?.value?.trim() || '';

    // Check if any field has a value
    const hasAnyValue = degreeValue || institutionValue || yearValue;

    console.log(hasAnyValue);

    if (hasAnyValue) {
      // If any field has value, make all fields required
      degree?.setValidators(Validators.required);
      institution?.setValidators(Validators.required);
      year?.setValidators(Validators.required);
      console.log('setting validations');
    } else {
      // If all fields are empty, remove validators
      degree?.clearValidators();
      institution?.clearValidators();
      year?.clearValidators();
    }
    // Update validity
    degree?.updateValueAndValidity({ emitEvent: false });
    degree?.markAllAsTouched();
    institution?.updateValueAndValidity({ emitEvent: false });
    institution?.markAllAsTouched();
    year?.updateValueAndValidity({ emitEvent: false });
    year?.markAllAsTouched();
  }

  public userExperiences: Experience[] = [
    {
      role: '',
      company: '',
      years: '',
      summary: '',
    },
  ];
  public userEducations: Education[] = [];
  public userProjects: Project[] = [
    {
      name: '',
      techstack: [],
      year: '',
      summary: '',
    },
  ];
  public userSkills: string[] = [];

  public userData: ResumeData = {
    fullName: '',
    title: '',
    summary: '',
    skills: this.userSkills,
    educations: this.userEducations,
    experiences: this.userExperiences,
    projects: this.userProjects,
  };

  public addEducation() {
    const group = this.fb.group({
      degree: [''],
      institution: [''],
      year: [''],
    });

    group.valueChanges.subscribe(() => this.updateEducationValidators(group));
    this.educations.push(group);
  }

  public removeEducation(index: number) {
    if (this.educations.length > 1) {
      this.educations.removeAt(index);
    }
  }
}
