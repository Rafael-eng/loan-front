import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
  }

  @Output() toggleSidebar = new EventEmitter<void>();

  sidebarOpen = false;

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

}
