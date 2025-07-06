import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateServerLoader } from './components/translate-server.loader';
import { provideClientHydration } from '@angular/platform-browser';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    provideClientHydration(),
    { provide: TranslateLoader, useClass: TranslateServerLoader },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
