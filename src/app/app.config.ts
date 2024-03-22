import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';

const firebaseConfig = {
  apiKey: "AIzaSyAp2GxwaKullAiPLoBpPFZVyKGQ4kxBiZU",
  authDomain: "medicine-2c6a4.firebaseapp.com",
  projectId: "medicine-2c6a4",
  storageBucket: "medicine-2c6a4.appspot.com",
  messagingSenderId: "912131669530",
  appId: "1:912131669530:web:264c057e104ee195aa5ba3"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
    ])
  ]
};
