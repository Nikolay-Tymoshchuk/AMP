import { IParent } from '@/interfaces/components.interfaces';
import { PrimaryLayout } from '@/layout/PrimaryLayout';

import data from '@/data/data.json';

const { editPage } = data;

export default function RoleLayout({ children }: IParent) {
  return <PrimaryLayout title={editPage}>{children}</PrimaryLayout>;
}
