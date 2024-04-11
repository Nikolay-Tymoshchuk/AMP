'use client';
import { ArticlesList } from '@/components/common/ArticlesList';
import { Spinner } from '@/components/ui/Spinner';
import { PrimaryLayout } from '@/layout/PrimaryLayout';
import { useGetArticles } from '@/lib/hooks/useArticles';
import data from '@/data/data.json';

const { errorFetchingData } = data;

export default function Home() {
  const { data, isLoading, isError } = useGetArticles();
  const articles = data?.data || [];
  return (
    <PrimaryLayout withHero>
      {isLoading ? (
        <div className="py-10 flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          {isError ? (
            <p>{errorFetchingData}</p>
          ) : (
            <ArticlesList articles={articles} />
          )}
        </>
      )}
    </PrimaryLayout>
  );
}
