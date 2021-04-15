import { AfterViewInit, Component, Input, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { AppTableItem } from "../data/data-model";
import { AppTableDataSource } from "../data/app-table-datasource";

@Component({
  selector: "app-app-table",
  templateUrl: "./app-table.component.html",
  styleUrls: ["./app-table.component.css"]
})
export class AppTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<AppTableItem>;
  dataSource: AppTableDataSource;
  @Input() itemPerPage = 7;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["id", "name"];

  constructor() {
    this.dataSource = new AppTableDataSource();
    this.dataSource.data.push({ id: 1, name: "Hydrogen" });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
