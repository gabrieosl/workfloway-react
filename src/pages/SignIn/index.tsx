import React, { useCallback, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { FiMail, FaLock } from 'react-icons/all';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../context/AuthContext';

import { Container, Content } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn, user } = useAuth();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Formato de e-mail inválido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    },
    [signIn],
  );

  return user ? (
    <Redirect to="dashboard" />
  ) : (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
          <Input name="email" placeholder="E-mail" icon={FiMail} />
          <Input
            name="password"
            type="password"
            placeholder="Senha"
            icon={FaLock}
          />
          <button type="submit">Entrar</button>
          <a href="forgot">Esqueci minha senha</a>
        </Form>
      </Content>
    </Container>
  );
};

export default SignIn;
