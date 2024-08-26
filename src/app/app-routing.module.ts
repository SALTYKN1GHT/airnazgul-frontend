import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { PassListComponent } from './pass-list/pass-list.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'src/helpers/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pass-list', component: PassListComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'userprofile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'checkout', component: CheckoutPageComponent },
  { path: 'ticket-list', component: TicketListComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
