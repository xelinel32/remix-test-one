import type {MetaFunction} from '@remix-run/node';
import {Form, redirect} from '@remix-run/react';
import {yupResolver} from '@hookform/resolvers/yup';
import {useMutation} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import {useSnackbar} from 'notistack';
import * as yup from 'yup';
import {useForm, FormProvider} from 'react-hook-form';

import {Box} from '@mui/material';

import {useMutationCategoriesCreate} from '~/services/categories';

import {useI18nNavigate} from '~/global/hooks/use-i18n-navigate';

import {AppInputSwitch} from '~/global/components/app-input-switch';
import {PageShell} from '~/global/components/page-shell';
import {AppInput} from '~/global/components/app-input';

import {CategoriesForm} from './components/form';

//
//

export const handle = {i18n: ['common', 'categories']};
export const meta: MetaFunction = () => [{title: 'Remix App - Create a category'}];

export const clientLoader = async () => {
  if (!window.localStorage.getItem('_at')) {
    return redirect('/');
  }

  return null;
};

//

const schema = yup
  .object({
    title: yup.object({
      ar: yup.string().min(3).max(40).required(),
      en: yup.string().min(3).max(40).required(),
    }),
    isActive: yup.boolean().optional(),
  })
  .required();

//
//

export default function CategoriesCreate() {
  const {t} = useTranslation(handle.i18n);
  const {enqueueSnackbar} = useSnackbar();
  const mutate = useMutationCategoriesCreate();
  const navigate = useI18nNavigate();

  const form = useForm({
    mode: 'onChange',
    defaultValues: {title: {en: '', ar: ''}, isActive: false},
    resolver: yupResolver(schema),
  });

  //

  const onSubmit = form.handleSubmit(async payload => {
    const response = await mutate.mutateAsync({payload});

    if (response?.errors?.length) {
      enqueueSnackbar({
        heading: response?.meta?.message,
        messages: response?.errors,
        variant: 'error',
      });
    } else if (response?.result?.categoryId) {
      enqueueSnackbar({messages: response.meta?.message, variant: 'success'});
      navigate('/categories', {viewTransition: true});
    }
  });

  const isLoading = mutate.isPending || !!mutate.data?.result;

  //
  //

  return (
    <FormProvider {...form}>
      <Form method="post" onSubmit={onSubmit}>
        <PageShell
          title={t('categories:title.create')}
          backTo="/categories"
          isLoading={isLoading}
          maxWidth={400}
        >
          <CategoriesForm />
        </PageShell>
      </Form>
    </FormProvider>
  );
}
