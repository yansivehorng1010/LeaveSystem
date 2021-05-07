import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as IoIcons from 'react-icons/io';
import * as SiIcons from 'react-icons/si';
import * as FcIcons from 'react-icons/Fc';
import * as FaIcons from 'react-icons/Fa';

export const SidebarData = [
  {
    title: 'Setting',
    path: '/setting',
    icon: <AiIcons.AiFillSetting />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Company',
        path: '/setting/company',
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Team',
        path: '/setting/team',
        icon: <RiIcons.RiTeamLine />,
      },
      {
        title: 'Employee',
        path: '/setting/employee',
        icon: <FaIcons.FaAddressCard />,
      },
      {
        title: 'Team Management',
        path: '/setting/teamManagement',
        icon: <FcIcons.FcManager />,
      },
      {
        title: 'Level Type',
        path: '/setting/levelType',
        icon: <SiIcons.SiOpslevel />,
      },
      {
        title: 'Approval Level',
        path: '/setting/approvalLevel',
        icon: <FcIcons.FcApproval />,
      },
    ],
  },
];
