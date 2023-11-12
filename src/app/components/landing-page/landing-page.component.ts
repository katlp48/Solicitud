import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
//import * as $ from "jquery";
declare var $: any;
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  contactForm: UntypedFormGroup;
  constructor(private observer: BreakpointObserver,
    private router: Router,
    public route: ActivatedRoute, private fb: UntypedFormBuilder) {
      this.Carga(["menu","contact"]);
      this.contactForm = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        mensaje: ['', [Validators.required]]
      });
     }

  ngOnInit(): void {
    $(".hide").on('click', function () {
      $("nav ul").toggle('slow');
    })
  }

  ngAfterViewInit(): void {

  }
 Carga(archivos:string[]){
  for (let archivo of archivos) { 
    let script = document.createElement('script');
    script.src = "../../../assets/js/" + archivo + ".js";
    let body = document.getElementsByTagName("body")[0];
    body.appendChild(script);
  }
}
     /*
  <script src="menu.js"></script>
  <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
  <script>
  
    $(".hide").on('click', function () {
      $("nav ul").toggle('slow');
    })
  
  </script>*/

}
