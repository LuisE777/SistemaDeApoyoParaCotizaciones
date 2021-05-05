import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/form-solicitud/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: any = [];

  constructor(
    private itemS: ItemService,
    private router: Router,
  ) {
    this.getItems();
  }

  ngOnInit(): void {
  }

  getItems() {
    this.itemS.getAll().subscribe(data => {
      this.items = data.items;
    })
  }

  selectedItem(id: string) {
    console.log("item seleccionado: " + id);
    
    //this.router.navigate(['/item/', id]);
  }

  removeItem(item: any, index: any) {
    if (window.confirm('¿Esta seguro que quiere eliminar el registro?')) {
        this.itemS.delete(item.id).subscribe(() => {
          this.items.splice(index, 1);
        });
    }
  }

}
