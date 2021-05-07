import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as IoIcons from 'react-icons/io';
import * as SiIcons from 'react-icons/si';
import * as FcIcons from 'react-icons/Fc';

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
