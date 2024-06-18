import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavComponent } from "../../shared/nav/nav.component";
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/auth/login.service';
import { PersonalDetailsComponent } from '../../components/personal-details/personal-details.component';
import { User } from '../../services/auth/user';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [NavComponent, CommonModule, PersonalDetailsComponent]
})
export class DashboardComponent implements OnInit, OnDestroy{
  userLoginOn:boolean=false;
  userData?:User;
  constructor(private loginService:LoginService){}

  ngOnDestroy(): void {
    this.loginService.currentUserData.unsubscribe();
    this.loginService.currentUserLoginOn.unsubscribe();
  }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) =>{
          this.userLoginOn=userLoginOn;
        }
      }
    )

    this.loginService.currentUserData.subscribe(
      {
        next:(userData) =>{
          this.userData=userData;
        }
      }
    )
  }
}
