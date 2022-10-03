import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import Validation from './utils/validation';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'formof';

  
options: Array<any> = [
    { name: 'Si', value: 'Si' },
    { name: 'No', value: 'No' }
];

optionslive: Array<any> = [
  { name: 'Área metropolitana de la Ciudad de México', value: 'CDMX' },
  { name: 'Área metropolitana de Guadalajara', value: 'GDL' },
  { name: 'Otro', value: 'OTRO' }
];

  formof: FormGroup = new FormGroup({
    prestamo: new FormControl(''),
    ingreso: new FormControl(''),
    gastos: new FormControl(''),
    mayor: new FormControl(''),
    propietario: new FormControl(''),
    ubicacion: new FormControl(''),
    atrasos: new FormControl('')
  });


  form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });

  
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {

    //formof//
    this.formof = this.formBuilder.group(
      {
        prestamo: ['', Validators.required],
        ingreso: ['', Validators.required],
        gastos: ['', Validators.required],
        mayor: [null, [Validators.required]],
        propietario: [null, [Validators.required]],
        ubicacion: [null, [Validators.required]],
        atrasos: [null, [Validators.required]]
      }
    );


    ///ejemplo//
    this.form = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get fom(): { [key: string]: AbstractControl } {
    return this.formof.controls;
  }

  changemayor(event: any) {
    console.log(event.value);
  }

  changepropietario(event: any) {
    console.log(event.value);
  }

  changeubicacion(event: any) {
    console.log(event.value);
  }
  changeatrasos(event: any) {
    console.log(event.value);
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onSubmit2(): void {
    this.submitted = true;

    if (this.formof.invalid) {
      return;
    }

    console.log(JSON.stringify(this.formof.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  
}
export class CardSubtitleExample {
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
}

