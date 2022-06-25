import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SingleSentimentComponent } from './components/single-sentiment/single-sentiment.component';

const routes: Routes = [
  { path: 'sentiment/:id', component: SingleSentimentComponent },
  { path: '', component: HomeComponent},
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
