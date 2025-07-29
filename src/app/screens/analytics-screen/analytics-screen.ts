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
import { HlmFormFieldModule } from '@spartan-ng/helm/form-field';
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
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
    if (this.experiences.length === 0) {
      this.addExperience();
    }
    if (this.projects.length === 0) {
      this.addProject();
    }
  }
  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  public dummyData = dummyData;
  public userProfileURL = this.userService.getCurrentUserObject().photoURL;

  public userDataForm = this.fb.group({
    fullname: ['', Validators.required],
    title: ['', Validators.required],
    summary: ['', Validators.required],
    educations: this.fb.array([]),
    experiences: this.fb.array([]),
    projects: this.fb.array([]),
  });

  get educations(): FormArray {
    return this.userDataForm.get('educations') as FormArray;
  }

  get experiences(): FormArray {
    return this.userDataForm.get('experiences') as FormArray;
  }

  get projects(): FormArray {
    return this.userDataForm.get('projects') as FormArray;
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
    degree?.markAsTouched();
    institution?.updateValueAndValidity({ emitEvent: false });
    institution?.markAsTouched();
    year?.updateValueAndValidity({ emitEvent: false });
    year?.markAsTouched();
  }

  private updateExperienceValidators(group: FormGroup) {
    const role = group.get('role');
    const company = group.get('company');
    const years = group.get('years');
    const summary = group.get('summary');

    const roleValue = role?.value?.trim() || '';
    const companyValue = company?.value?.trim() || '';
    const yearsValue = years?.value?.trim() || '';
    const summaryValue = summary?.value.trim() || '';

    // Check if any field has a value
    const hasAnyValue = roleValue || companyValue || yearsValue || summaryValue;

    console.log(hasAnyValue);

    if (hasAnyValue) {
      // If any field has value, make all fields required
      role?.setValidators(Validators.required);
      company?.setValidators(Validators.required);
      years?.setValidators(Validators.required);
      summary?.setValidators(Validators.required);
      console.log('setting validations');
    } else {
      // If all fields are empty, remove validators
      role?.clearValidators();
      company?.clearValidators();
      years?.clearValidators();
      summary?.clearValidators();
    }
    // Update validity
    role?.updateValueAndValidity({ emitEvent: false });
    role?.markAsTouched();
    company?.updateValueAndValidity({ emitEvent: false });
    company?.markAsTouched();
    years?.updateValueAndValidity({ emitEvent: false });
    years?.markAsTouched();
    summary?.updateValueAndValidity({ emitEvent: false });
    summary?.markAsTouched();
  }

  private updateProjectValidators(group: FormGroup) {
    const name = group.get('name');
    const techStack = group.get('techStack');
    const year = group.get('year');
    const summary = group.get('summary');

    const nameValue = name?.value?.trim() || '';
    const techStackValue = techStack?.value?.trim() || '';
    const yearValue = year?.value || '';
    const summaryValue = summary?.value.trim() || '';

    // Check if any field has a value
    const hasAnyValue =
      nameValue || techStackValue || yearValue || summaryValue;

    console.log(hasAnyValue);

    if (hasAnyValue) {
      // If any field has value, make all fields required
      name?.setValidators(Validators.required);
      techStack?.setValidators(Validators.required);
      year?.setValidators(Validators.required);
      summary?.setValidators(Validators.required);
    } else {
      // If all fields are empty, remove validators
      name?.clearValidators();
      techStack?.clearValidators();
      year?.clearValidators();
      summary?.clearValidators();
    }
    // Update validity
    name?.updateValueAndValidity({ emitEvent: false });
    name?.markAsTouched();
    techStack?.updateValueAndValidity({ emitEvent: false });
    techStack?.markAsTouched();
    year?.updateValueAndValidity({ emitEvent: false });
    year?.markAsTouched();
    summary?.updateValueAndValidity({ emitEvent: false });
    summary?.markAsTouched();
  }

  public userExperiences: Experience[] = [];
  public userEducations: Education[] = [];
  public userProjects: Project[] = [];
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

  public addExperience() {
    const group = this.fb.group({
      role: [''],
      company: [''],
      years: [''],
      summary: [''],
    });
    group.valueChanges.subscribe(() => this.updateExperienceValidators(group));
    this.experiences.push(group);
  }

  public addProject() {
    const group = this.fb.group({
      name: [''],
      techStack: [''],
      year: [''],
      summary: [''],
    });
    group.valueChanges.subscribe(() => this.updateProjectValidators(group));
    this.projects.push(group);
  }

  public removeEducation(index: number) {
    if (this.educations.length > 1) {
      this.educations.removeAt(index);
    }
  }

  public removeExperience(index: number) {
    if (this.experiences.length > 1) {
      this.experiences.removeAt(index);
    }
  }

  public removeProject(index: number) {
    if (this.projects.length > 1) {
      this.projects.removeAt(index);
    }
  }
}
