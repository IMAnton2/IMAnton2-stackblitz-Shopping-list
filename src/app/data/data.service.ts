import { Injectable } from "@angular/core";
import { AppTableDataSource } from "./app-table-datasource";
import { AngularFirestore } from "@angular/fire/firestore";
import { Subject, Subscription } from "rxjs";
import "rxjs/add/operator/map";
import { AppTableItem } from "./data-model";

@Injectable({ providedIn: "root" })
export class DataService {
  private appData: AppTableDataSource;
  testdata: Subscription;
  private fbSubs: Subscription[] = [];
  recipesChanged = new Subject<AppTableItem>();

  constructor(private db: AngularFirestore) {}

  getdata() {
    return this.appData;
  }
  fatchData() {
    this.fbSubs.push(
      this.db
        .collection("ShoppingList")
        .snapshotChanges()
        .map(docArray => {
          return docArray.map(doc => {
            return {
              name: doc.payload.doc.data().name,
              id: doc.payload.doc.id
            };
          });
        })
        .subscribe((data: AppTableItem[]) => {
          console.log("from firebase", data);
          this.recipesChanged.next(...data);
        })
    );
  }
}
