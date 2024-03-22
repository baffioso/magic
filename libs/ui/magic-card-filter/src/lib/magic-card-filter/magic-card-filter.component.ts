import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-magic-card-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './magic-card-filter.component.html',
  styleUrl: './magic-card-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagicCardFilterComponent {}
