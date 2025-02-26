import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { CustomPreloadingStrategy } from './custom-preloading.strategy';

export const appConfig: ApplicationConfig = {
	providers: [
		CustomPreloadingStrategy,
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes, withPreloading(CustomPreloadingStrategy)),
		provideHttpClient()
	]
};
