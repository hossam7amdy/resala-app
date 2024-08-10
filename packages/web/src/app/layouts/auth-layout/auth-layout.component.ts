import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { NavAuthComponent } from 'src/app/components/nav-auth/nav-auth.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, NavAuthComponent, RouterModule, FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
})
export class AuthLayoutComponent {}
