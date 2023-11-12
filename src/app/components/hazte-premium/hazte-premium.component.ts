import { Role } from './../../models/role';
import { User } from './../../models/user';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

declare var paypal;

@Component({
  selector: 'app-hazte-premium',
  templateUrl: './hazte-premium.component.html',
  styleUrls: ['./hazte-premium.component.css']
})
export class HaztePremiumComponent implements OnInit {
  idUser: any;
  user!: User;
  profile !: Profile;
  @ViewChild('paypal', {static:true})  paypalElement! : ElementRef;

  producto = {
    descripcion: 'pagos por los cursos que ofrecemos',
    precio: 500,
    img: 'imagen del curso'
  }
  
  title = 'angular-paypal-payment';

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    public route:ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit() {
    const variable = this.route.snapshot.paramMap.get('id');
    this.idUser = variable;
    console.log(variable);
    paypal
    .Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: this.producto.descripcion,
              amount: {
                currency_code: 'USD',
                value: this.producto.precio
              }
            }
          ]
        })
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        console.log(order);
        const rol: Role = { idRole: 3, roleUser:"Premium"}
        const variable = this.route.snapshot.paramMap.get('id');
        this.userService.getUserId(this.idUser).subscribe((data)=>{
          this.user=data;
          this.user.role=rol;
        });
        
        this.userService.upgradeUser(this.idUser, rol).subscribe({
          next: (data) => {
            this.snackBar.open('Ahora eres premium!', '', {
              duration: 3000,
            });
          },
          error: (err) => {
            this.snackBar.open('Error!', '', {
              duration: 3000,
            });
            console.log(err);
          },
        });
        
        
        
        
    
      },
      onError: err=>{
        console.log(err);
      }
    })
    .render( this.paypalElement.nativeElement );
  }

}
