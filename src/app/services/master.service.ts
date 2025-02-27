import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoan, IResponse, IUser } from '../model/loan';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  loggedUserData!: IUser;

  constructor(private http:HttpClient) {
    const loggedData = sessionStorage.getItem("bankUser");
    if (loggedData != null) {
      this.loggedUserData = JSON.parse(loggedData);
    }
   }

   
   onSaveLoan(obj:ILoan){
    return this.http.post<IResponse>(`https://projectapi.gerasim.in/api/BankLoan/AddNewApplication`,obj);
  }

  getMyApplications(id:number){
    return this.http.get<IResponse>(`https://projectapi.gerasim.in/api/BankLoan/GetMyApplications?customerId=`+id)
  }

  getApplicationsAssigned(id:number){
    return this.http.get<IResponse>(`https://projectapi.gerasim.in/api/BankLoan/GetApplicationAssigneedToMe?bankEmployeeId=`+id)
  }
}
