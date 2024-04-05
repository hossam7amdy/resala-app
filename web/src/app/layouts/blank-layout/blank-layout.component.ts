import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { NavBlankComponent } from 'src/app/components/nav-blank/nav-blank.component';
import { TopBarComponent } from 'src/app/components/top-bar/top-bar.component';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [CommonModule, NavBlankComponent, RouterModule, TopBarComponent, FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.css'],
})
export class BlankLayoutComponent {}
