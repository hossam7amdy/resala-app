import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Amplify } from 'aws-amplify';

import { AppModule } from './app/app.module';
import { config } from './configurations';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

Amplify.configure({
  Auth: config.amplifyAuth,
});

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
