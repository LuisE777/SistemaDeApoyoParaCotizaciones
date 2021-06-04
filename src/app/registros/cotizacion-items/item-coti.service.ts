import { Injectable } from '@angular/core';
import { Item } from './cotizacion-items.component';

@Injectable({
  providedIn: 'root'
})
export class ItemCotiService {

  
  item: Item;
  items: Item[] = [];

  constructor() { }

  setItems(item: Item){
    this.items.push(item);
  }

  getItem(){
    return this.items;
  }
}
