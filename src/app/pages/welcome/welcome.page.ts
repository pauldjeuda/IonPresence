import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  userName: string = '';
  isSubmitting: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Vérifier si l'utilisateur a déjà un nom enregistré
    const savedName = this.userService.getUserName();
    if (savedName) {
      this.router.navigate(['/presence']);
    }
  }

  async startApp() {
    if (!this.userName.trim()) {
      return;
    }

    this.isSubmitting = true;
    
    try {
      // Sauvegarder le nom de l'utilisateur
      this.userService.setUserName(this.userName.trim());
      
      // Naviguer vers la page de présence
      await this.router.navigate(['/presence']);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du nom:', error);
    } finally {
      this.isSubmitting = false;
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.userName.trim()) {
      this.startApp();
    }
  }
}
