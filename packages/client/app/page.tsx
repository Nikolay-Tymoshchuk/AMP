'use client';
import { ArticlesList } from '@/components/common/ArticlesList';
import { PrimaryLayout } from '@/layout/PrimaryLayout';
import { useGetArticles } from '@/lib/hooks/useArticles';

export default function Home() {
  const { data } = useGetArticles();
  const articles = data?.data || [];
  return (
    <PrimaryLayout withHero>
      <ArticlesList articles={articles} />
    </PrimaryLayout>
  );
}
