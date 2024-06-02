import { Component, ElementRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { RegisterService } from '../../services/register.service';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgxMaskDirective, NgxMaskPipe, FormsModule],
  providers: [provideNgxMask()],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  constructor(
    private registerService: RegisterService,
    private elementRef: ElementRef
  ) {}

  email!: string;
  password!: string;
  retypePassword!: string;
  phone!: string;
  name!: string;
  surname!: string;

  image!: File;

  ngOnInit(): void {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "assets/js/addSectionScript.js";
    this.elementRef.nativeElement.appendChild(script);
  }

  register() {
    this.registerService.register(
      this.image,
      this.email, 
      this.password, 
      this.phone, 
      this.name, 
      this.surname
    ).subscribe((any) => {
      console.log(any);
    })
  }

  initImage(event: any) {
    this.image = <File>event.target.files[0];
  }
}
