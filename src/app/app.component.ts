import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import Validation from './utils/validation';
import { HttpClient } from '@angular/common/http';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {



  emailid = '';


  title = 'formof';

  email= "";
  name  = "";
  message = "";
  endpoint = "";



  public show_dialog : boolean = true;
  public show_dialog2 : boolean = false;
  public show_dialog3 : boolean = false;

  public show_dialog1 : boolean = false;
  public show_dialogfelicidades : boolean = false;



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


  formofdatos: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    celular: new FormControl(''),
    email: new FormControl('')
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

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {


  }

  enviocorreo(){
    let params ={
      email:this.formofdatos.value.email,
      asunto:this.formofdatos.value.celular,
      mensaje:(this.formofdatos.value.nombre+" "+this.formof.value.prestamo)
    }
    console.log(params);
    console.log("mandado correo");
    this.http.post('https://sendemail-of.netlify.app/envio',params,{
      headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; '}}
      ).subscribe(resp=>{
      console.log(resp);
    })




  }

  envioc(){
    let user ={
      name:this.formofdatos.value.nombre,
      email:this.formofdatos.value.email
    }
    console.log(user);
    console.log("mandado correo");
    this.http.post('https://sendemail-of.netlify.app/envio',user).subscribe(
      resp=>{
        console.log("entro");
      console.log(resp);
    })




  }






  ngOnInit(): void {

    this.email = "mata9125@gmail.com";
    this.name = "Hayden Pierce";
    this.message = "Hello, this is Hayden.";

    //Start php via the built in server: $ php -S localhost:8000
    this.endpoint = "./utils/enviar.php";

    //formof//
    this.formof = this.formBuilder.group(
      {
        prestamo: ['', Validators.required],
        ingreso: ['', Validators.required],
        gastos: ['', Validators.required],
        mayor: ['', [Validators.required]],
        propietario: ['', [Validators.required]],
        ubicacion: ['', [Validators.required]],
        atrasos: ['', [Validators.required]]
      }
    );

    //formofdatos//



    this.formofdatos = this.formBuilder.group(
      {
        nombre: ['', Validators.required],
        celular: ['',[ Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        email: ['', [Validators.required, Validators.email]]
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
  get fomdatos(): { [key: string]: AbstractControl } {
    return this.formofdatos.controls;
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
    this.emailid = event.emailid;
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
    this.show_dialog = !this.show_dialog;
    this.show_dialog2 = !this.show_dialog2;


    var firstRow = Number((<HTMLInputElement> document.getElementById("ing")).value);
    var Row =Number( (<HTMLInputElement> document.getElementById("gas")).value);
    var atr = this.formof.get('atrasos')?.value;

    var suma = firstRow-Row;

    if(suma<8000 || atr == 'Si'){

      this.show_dialog1 = !this.show_dialog1;

    console.log("pedir mas informes");
    }else{
      this.show_dialogfelicidades = !this.show_dialogfelicidades;
      console.log("calificado");
    }

    console.log(suma);
    console.log(JSON.stringify(this.formof.value, null, 2));
  }

  onSubmit2datos(): void {
    this.submitted = true;

    if (this.formofdatos.invalid) {
      return;
    }

    this.show_dialog2 = !this.show_dialog2;
    this.show_dialog3 = !this.show_dialog3;

    this.envioc();
    //this.sendEmail();
    console.log(JSON.stringify(this.formofdatos.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  sendEmail(){
    let postVars = {
      email : this.email,
      name : this.name,
      message : this.message
    };

    //You may also want to check the response. But again, let's keep it simple.
    this.http.post(this.endpoint, postVars)
        .subscribe(
            response => console.log(response),
            response => console.log(response)
        )
  }

}
export class CardSubtitleExample {
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
}



