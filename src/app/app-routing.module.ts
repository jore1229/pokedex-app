import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component'
import { HomePageComponent } from './shared/components/home-page/home-page.component';
import { PokemonStatsComponent } from './shared/components/pokemon-stats/pokemon-stats.component';


const routes: Routes = [
  { path: 'home', component: HomePageComponent},
  { path: ':pokemon', component: PokemonStatsComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // redirect to home page
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
