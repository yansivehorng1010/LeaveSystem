import { Setting } from '../Page/Setting';
import { Company } from '../Page/Company';
import Dashboard from '../Page/Dashboard';
import Team from '../Page/Team';
import LevelType from '../Page/LevelType';
import ApprovalLevel from '../Page/ApprovalLevel';
import Employee from '../Page/Employee';
import TeamManagement from '../Page/TeamManagement';

export const arr = [
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/setting',
    component: Setting,
  },
  {
    path: '/setting/company',
    component: Company,
  },
  {
    path: '/setting/team',
    component: Team,
  },
  {
    path: '/setting/levelType',
    component: LevelType,
  },
  {
    path: '/setting/approvalLevel',
    component: ApprovalLevel,
  },
  {
    path: '/setting/employee',
    component: Employee,
  },
  {
    path: '/setting/teamManagement',
    component: TeamManagement,
  },
];
