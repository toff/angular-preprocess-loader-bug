import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// @ifdef DEBUG
import { DevonlyComponent } from './devonly.component';
// @endif

@NgModule({
  declarations: [
    AppComponent,
    // @ifdef DEBUG
    DevonlyComponent
    // @endif
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

    constructor() {
        // @ifndef DEBUG
        console.log("Log only in PRODUCTION");
        // @endif

        // @ifdef DEBUG
        console.log("Log only in DEBUG");
        // @endif
    }

}
