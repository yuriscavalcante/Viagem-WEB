import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, DocumentReference, Firestore, getDocs, getFirestore, orderBy, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private firestore: Firestore,
  ) { }
  private auth = getAuth();
  private db = getFirestore();
  private userCollection = collection(this.firestore, `Users`);
  private uid = '';
  async register(userRegister: any) {
    const defaultPass = String(userRegister.cpf).slice(0, 8);
    const newUser = await createUserWithEmailAndPassword(this.auth, userRegister.email, userRegister.password ? userRegister.password : defaultPass);
    await setDoc(doc(this.userCollection, newUser.user.uid), {
      cpf: userRegister.cpf,
      email: userRegister.email,
      fullName: userRegister.fullName,
      isAdmin: userRegister.isAdmin ? userRegister.isAdmin : false,
      cargo: userRegister.cargo ? userRegister.cargo : '',
      equipe: userRegister.equipe ? userRegister.equipe : '',
      companies: userRegister.companies,
      uid: newUser.user.uid
    });
    return newUser.user.uid;
  }

  async login(userLogin: any) {
    const user = await signInWithEmailAndPassword(this.auth, userLogin.email, userLogin.password);
    this.uid = user.user.uid;
    return docData(doc(this.userCollection, this.uid)).subscribe(res => {
      sessionStorage.setItem('userData', JSON.stringify(res));
    });
  }

  async listEmployees(company: string) {
    let data: any[] = [];
    (await getDocs(query(this.userCollection, where('companies', '==', company)))).forEach((docs: any) => {
      data.push(docs.data());
    });
    return data;
  }

  async updateUser(id: string, user: any) {
    const docRef = doc(this.userCollection, id);
    await updateDoc(docRef, user);
  }

  async logout() {
    sessionStorage.removeItem('userData');
    return this.auth.signOut();
  }
}