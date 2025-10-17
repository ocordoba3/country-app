import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PATHS } from '../../../utils/paths';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.html',
  styles: [
    `
      .animation {
        animation: backgroundMove 20s ease-in-out infinite;
      }

      @keyframes backgroundMove {
        0% {
          transform: scale(1) translate(0, 0);
        }
        25% {
          transform: scale(1.05) translate(-1%, -0.5%);
        }
        50% {
          transform: scale(1.02) translate(0.5%, -1%);
        }
        75% {
          transform: scale(1.08) translate(-0.5%, 0.5%);
        }
        100% {
          transform: scale(1) translate(0, 0);
        }
      }
    `,
  ],
})
export default class HomePage {
  paths = PATHS;
}
