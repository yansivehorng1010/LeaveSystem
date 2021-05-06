import { Setting } from '../Page/Setting';
import { Company } from '../Page/Company';
import Dashboard from '../Page/Dashboard';
import Team from '../Page/Team';

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
    path: '/setting/Team',
    component: Team,
  },
];
