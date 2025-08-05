import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // <-- aquí SÍ va


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
