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
	isMobileMenuOpen = signal(false);
	currentRoute = signal('');

	ngOnInit() {
		this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
			this.currentRoute.set(event.urlAfterRedirects);
		});
	}

	toggleMobileMenu() {
		this.isMobileMenuOpen.update((state) => !state);
	}
}
