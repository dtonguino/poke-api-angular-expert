import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, RouterLink],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {
	private router = inject(Router);
	private breakpointObserver = inject(BreakpointObserver);
	isMobileMenuOpen = signal(false);
	isMobile = signal(false);
	currentRoute = signal('');

	constructor() {
		this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
			this.isMobile.set(result.matches);
			if (!result.matches) {
				this.isMobileMenuOpen.set(false);
			}
		});
	}

	ngOnInit() {
		this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
			this.currentRoute.set(event.urlAfterRedirects);
		});
	}

	toggleMobileMenu() {
		this.isMobileMenuOpen.update((state) => !state);
	}
}
