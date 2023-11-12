import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  id:number;
  name: string;
}
@Component({
  selector: 'app-dialog-overview',
  templateUrl: './dialog-overview.component.html',
  styleUrls: ['./dialog-overview.component.css']
})
export class DialogOverviewComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router,
    private route: ActivatedRoute) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
haztePremium():void{
  this.dialogRef.close();
  this.router.navigate(['/homePage', this.data.id,'premium', this.data.id]);
}
}
