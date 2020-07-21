import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { MdAdd, FiTag } from 'react-icons/all';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import List from '../List';
import CreateNew from '../../../components/CreateNew';
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
        console.log('lala');
        toast.success('Criado');
      } catch (err) {
        toast.error(err);
      }
    },
    [tags],
  );

  const handleDelete = useCallback(id => {
    api.delete(`/tags/${id}`).then(response => {
      if (response.status === 200) {
        toast.success('Removido');
      }
    });
    setTags(prev => prev.filter(tag => tag.id !== id));
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
        <CreateNew text="New Tag">
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="name"
              type="text"
              placeholder="New tag name"
              icon={FiTag}
            />
            <button type="submit">Criar</button>
          </Form>
        </CreateNew>
      </ButtonBox>
      <List items={tags} handleDelete={handleDelete} handleEdit={id => null} />
    </Container>
  );
};

export default Tags;
