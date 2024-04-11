import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { toast } from 'react-toastify';
import cn from 'classnames';
import Image from 'next/image';

import { useUpdateArticle } from '@/lib/hooks/useArticles';
import { articleSchema } from '@/schemas/articleSchema';

import { TEditArticleForm, TVoidFunction } from '~/types/components.types';
import { ArticleDTO, IArticle } from '@/interfaces/article.interfaces';

import data from '@/data/data.json';
import { Title } from '@/components/ui/Title';
import { Button } from '@/components/ui/CommonsButtons/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { Textarea } from '@/components/ui/Textarea';

const {
  errorUpdateArticle,
  successUpdateArticle,
  noChangesInForm,
  articleFromTextData: {
    editArticle,
    buttonSubmitText,
    title: titleData,
    description: descriptionData,
    enclosureUrl: enclosureUrlData,
    pubDate: pubDateLabel,
  },
} = data;

export const EditArticleForm = ({
  article,
  closeModal,
}: {
  article: IArticle;
  closeModal: TVoidFunction;
}) => {
  const { mutateAsync, isLoading } = useUpdateArticle();

  const { _id, description, enclosureUrl, title } = article;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm<TEditArticleForm>({
    mode: 'onChange',
    resolver: joiResolver(articleSchema),
    defaultValues: {
      title,
      description,
      enclosureUrl,
      updatePubDate: false,
    },
  });

  const onSubmit = async (formData: TEditArticleForm) => {
    const { updatePubDate, enclosureUrl, ...rest } = formData;

    const articleData: ArticleDTO = {
      ...rest,
      enclosureUrl: enclosureUrl || null,
      pubDate: updatePubDate ? new Date().toISOString() : article?.pubDate,
    };

    try {
      if (!isDirty) {
        toast.info(noChangesInForm);
        return;
      }
      await mutateAsync({ articleData, id: _id });
      toast.success(successUpdateArticle);
      closeModal();
    } catch (error) {
      toast.error(errorUpdateArticle);
    }
  };

  function validateURL(url: string) {
    try {
      new URL(url);
      return url;
    } catch (e) {
      return null;
    }
  }

  const urlIsValid = validateURL(watch('enclosureUrl') as string);

  return (
    <>
      <Title Tag="h2" className="mb-4">
        {editArticle}
      </Title>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[80vw] max-w-[392px] mx-auto flex flex-col gap-y-7"
      >
        <div className="flex flex-col gap-y-5">
          <div className="flex gap-3">
            {urlIsValid && (
              <Image
                src={watch('enclosureUrl') as string}
                alt={title}
                width={100}
                height={40}
              />
            )}
            <Input
              id="enclosureUrl"
              label={enclosureUrlData.label}
              register={register('enclosureUrl')}
              error={errors.enclosureUrl?.message}
              placeholder={enclosureUrlData.placeholder}
              type="text"
              className={cn('flex-1', watch('enclosureUrl') && '!text-accent')}
              classNameInput="h-9"
            />
          </div>

          <Textarea
            label={titleData.label}
            placeholder={titleData.placeholder}
            register={register('title')}
            error={errors.title?.message}
            rows={3}
          />

          <Textarea
            label={descriptionData.label}
            placeholder={descriptionData.placeholder}
            register={register('description')}
            error={errors.description?.message}
            rows={3}
          />

          <Checkbox
            register={register('updatePubDate')}
            labelText={pubDateLabel}
            watchValue={watch('updatePubDate')}
          />
        </div>

        <Button
          text={buttonSubmitText}
          type="submit"
          isDisabled={isLoading}
          className="ml-auto"
        />
      </form>
    </>
  );
};
