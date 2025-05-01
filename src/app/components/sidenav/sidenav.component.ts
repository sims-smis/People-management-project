import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  menuItems = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'people', label: 'People', route: '/people' },
    { icon: 'person_add', label: 'Add Person', route: '/people/new' },
    { icon: 'assessment', label: 'Reports', route: '/reports' },
    { icon: 'settings', label: 'Settings', route: '/settings' }
  ];
}