import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { FruitTableViewModel } from "./fruit-table-view-model";
import { MatSort } from "@angular/material/sort";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-fruit-table",
  templateUrl: "./fruit-table.component.html",
  styleUrls: ["./fruit-table.component.scss"],
  providers: [FruitTableViewModel],
})
export class FruitTableComponent implements OnInit, AfterViewInit {
  columnsToDisplay = [
    "id",
    "name",
    "genus",
    "calories",
    "carbohydrates",
    "sugar",
  ];
  @ViewChild(MatSort) sort: MatSort;
  constructor(public viewModel: FruitTableViewModel) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {}

  applyFilter(event: Event) {
    // event.target.value
    const filterValue = (event.target as HTMLInputElement).value;
    this.viewModel.filteredData$.next(
      this.viewModel.fruitData$.value.filter(
        (fruit) =>
          fruit.name.toLowerCase().indexOf(filterValue.toLowerCase()) > -1 ||
          fruit.genus.toLowerCase().indexOf(filterValue.toLowerCase()) > -1 ||
          fruit.family.toLowerCase().indexOf(filterValue.toLowerCase()) > -1 ||
          fruit.order.toLowerCase().indexOf(filterValue.toLowerCase()) > -1
      )
    );
  }
  sortBy(event: Event) {
    console.log("event", event);
    const sortBy = (event.target as HTMLInputElement).value;
    if (sortBy === "name") {
      this.viewModel.filteredData$.next(
        this.viewModel.filteredData$.value.sort((a, b) =>
          a.name.localeCompare(b.name)
        )
      );
    } else if (sortBy === "nameDesc") {
      this.viewModel.filteredData$.next(
        this.viewModel.filteredData$.value.sort((a, b) =>
          b.name.localeCompare(a.name)
        )
      );
    } else if (sortBy === "carbohydrates") {
      this.viewModel.filteredData$.next(
        this.viewModel.filteredData$.value.sort(
          (a, b) => a.nutritions.carbohydrates - b.nutritions.carbohydrates
        )
      );
    } else if (sortBy === "carbohydratesDesc") {
      this.viewModel.filteredData$.next(
        this.viewModel.filteredData$.value.sort(
          (a, b) => b.nutritions.carbohydrates - a.nutritions.carbohydrates
        )
      );
    }
  }
}
