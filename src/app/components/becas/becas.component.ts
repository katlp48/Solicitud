import { Component, OnInit } from '@angular/core';
import { Beca} from 'src/app/models/beca';
import { User } from './../../models/user';
import {BecaService} from './../../services/beca.service';
import { ActivatedRoute} from '@angular/router';
import { environment } from './../../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import {  MatSnackBar, MatSnackBarRef, SimpleSnackBar,} from '@angular/material/snack-bar';

@Component({
  selector: 'app-becas',
  templateUrl: './becas.component.html',
  styleUrls: ['./becas.component.css']
})
export class BecasComponent implements OnInit {
  
  becas: Beca[]=[];
  user!:any;
  userId:any;
  becaId:any;
  public searchText!:string;
  Title='';
  searchKey:string="";
  // isReadMore: boolean=false;
  data!: string;
  dataSource = new MatTableDataSource(this.becas);
  
  constructor(
    public route:ActivatedRoute,
    private becaService:BecaService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id3');
    this.getBeca();
    this.becaService.search.subscribe((val:any)=>{
      this.searchKey=val;

    })
  }

  getBeca(){
    this.becaService.getBeca().subscribe((data:Beca[])=>{
      this.becas= data;
    })
  }
  deleteBeca(id: number) {
    this.becaService.deleteBeca(id).subscribe(() => {
      this.becas = this.becas.filter((e: Beca) => {
        return e.id !== id ? e : false;
      });
      this.snackBar.open('La beca fue eliminada con exito!', '', {
        duration: 6000,
      });
    });
  }
/* 
    processBecaResponse(resp: any) {
      const dateBeca: Beca[] = [];
  
      
      this.data
   
    } */

  /*   filterBecaByTitle(title: any) {
      if (title.length === 0) {
        return this.getBeca();
      }
  
      this.becaService.getBecaByTitle(title).subscribe((resp: any) => {
        this.processBecaResponse(resp);
      });
    }
 */
    /*applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }*/

    selectBeca(beca) {
      console.log(`The selected beca is::  ${beca.title}`);
    }
    search(event:any){
      this.searchText=(event.target as HTMLInputElement).value;
      console.log(this.searchText);
      this.becaService.search.next(this.searchText);
  }
  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  exportExcel() {
    this.becaService.exportBeca().subscribe(
      (data: any) => {
        let file = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        let fileUrl = URL.createObjectURL(file);
        var anchor = document.createElement('a');
        anchor.download = 'becas.xlsx';
        anchor.href = fileUrl;
        anchor.click();

        this.openSnackBar('Archivo exportado correctamente', 'Exitosa');
      },
      (error: any) => {
        this.openSnackBar('No se pudo exportar el archivo', 'Error');
      }
    );
  }
  }

  


