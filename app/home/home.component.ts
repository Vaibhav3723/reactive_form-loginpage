import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  signupForm: FormGroup;
  loginForm: FormGroup;
  signupData = [];

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });

    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    const storedData = JSON.parse(localStorage.getItem('signupdata'));
    if (storedData) {
      this.signupData = storedData;
    }
  }

  signUp() {
    console.log(this.signupForm);
    if (this.signupForm.valid) {
      this.signupData.push(this.signupForm.value);
    } else {
      alert('enter valid data');
    }
    localStorage.setItem('signupdata', JSON.stringify(this.signupData));
    this.signupForm.reset();
  }

  login() {
    const storedData = JSON.parse(localStorage.getItem('signupdata'));

    const userExist = storedData.some((ele) => {
      return (
        ele.username === this.loginForm.get('username').value &&
        ele.password === this.loginForm.get('password').value
      );
    });

    if (userExist) {
      alert('Login Successful');
    } else {
      alert('Please signup first');
    }
  }
}
