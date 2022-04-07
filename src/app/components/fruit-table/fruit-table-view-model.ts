import { Injectable, OnInit } from "@angular/core";
import { FruityViceService } from "../../services/fruity-vice-service";
import { BehaviorSubject } from "rxjs";
import { Fruit } from "../../models/fruit";
import { MatSort } from "@angular/material/sort";

@Injectable()
export class FruitTableViewModel implements OnInit {
  fruitData$ = new BehaviorSubject<Fruit[]>(null);
  filteredData$ = new BehaviorSubject<Fruit[]>(null);
  loadingFruit$ = new BehaviorSubject<boolean>(false);

  constructor(private fruitService: FruityViceService) {
    this.loadingFruit$.next(true);
    this.fruitService.getAllFruits().subscribe((fruitResponse) => {
      this.loadingFruit$.next(false);
      this.fruitData$.next(fruitResponse);
      this.filteredData$.next(fruitResponse);
      console.log(fruitResponse);
      console.log(this.fruitData$);
    });
  }

  ngOnInit(): void {}
}
