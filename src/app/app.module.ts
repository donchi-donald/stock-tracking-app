import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SentimentListComponent } from './components/sentiment-list/sentiment-list.component';
import { SentimentComponent } from './components/sentiment/sentiment.component';
import { SingleSentimentComponent } from './components/single-sentiment/single-sentiment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SentimentListComponent,
    SentimentComponent,
    SingleSentimentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
