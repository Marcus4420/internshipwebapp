import { HttpClient } from '@angular/common/http';
import { Component, Signal, inject, signal } from '@angular/core';
import { Job, JobsApiService } from '../jobs-api.service';

@Component({
  selector: 'app-jobcard',
  standalone: true,
  imports: [],
  templateUrl: './jobcard.component.html',
  styleUrls: ['./jobcard.component.css']
})
export class JobcardComponent {
  private jobsAPIService: JobsApiService = inject(JobsApiService);
  public jobs$: Signal<Job[]> = this.jobsAPIService.getSearchedJobs();

  constructor() {}

  public searchForProject(searchString: string) {
    this.jobsAPIService.searchForProject(searchString);
  }

  public clearSearch(input: HTMLInputElement) {
    input.value = '';
    this.searchForProject('');
  }

  redirectTo(url: string) {
    window.open(url, '_blank');
  }
}
