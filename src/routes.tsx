import { Icon } from './lib/chakra';
import {
  MdFileCopy,
  MdHome,
  MdLock,
  MdLayers,
  MdAutoAwesome,
  MdOutlineManageAccounts,
} from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';
import { LuHistory } from 'react-icons/lu';
import { RoundedChart } from '@/components/icons/Icons';

// Auth Imports


const routes: any[] = [
  {
    name: 'Rap Battle',
    path: '/',
    icon: (
      <Icon as={MdAutoAwesome} width="20px" height="20px" color="inherit" />
    ),
    collapse: false,
  },
  {
    name: 'Roast Session',
    path: '/roast',
    icon: <Icon as={MdLayers} width="20px" height="20px" color="inherit" />,
    collapse: false,
  },
];

export default routes;
