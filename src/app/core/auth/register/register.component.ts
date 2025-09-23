import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  subscription: Subscription = new Subscription();
  errorMsg: string = "";
  flag: boolean = true;
  isLoading: boolean = false;
  // registerForm: FormGroup = new FormGroup({
  //   name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  //   email: new FormControl(null, [Validators.required, Validators.email]),
  //   password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/)]),
  //   rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/)]),
  //   phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  // }, { validators: this.confirmPassword })
  registerForm!: FormGroup;
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.registerForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/)]],
      rePassword: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    }, { validators: this.confirmPassword });
  }
  submitForm(): void {
    if (this.registerForm.valid) {
      this.subscription.unsubscribe();
      this.isLoading = true;
      // Apis Logic
      this.subscription = this.authService.registerForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);

          if (res.message === 'success') {
            // navigate to login
            this.errorMsg = '';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1500);
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.errorMsg = err.error.message;
          this.isLoading = false;
        },
      })
      console.log(this.registerForm.value);
    }
    else {
      // show all errors
      // this.registerForm.get('rePassword')?.patchValue('');
      this.registerForm.setErrors({ missmatch: true });
      this.registerForm.markAllAsTouched();
    }
  }

  confirmPassword(group: AbstractControl) {

    if (group.get('password')?.value === group.get('rePassword')?.value) {
      return null;
    } else {
      group.get('rePassword')?.setErrors({ missmatch: true });
      return { missmatch: true };
    }
  }
}
