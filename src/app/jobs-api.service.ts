import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, Signal, inject, signal, computed } from '@angular/core';

export interface JobsRoot {
  jobs: Job[]
}

export interface Job {
  title: string
  teaser: string
  released?: string
  deadline?: string
  link: string
  scraped_from: string
  company: string | undefined;
  locations: string[];
  image_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobsApiService {
  private http: HttpClient = inject(HttpClient);
  public jobs$: WritableSignal<Job[]> = signal([]);
  public result: WritableSignal<Job[]> = signal([]);

  constructor() {
    this.http.get<JobsRoot>('https://hono-cloudflare-workers.marcusellested02.workers.dev').subscribe(data => {
      console.table(data.jobs);
      this.jobs$.set(data.jobs);
      this.result.set(data.jobs); // Initialize result with all jobs
    });
  }

  public searchForProject(searchString: string) {
    if (!searchString) {
        this.result.set(this.jobs$());
        return;
    }
    const lowerCaseSearchString = searchString.toLowerCase();
    this.result.set(this.jobs$().filter((project) =>
        project.title.toLowerCase().includes(lowerCaseSearchString) ||
        project.teaser.toLowerCase().includes(lowerCaseSearchString)
    ));
    console.log(this.result());
  }

  public getJobs(): Signal<Job[]> {
    return this.jobs$.asReadonly();
  }

  public getSearchedJobs(): Signal<Job[]> {
    return this.result.asReadonly();
  }
}
