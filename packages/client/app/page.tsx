import { PrimaryLayout } from '@/layout/PrimaryLayout';
import { HomePage } from '@/views/HomePage';

export default async function Home() {
  return (
    <PrimaryLayout withHero>
      <HomePage />
    </PrimaryLayout>
  );
}
