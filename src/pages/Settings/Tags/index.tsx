import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FiTag } from 'react-icons/all';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import List from '../List';
import CreateNewPopup from '../../../components/CreateNewPopup';
import Input from '../../../components/Input';
import { Container, ButtonBox } from './styles';

interface SignInFormData {
  name: string;
}

interface TagProps {
  id: string;
  name: string;
}

const Tags: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [tags, setTags] = useState<TagProps[]>([]);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
        });
        await schema.validate(data, { abortEarly: false });

        const tag = await api.post('/tags', {
          name: data.name,
        });
        tags.push(tag.data);
        toast.success('Criado');
      } catch (err) {
        toast.error(err);
      }
      window.location.reload();
    },
    [tags],
  );

  const handleDelete = useCallback(id => {
    api.delete(`/tags/${id}`).then(response => {
      if (response.status === 204) {
        toast.success('Removido');
      }
    });
    setTags(prev => prev.filter(tag => tag.id !== id));
  }, []);

  const handleUpdate = useCallback((id, newData) => {
    api.put(`tags/${id}`, newData).then(response => {
      if (response.status === 200) {
        toast.success('Atualizado');
        setTags(prev => prev.map(tag => (tag.id !== id ? tag : response.data)));
      }
    });
  }, []);

  useEffect(() => {
    async function getData() {
      const response = await api.get('/tags');
      if (response.status === 200) {
        setTags(response.data);
      }
    }
    getData();
  }, []);

  return (
    <Container>
      <ButtonBox>
        <CreateNewPopup text="New Tag">
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="name"
              type="text"
              placeholder="New tag name"
              icon={FiTag}
            />
            <button type="submit">Criar</button>
          </Form>
        </CreateNewPopup>
      </ButtonBox>
      <List
        items={tags}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </Container>
  );
};

export default Tags;
