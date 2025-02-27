import { Component, inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { IApplicationList, IResponse } from '../../model/loan';

@Component({
  selector: 'app-loan-application-list',
  imports: [],
  templateUrl: './loan-application-list.component.html',
  styleUrl: './loan-application-list.component.css'
})
export class LoanApplicationListComponent {
  masterServ = inject(MasterService);
  applicationList: IApplicationList[] = [];

  constructor() {
    if (this.masterServ.loggedUserData.role == "Customer") {
      this.getCustomerApplication();
    } else {
      this.getAssignedApplication();
    }
  }

  getCustomerApplication() {
    this.masterServ.getMyApplications(this.masterServ.loggedUserData.userId).subscribe((res: IResponse) => {
      this.applicationList = res.data;
    })
  }

  getAssignedApplication() {
    this.masterServ.getApplicationsAssigned(this.masterServ.loggedUserData.userId).subscribe((res: IResponse) => {
      this.applicationList = res.data;
    })
  }
}
