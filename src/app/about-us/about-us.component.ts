import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent {
  public students: Record<string, string>[] = [
    {
      name: 'Dávid Tornyi',
      imgPath: '../../assets/images/creator_profile_pics/david.jpg',
    },
    {
      name: 'Beatrix Bendes',
      imgPath: '../../assets/images/creator_profile_pics/bea.jpg',
    },
    {
      name: 'Janka Pálossy',
      imgPath: '../../assets/images/creator_profile_pics/janka.jpg',
    },
    {
      name: 'Balázs Birta',
      imgPath: '../../assets/images/creator_profile_pics/balazs.jpg',
    },
  ];
}
