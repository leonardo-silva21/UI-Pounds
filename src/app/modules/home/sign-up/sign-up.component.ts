import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  newUserSubscription = new Subscription();

  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private service: UserService) { }

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(){
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['',[ Validators.required]],
      password: ['',[ Validators.required]],
      cpf: ''
    } as const)
  }

  onSubmit(): void{
    this.newUserSubscription = this.service.addUser(this.userForm.value as User).subscribe()
    this.userForm
    this.userForm.reset();
  }

}
