import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { ICompany } from '../interfaces/ICompany';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  
  constructor(
    private firestore: Firestore
  ) { }
  private collection = collection(this.firestore, 'Company')

  async createCompany(company: ICompany) {
    return await setDoc(doc(this.collection))
  }
}
