import { Component, inject, Input, OnInit, signal } from '@angular/core';
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
import { Router } from '@angular/router';
import { ResumeDataService } from '../../services/resume-data-service';
import { ResumeDataDTO } from '../../interfaces/ResumeDataDTO';
import { APIservice } from '../../services/apiservice';
import { API } from '../../enums/APIenums';
import { ErrorDialog } from '../../common/error-dialog/error-dialog';
import { HlmDialogService } from '@spartan-ng/helm/dialog';
import { InfoDialog } from '../../common/info-dialog/info-dialog';
import { PreloaderService } from '../../services/preloader-service';
import { isEqual } from 'lodash';

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
  protected readonly _isExperienceAccOpen = signal(false);
  protected readonly _isEducationAccOpen = signal(false);
  protected readonly _isProjectAccOpen = signal(false);
  private resumeDataService = inject(ResumeDataService);
  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private apiService = inject(APIservice);
  private readonly _hlmDialogService = inject(HlmDialogService);
  private preloaderService = inject(PreloaderService);
  public dummyData = dummyData;
  public userProfileURL = this.userService.getCurrentUserObject().photoURL;
  public resumeData = this.resumeDataService.resumeDataDTO;
  public initialFormData: any | null = null;
  public resumeDataSaved: ResumeData | null = null;
  public userDataForm = this.fb.group({
    fullName: ['', Validators.required],
    title: ['', Validators.required],
    summary: ['', Validators.required],
    skills: ['', Validators.required],
    educations: this.fb.array([]),
    experiences: this.fb.array([]),
    projects: this.fb.array([]),
  });

  ngOnInit(): void {
    this.loadSavedProfile();
  }

  public async loadSavedProfile() {
    this.preloaderService.show();
    try {
      this.resumeDataSaved =
        await this.resumeDataService.getResumeDataFirebase();
      if (this.resumeDataSaved) {
        this.setResumeDatatoForm(this.resumeDataSaved);
      } else {
        if (this.resumeData) {
          this.setResumeDatatoForm(this.resumeData);
        } else {
          if (this.educations.length === 0) this.addEducation();
          if (this.experiences.length === 0) this.addExperience();
          if (this.projects.length === 0) this.addProject();
        }
      }
      this.initialFormData = this.userDataForm.value;
      this.preloaderService.hide();
    } catch (err) {
      this.preloaderService.hide();
      this._hlmDialogService.open(ErrorDialog, {
        context: {
          error: 'Profile not loaded',
          desc: 'Sorry we are not able to fetch your saved profile, try again!',
        },
      });
    }
  }

  public setResumeDatatoForm(resumeData: ResumeDataDTO | ResumeData) {
    if (resumeData.fullName) {
      this.userDataForm.get('fullName')?.setValue(resumeData?.fullName!);
    }
    if (resumeData.title) {
      this.userDataForm.get('title')?.setValue(resumeData?.title!);
    }
    if (resumeData.summary) {
      this.userDataForm.get('summary')?.setValue(resumeData?.summary!);
    }
    if (resumeData.skills) {
      const skills = (resumeData?.skills ?? []).filter((s) => s !== null);
      this.userDataForm.get('skills')?.setValue(skills.join(', '));
    }
    if (resumeData.educations) {
      const educations = (resumeData?.educations ?? []).filter(
        (s) => s !== null
      );
      this.educations.clear();
      this._isEducationAccOpen.set(true);
      for (let i = 0; i < educations.length; i++) {
        const group = this.fb.group({
          degree: [educations[i]!.degree ?? '', Validators.required],
          institution: [educations[i]!.institution ?? '', Validators.required],
          year: [educations[i]!.year ?? '', Validators.required],
        });
        this.educations.push(group);
      }
    }
    if (resumeData.experiences) {
      const experiences = (resumeData.experiences ?? []).filter(
        (s) => s !== null
      );
      this.experiences.clear();
      this._isExperienceAccOpen.set(true);
      for (let i = 0; i < experiences.length; i++) {
        const group = this.fb.group({
          role: [experiences[i]!.role ?? '', Validators.required],
          company: [experiences[i]!.company ?? '', Validators.required],
          years: [experiences[i]!.years ?? '', Validators.required],
          summary: [experiences[i]!.summary ?? '', Validators.required],
        });
        this.experiences.push(group);
      }
    }
    if (resumeData.projects) {
      const projects = (resumeData.projects ?? []).filter((s) => s !== null);
      this.projects.clear();
      this._isProjectAccOpen.set(true);
      for (let i = 0; i < projects.length; i++) {
        const techstack = (projects[i]!.techstack ?? [])
          .filter((s) => s !== null)
          .join(', ');
        const group = this.fb.group({
          name: [projects[i]!.name ?? '', Validators.required],
          techstack: [techstack ?? '', Validators.required],
          year: [projects[i]!.year ?? '', Validators.required],
          summary: [projects[i]!.summary ?? '', Validators.required],
        });
        this.projects.push(group);
      }
    }
  }

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

    if (hasAnyValue) {
      // If any field has value, make all fields required
      degree?.setValidators(Validators.required);
      institution?.setValidators(Validators.required);
      year?.setValidators(Validators.required);
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

    if (hasAnyValue) {
      // If any field has value, make all fields required
      role?.setValidators(Validators.required);
      company?.setValidators(Validators.required);
      years?.setValidators(Validators.required);
      summary?.setValidators(Validators.required);
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
    const techstack = group.get('techstack');
    const year = group.get('year');
    const summary = group.get('summary');

    const nameValue = name?.value?.trim() || '';
    const techstackValue = techstack?.value?.trim() || '';
    const yearValue = year?.value || '';
    const summaryValue = summary?.value.trim() || '';

    // Check if any field has a value
    const hasAnyValue =
      nameValue || techstackValue || yearValue || summaryValue;

    if (hasAnyValue) {
      // If any field has value, make all fields required
      name?.setValidators(Validators.required);
      techstack?.setValidators(Validators.required);
      year?.setValidators(Validators.required);
      summary?.setValidators(Validators.required);
    } else {
      // If all fields are empty, remove validators
      name?.clearValidators();
      techstack?.clearValidators();
      year?.clearValidators();
      summary?.clearValidators();
    }
    // Update validity
    name?.updateValueAndValidity({ emitEvent: false });
    name?.markAsTouched();
    techstack?.updateValueAndValidity({ emitEvent: false });
    techstack?.markAsTouched();
    year?.updateValueAndValidity({ emitEvent: false });
    year?.markAsTouched();
    summary?.updateValueAndValidity({ emitEvent: false });
    summary?.markAsTouched();
  }

  public userExperiences: Experience[] = [];
  public userEducations: Education[] = [];
  public userProjects: Project[] = [];
  public userSkills: string[] = [];

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
      techstack: [''],
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

  public canSave() {
    if (this.initialFormData) {
      return isEqual(this.initialFormData, this.userDataForm.value);
    }
    return true;
  }

  public async saveProfile() {
    this.userDataForm.markAllAsTouched();
    this.userDataForm.markAllAsDirty();
    if (this.userDataForm.valid) {
      try {
        this.preloaderService.show();
        const educationData: Education[] = [];
        for (let i = 0; i < this.educations.controls.length; i++) {
          const tempEducation: Education = {
            degree: this.educations.controls[i].get('degree')?.value,
            institution: this.educations.controls[i].get('institution')?.value,
            year: this.educations.controls[i].get('year')?.value,
          };
          educationData.push(tempEducation);
        }
        const experienceData: Experience[] = [];
        for (let i = 0; i < this.experiences.controls.length; i++) {
          const tempExperience: Experience = {
            role: this.experiences.controls[i].get('role')?.value,
            company: this.experiences.controls[i].get('company')?.value,
            years: this.experiences.controls[i].get('years')?.value,
            summary: this.experiences.controls[i].get('summary')?.value,
          };
          experienceData.push(tempExperience);
        }
        const projectData: Project[] = [];
        for (let i = 0; i < this.projects.controls.length; i++) {
          const tempProject: Project = {
            name: this.projects.controls[i].get('name')?.value,
            techstack: (
              this.projects.controls[i].get('techstack')?.value as string
            )
              .split(',')
              .map((s) => s.trim()),
            year: this.projects.controls[i].get('year')?.value,
            summary: this.projects.controls[i].get('summary')?.value,
          };

          projectData.push(tempProject);
        }
        const resumeData: ResumeData = {
          fullName: this.userDataForm.get('fullName')?.value!,
          title: this.userDataForm.get('title')?.value!,
          summary: this.userDataForm.get('summary')?.value!,
          skills:
            this.userDataForm
              .get('skills')
              ?.value!.split(',')
              .map((s) => s.trim()) ?? [],
          educations: educationData,
          experiences: experienceData,
          projects: projectData,
        };
        await this.apiService.post(
          API.UPDATEUSERPROFILE,
          resumeData,
          await this.userService.getCurrentUserObject().getIdToken()
        );
        this.preloaderService.hide();
        this._hlmDialogService.open(InfoDialog, {
          context: {
            error: 'Profile Updated',
            desc: 'Your Profile is Updated Successfully',
          },
        });
      } catch (err) {
        this.preloaderService.hide();
        this._hlmDialogService.open(ErrorDialog, {
          context: {
            error: 'Unable to Update Your Profile',
            desc: `Please check internet connection or Try again ${err}`,
          },
        });
      }
    }
  }
}
