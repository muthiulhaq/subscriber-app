import { Injectable, OnInit, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user } from '@angular/fire/auth';
import { Observable, Subject, from } from 'rxjs';
import { User } from '../../shared/interfaces/user.interface';
import { Firestore, collectionData, collection, addDoc, getDocs, query, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { CONSTANTS } from '../constants/constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  firebaseAuth = inject(Auth);
  router = inject(Router);
  firestore: Firestore = inject(Firestore)

  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then((response) => {
        this.updateUserDetails(username, email, response?.user?.uid);

        const userData = JSON.stringify({
          displayName: username,
          email: response?.user?.email,
          uid: response?.user?.uid
        });
        localStorage.setItem('userInfo', userData);

        return updateProfile(response.user, {displayName: username});
        })
    
    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then((response: any) => {
      const data = response?.user?.auth?.currentUser;
      const userData = JSON.stringify({
        displayName: data?.displayName,
        email: data?.email,
        uid: data?.uid
      });

      localStorage.setItem('userInfo', userData);
    })

    return from(promise);
  }

  logOut() {
    signOut(this.firebaseAuth).then(() => {
      localStorage.removeItem('userInfo');
      this.router.navigateByUrl('/login')
    })
  }

  async updateUserDetails(username: string, emailId: string, uid: string) {
    const docRef = collection(this.firestore, CONSTANTS.users_collection);
    return setDoc(doc(docRef, uid), {
      username: username,
      emailId: emailId,
      uid: uid,
      role: 'subscriber'
    })
  }

  async getAllUsers() {
    return (
      await getDocs(query(collection(this.firestore, CONSTANTS.users_collection)))
      ).docs.map((user) => user.data());
  }

  getUserDetails(uid: string) {
    const docRef = collection(this.firestore, CONSTANTS.users_collection);
    return (getDoc(doc(docRef, uid)));
  }

  addPayment(uid: string, createdBy: string, amount: number, monthAndDay: Date) {
    const promise = addDoc(collection(this.firestore, CONSTANTS.payments_collection), {
      uid: uid,
      createdBy: createdBy,
      amount: amount,
      monthAndDay: monthAndDay
    });
   
    return from(promise)
  }

  getPaymentDetails() {
    return from (
       getDocs(query(collection(this.firestore, CONSTANTS.payments_collection)))
     )
  }

}
