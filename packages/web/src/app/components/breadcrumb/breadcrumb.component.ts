import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
// Import CommonModule
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
// Import RouterModule
import { BreadcrumbItem } from 'src/app/core/interfaces/breadcrumb-item';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
  imports: [CommonModule, RouterModule], // Add RouterModule here
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: BreadcrumbItem[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
      console.log('Breadcrumbs:', this.breadcrumbs); // Check the breadcrumbs array
    });
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadcrumbItem[] = []
  ): BreadcrumbItem[] {
    const children: ActivatedRoute[] = route.children;

    // Base case: if there are no more children, return the accumulated breadcrumbs
    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      // Only continue if routeURL is not empty
      if (routeURL) {
        url += `/${routeURL}`;
        breadcrumbs.push({ label: routeURL, url });

        // Debugging log
        console.log(`Added Breadcrumb: ${routeURL} | URL: ${url}`);
      }

      // Recursive call
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs; // Final return of breadcrumbs
  }
}
