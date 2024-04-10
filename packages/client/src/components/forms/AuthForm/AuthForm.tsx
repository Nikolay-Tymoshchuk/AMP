'use client';
import { joiResolver } from '@hookform/resolvers/joi';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useAuth } from '@/lib/hooks/useAuth';
import { loginSchema, registerSchema } from '@/schemas/authSchema';

import { Button } from '@/components/ui/CommonsButtons/Button';
import { TextNavLink } from '@/components/ui/CommonsButtons/TextNavLink';
import { Input } from '@/components/ui/Input';
import { RadioInput } from '@/components/ui/RadioInput';
import { Title } from '@/components/ui/Title';

import contentData from '@/data/data.json';
import {
  IFormAuthProps,
  ILoginFormFields,
  IRegisterFormFields,
} from '@/interfaces/components.interfaces';
import { ROUTES, TYPE_AUTH, USER_ROLE } from '@/interfaces/enums';
import { TAuthForm } from '~/types/components.types';

const {
  authFormTextData,
  commonErrorAuthorization,
  wrongAuthData,
  userExists,
  backToMain,
} = contentData;

const {
  buttonSubmitText,
  inputPasswordText,
  confirmPassword,
  inputEmailText,
  nameInput,
  logNavLink,
  logTitle,
  regNavLink,
  regTitle,
  roles,
} = authFormTextData;

const { LOGIN, SIGNUP } = ROUTES;

export const AuthForm: FC<IFormAuthProps> = ({ typeAuth }) => {
  const isLoginType = typeAuth === TYPE_AUTH.LOGIN;
  const { useLogin, useSignup } = useAuth();
  const { mutateAsync: login, isLoading: isLoadingLogin } = useLogin();
  const { mutateAsync: signup, isLoading: isLoadingSignup } = useSignup();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TAuthForm>({
    resolver: joiResolver(isLoginType ? loginSchema : registerSchema),
    defaultValues: isLoginType
      ? {}
      : {
          role: USER_ROLE.GUEST,
        },
  });

  const onSubmitLogIn = async (formData: ILoginFormFields) => {
    try {
      await login(formData);
    } catch (error) {
      const message =
        error.response?.status === 409
          ? wrongAuthData
          : commonErrorAuthorization;
      toast.error(message);
    }
  };

  const onSubmitRegistration = async ({
    confirmPassword,
    ...formData
  }: IRegisterFormFields) => {
    try {
      await signup(formData);
    } catch (error) {
      const message =
        error.response?.status === 409 ? userExists : commonErrorAuthorization;
      toast.error(message);
    }
  };

  return (
    <motion.section
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
    >
      <Title className="mb-4">{isLoginType ? logTitle : regTitle}</Title>
      <form
        onSubmit={handleSubmit(
          isLoginType ? onSubmitLogIn : onSubmitRegistration,
        )}
        className="w-full max-w-[392px] mx-auto flex flex-col gap-y-7"
      >
        <TextNavLink
          path={isLoginType ? SIGNUP : LOGIN}
          textBeforeLink={
            isLoginType ? logNavLink.textBeforeLink : regNavLink.textBeforeLink
          }
          textLink={isLoginType ? logNavLink.textLink : regNavLink.textLink}
          color="black"
          underlineLink
          classNameText="text-center"
        />

        <div className="flex flex-col gap-y-5">
          <Input
            id="email"
            label={inputEmailText.label}
            register={register('email')}
            error={errors.email?.message}
            placeholder={inputEmailText.placeholder}
            type="text"
            className={cn(watch('email') && '!text-accent')}
            classNameInput="h-9"
          />

          <Input
            id="password"
            label={inputPasswordText.label}
            register={register('password')}
            error={errors.password?.message}
            placeholder={inputPasswordText.placeholder}
            type="password"
            button
            className={cn(watch('password') && '!text-accent')}
            classNameInput="h-9"
          />

          {!isLoginType && (
            <Input
              id="confirmPassword"
              label={confirmPassword.label}
              register={register('confirmPassword')}
              error={errors.confirmPassword?.message}
              placeholder={confirmPassword.placeholder}
              type="password"
              button
              className={cn(watch('confirmPassword') && '!text-accent')}
              classNameInput="h-9"
            />
          )}

          {!isLoginType && (
            <Input
              id="name"
              label={nameInput.label}
              register={register('name')}
              error={errors.name?.message}
              placeholder={nameInput.placeholder}
              type="text"
              className={cn(watch('name') && '!text-accent')}
              classNameInput="h-9"
            />
          )}

          {!isLoginType && (
            <fieldset>
              <legend>{roles.title}</legend>
              <ul className="grid grid-cols-2 grid-rows-2 gap-3 mt-4">
                {Object.keys(USER_ROLE).map(role => (
                  <li key={role}>
                    <RadioInput
                      labelText={roles.labels[role]}
                      register={register('role', { required: 'required' })}
                      value={role}
                      shapeRadio="circle"
                      watchValue={watch('role')}
                      labelGap="20px"
                      error={errors?.role?.message}
                    />
                  </li>
                ))}
              </ul>
            </fieldset>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            text={backToMain}
            link={ROUTES.HOME}
            isDisabled={isLoadingSignup || isLoadingLogin}
          />
          <Button
            text={buttonSubmitText}
            type="submit"
            isDisabled={isLoadingSignup || isLoadingLogin}
          />
        </div>
      </form>
    </motion.section>
  );
};
