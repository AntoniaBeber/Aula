import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './Service/user.service';
import { Observable, Subscription, of } from 'rxjs';
import { User } from './model/user';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'aula06';
  users: Observable<User[]> = of([])
  userArray: User[] = []
  user: User = {
    id: 1,
    name: "Name",
    email: "email",
    gender: "gender",
    status: "status",
  }
  subscription!: Subscription 

  constructor(private userService: UserService){


  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }

 create(){
  this.userService.create(this.user)
 }

  ngOnInit(): void {
    this.users = this.userService.list()
    this.subscription = this.userService.list().subscribe(users => {
      this.userArray = users
    })
  }
}
