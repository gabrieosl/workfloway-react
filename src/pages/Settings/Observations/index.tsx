import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FiEye } from 'react-icons/all';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import { useBase } from '../../../hooks/base';

import List from '../List';
import CreateNewPopup from '../../../components/CreateNewPopup';
import Input from '../../../components/Input';
import { Container, ButtonBox } from './styles';

interface SignInFormData {
  name: string;
}

interface ObservationTypesProps {
  id: string;
  name: string;
}

const ObservationTypess: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { types, refreshData } = useBase();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
        });
        await schema.validate(data, { abortEarly: false });

        await api.post('/types', {
          name: data.name,
        });
        toast.success('Criado');
        refreshData('types');
      } catch (err) {
        toast.error(err);
      }
      window.location.reload();
    },
    [refreshData],
  );

  const handleDelete = useCallback(
    id => {
      api.delete(`/types/${id}`).then(response => {
        if (response.status === 204) {
          toast.success('Removido');
        }
      });
      refreshData('types');
    },
    [refreshData],
  );

  const handleUpdate = useCallback(
    (id, newData) => {
      api.put(`types/${id}`, newData).then(response => {
        if (response.status === 200) {
          toast.success('Atualizado');
          refreshData('types');
        }
      });
    },
    [refreshData],
  );

  return (
    <Container>
      <ButtonBox>
        <CreateNewPopup text="New Type">
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="name"
              type="text"
              placeholder="New type name"
              icon={FiEye}
            />
            <button type="submit">Criar</button>
          </Form>
        </CreateNewPopup>
      </ButtonBox>
      <List
        items={types}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </Container>
  );
};

export default ObservationTypess;
