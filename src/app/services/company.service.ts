import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { ICompany } from '../interfaces/ICompany';
import { getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
    private auth = getAuth();
  constructor(
    private firestore: Firestore,
  ) { }
  private collection = collection(this.firestore, 'Company')

  async createCompany(company: ICompany) {
    const newDoc = doc(this.collection);
     await setDoc(newDoc, company);
     return newDoc.id;
  }
}
