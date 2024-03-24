import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-magic-card-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './magic-card-home.component.html',
  styleUrl: './magic-card-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagicCardHomeComponent {}
