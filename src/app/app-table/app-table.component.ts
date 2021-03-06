import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { AppTableItem, Ingredient } from "../data/data-model";
import { AppTableDataSource } from "../data/app-table-datasource";
import { DataService } from "../data/data.service";

@Component({
  selector: "app-app-table",
  templateUrl: "./app-table.component.html",
  styleUrls: ["./app-table.component.css"]
})
export class AppTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<AppTableItem>;
  displayedColumns = ["id", "name", "ingredients"];

  dataSource = new MatTableDataSource<AppTableItem>(); //AppTableDataSource();
  @Input() itemPerPage = 7;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  constructor(private dataService: DataService) {}
  ngOnInit() {
    this.dataSource.data.push({
      id: 1,
      name: "apple pie",
      ingredients: [
        { name: "apples", number: 1 },
        { name: "butter", number: 1 },
        { name: "eggs", number: 1 }
      ]
    });

    // this.dataService.recipesChanged.subscribe((data: AppTableItem[]) => {
    //   this.dataSource.data = data;
    //   console.log("from init data: ", data);
    //   console.log("from init: this.dataSource.data ", [
    //     ...this.dataSource.data
    //   ]);
    // });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
