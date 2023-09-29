import { Component, Input } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.scss']
})
export class PassComponent {
  faShoppingCart = faShoppingCart;

  @Input() realm: string = '';
  @Input() settlements: string[] = [];

  price = Math.floor((Math.random() * 1000) + 1);

  imagePath: string = '';

  ngOnInit() {
    this.imagePath = `assets/images/pass_cards/${this.realm.toLowerCase()}.png`;
}
}