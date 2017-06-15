 Sample project using angular and webpack preprocess-loader (https://www.npmjs.com/package/preprocess-loader).  
 This is NOT WORKING.

Main steps to reproduce :

1. Create a new project:  
```
$ ng new loader
$ cd loader
$ ng -v
@angular/cli: 1.1.1 (e)
node: 7.8.0
os: linux ia32
@angular/animations: 4.2.2
@angular/common: 4.2.2
@angular/compiler: 4.2.2
@angular/core: 4.2.2
@angular/forms: 4.2.2
@angular/http: 4.2.2
@angular/platform-browser: 4.2.2
@angular/platform-browser-dynamic: 4.2.2
@angular/router: 4.2.2
@angular/cli: 1.1.1
@angular/compiler-cli: 4.2.2
@angular/language-service: 4.2.2
```

2. Create a "devonly" component:  
`$ ng generate component devonly --flat`

3. Eject:  
`$ ng eject --target=production`

4. Add missing modules:
```
$ npm install
$ npm install preprocess-loader --save-dev
```

5. Modify webpack.config.js configuration to use preprocess-loader
```javascript
...
      {
        "test": /\.html$/,
        "use": [
          { loader: "raw-loader" },
          { loader: 'preprocess-loader' }
        ]
      },
...
      {
        "test": /\.ts$/,
        "use": [
          { loader: "@ngtools/webpack" },
          { loader: 'preprocess-loader' }
        ]
      }
...
```

6. Modify app.module.ts so the DevonlyComponent is only included in source in development.
```typescript
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
```

7. Same in app.component.html
```html
<!-- @ifdef DEBUG -->
<app-devonly></app-devonly>
<!-- @endif -->

<!-- @ifdef DEBUG -->
<p>DEBUG ONLY</p>
<!-- @endif -->

<!-- @ifndef DEBUG -->
<p>PRODUCTION ONLY</p>
<!-- @endif -->
```

8. Build the project:  
 `$ npm run build`

Expected result:  
- The web console IS NOT showing: "Log only in DEBUG".  
- The html page IS NOT showing the "devonly" component and IS NOT showing: "DEBUG ONLY".

Actual result:  
- **KO: The console IS showing: "Log only in DEBUG".**  
- OK: The html page IS NOT showing the "devonly" component and IS NOT showing: "DEBUG ONLY".

So preprocess-loader is not working for the TypesScript part.  


Quick way to check result:
```
$ grep -c "Log only in DEBUG" dist/main*.js
1
```
This command must show "0" match.
