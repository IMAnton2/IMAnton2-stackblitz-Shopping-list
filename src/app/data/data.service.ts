import { Injectable } from "@angular/core";
import { AppTableDataSource } from "./app-table-datasource";
import { AngularFirestore } from "@angular/fire/firestore";
import { Subscription } from "rxjs";

@Injectable({ providedIn: "root" })
export class DataService {
  private appData: AppTableDataSource;
  testdata: Subscription;

  constructor(private db: AngularFirestore) {}

  getdata() {
    return this.appData;
  }
  fatchData() {
    this.testdata = this.db
      .collection("ShoppingList")
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data().name
          };
        });
      })
      .subscribe(data => {
        console.log("from firebase", data);
      });
  }
}
