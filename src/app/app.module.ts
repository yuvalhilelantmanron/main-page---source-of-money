import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BudgetKeyCommonModule, THEME_ID_TOKEN, LANG_TOKEN, THEME_TOKEN } from 'budgetkey-ng2-components';
import { BudgetkeyNg2AuthModule, getAuthServiceConfigProvider } from 'budgetkey-ng2-auth';
import { MainPageSummaryComponent } from './main-page-summary/main-page-summary.component';
import { CategoryVisualizationComponent } from './category-visualization/category-visualization.component';
import { CategoryVisualizationInfoPopupComponent } from './category-visualization-info-popup/category-visualization-info-popup.component';
import { HeroComponent } from './hero/hero.component';
import { MushonkeyModule } from 'mushonkey';
import { BUBBLES } from './constants';
import { bubbles } from './bubbles'; //added import
import { SpeechBubbleComponent } from './speech-bubble/speech-bubble.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ChartComponent } from './chart/chart.component';
import { MiddleNavBarPageComponent } from './middle-nav-bar-page/middle-nav-bar-page.component';
import { RightNavBarPageComponent } from './right-nav-bar-page/right-nav-bar-page.component';
import { TaxGameComponent } from './tax-game/tax-game.component';
import { SingleValueTaxComponent } from './tax-game/single-value-tax/single-value-tax.component';
import { MapComponent } from './map/map.component';
import { JokerTaxComponent } from './tax-game/joker-tax/joker-tax.component';

declare let BUDGETKEY_NG2_COMPONENTS_THEME: any;
declare const BUDGETKEY_THEME_ID: any;
declare const BUDGETKEY_LANG: any;
//deleteted - declate const bubbles: any

export const LANG = typeof (BUDGETKEY_LANG) === 'undefined' ? 'he' : BUDGETKEY_LANG;
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const providers: any[] = [
  { provide: THEME_ID_TOKEN, useValue: typeof (BUDGETKEY_THEME_ID) === 'undefined' ? null : BUDGETKEY_THEME_ID },
  { provide: LANG_TOKEN, useValue: LANG },
  getAuthServiceConfigProvider('https://next.obudget.org'),
  { provide: BUBBLES, useValue: bubbles },
];
if (typeof (BUDGETKEY_NG2_COMPONENTS_THEME) !== 'undefined') {
  BUDGETKEY_NG2_COMPONENTS_THEME = Object.assign({}, BUDGETKEY_NG2_COMPONENTS_THEME);
  providers.push({
    provide: THEME_TOKEN,
    useValue: BUDGETKEY_NG2_COMPONENTS_THEME
  });
}

@NgModule({
  declarations: [
    AppComponent,
    MainPageSummaryComponent,
    CategoryVisualizationComponent,
    CategoryVisualizationInfoPopupComponent,
    HeroComponent,
    SpeechBubbleComponent,
    NavBarComponent,
    ChartComponent,
    MiddleNavBarPageComponent,
    RightNavBarPageComponent,
    TaxGameComponent,
    SingleValueTaxComponent,
    MapComponent,
    JokerTaxComponent,
  ],
  imports: [
    BrowserModule,
    BudgetKeyCommonModule,
    BudgetkeyNg2AuthModule,
    MushonkeyModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: providers,
  bootstrap: [AppComponent]
})
export class AppModule { }
