import type {MetaFunction} from '@remix-run/node';
import {Form, redirect, useNavigate} from '@remix-run/react';
import {useTranslation} from 'react-i18next';
import {useSnackbar} from 'notistack';
import * as yup from 'yup';
import {useForm, FormProvider} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {useMutationSignIn} from '~/services/auth';

import {PageShell} from '~/global/components/page-shell';
import {AppInputPassword} from '~/global/components/app-input-password';
import {AppInput} from '~/global/components/app-input';

import {apiSaveTokens} from '~/api-client/utils/tokens';

//
//

export const handle = {i18n: ['common', 'auth']};
export const meta: MetaFunction = () => [{title: 'Remix App - Sign In'}];

export const clientLoader = async () => {
  if (window.localStorage.getItem('_at')) return redirect('/');

  return null;
};

const schema = yup
  .object({
    email: yup.string().email().min(4).required(),
    password: yup.string().min(4).required(),
  })
  .required();

//
//

export default function SignIn() {
  const {t} = useTranslation(handle.i18n);
  const {enqueueSnackbar} = useSnackbar();
  const mutate = useMutationSignIn();
  const navigate = useNavigate();

  const form = useForm({
    mode: 'onChange',
    defaultValues: {email: '', password: ''},
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
    } else if (response?.result?.accessToken?.token) {
      enqueueSnackbar({
        heading: 'Signed in successfully',
        messages: `Welcome back, ${response.result.user?.name}`,
        variant: 'success',
      });
      apiSaveTokens(response);
      navigate('/', {replace: true, viewTransition: true});
    }
  });

  const isLoading = mutate.isPending || !!mutate.data?.result;

  //
  //

  return (
    <FormProvider {...form}>
      <Form method="post" onSubmit={onSubmit}>
        <PageShell
          title={t('auth:signIn.title')}
          actionLabel={t('auth:signIn.title')}
          backLabel={t('auth:signIn.altAction')}
          backTo="/sign-up"
          isLoading={isLoading}
        >
          <AppInput name="email" type="email" label={t('common:email')} variant="filled" />

          <AppInputPassword name="password" label={t('common:password')} variant="filled" />
        </PageShell>
      </Form>
    </FormProvider>
  );
}
