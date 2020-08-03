import React, { useState, useCallback, useEffect } from 'react';
import { MdAdd, MdCheck } from 'react-icons/all';
import { produce } from 'immer';
import * as CSV from 'csv-string';
import Select from 'react-select';

import { toast } from 'react-toastify';
import api from '../../services/api';

import { useBase } from '../../hooks/base';

import { Container } from './styles';

interface ProductProps {
  name: string;
  tags: {
    [key: string]: string;
  };
}

interface SelectOptions {
  value?: string;
  label: string;
}

interface CreateProductProps {
  onClose(value: boolean): void;
  refreshData(): void;
}

const CreateProduct: React.FC<CreateProductProps> = ({
  onClose,
  refreshData,
}) => {
  const { tags, getIdByName } = useBase();

  const [products, setProducts] = useState<ProductProps[]>([
    // { name: '', tags: {} },
  ]);
  const [options, setOptions] = useState<SelectOptions[]>([]);
  const [selectedOption, setSelectedOption] = useState<SelectOptions>(
    {} as SelectOptions,
  );
  const [menu, setMenu] = useState<'manual' | 'import'>('manual');

  const appendProduct = useCallback(
    () => setProducts(prev => [...prev, { name: '', tags: {} }]),
    [],
  );

  const handleNameChange = useCallback(
    (index, newValue) =>
      setProducts(
        produce(products, prev => {
          prev[index].name = newValue;
          return prev;
        }),
      ),
    [products],
  );

  const handleTagChange = useCallback(
    (index, tagId, newValue) =>
      setProducts(
        produce(products, prev => {
          prev[index].tags[tagId] = newValue;
          return prev;
        }),
      ),
    [products],
  );

  const handleFileChange = useCallback(
    e => {
      const reader = new FileReader();
      reader.onload = () => {
        const data = CSV.parse(String(reader.result));
        const columns = data[0];
        // TODO check if mandatory columns are present.
        // TODO check if there are new tags.

        const parsed: ProductProps[] = [];

        data.slice(1).forEach(row => {
          const item = { tags: {} } as ProductProps;
          columns.forEach((column, index) => {
            if (column === 'name') item.name = row[index];
            else {
              const tagId = getIdByName(column, 'tags');
              if (tagId) item.tags[tagId] = row[index];
            }
          });

          parsed.push(item);
        });

        setProducts(parsed);
      };
      reader.readAsText(e.target.files[0]);

      // console.log(reader.result);
    },
    [getIdByName],
  );

  const handleOptionChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (newOption: any) => {
      setSelectedOption(newOption);
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    api
      .post('/subjects', { items: products, workflow_id: selectedOption.value })
      .then(response => {
        if (response.status === 201) {
          toast.success('Created!');
          // window.location.reload(false);
          onClose(false);
          refreshData();
        }
      })
      .catch(() => {
        toast.error('Error!');
      });
  }, [onClose, products, refreshData, selectedOption.value]);

  useEffect(() => {
    api.get('/workflows').then(response => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const workflows = response.data.map((option: { id: any; name: any }) => ({
        value: option.id,
        label: option.name,
      }));
      setOptions(workflows);
    });
  }, []);

  return (
    <Container>
      <nav>
        <button
          type="button"
          className={menu === 'manual' ? ' active' : ''}
          onClick={() => setMenu('manual')}
        >
          Manual input
        </button>
        <button
          type="button"
          className={menu === 'import' ? ' active' : ''}
          onClick={() => setMenu('import')}
        >
          Import from .CSV
        </button>
      </nav>

      {menu === 'manual' ? (
        <main>
          <strong>Enter the data</strong>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                {tags.map(tag => (
                  <th key={tag.id}>{tag.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      value={product.name}
                      onChange={e => handleNameChange(index, e.target.value)}
                    />
                  </td>
                  {tags.map(tag => (
                    <td key={tag.id}>
                      <input
                        type="text"
                        value={product.tags[tag.id]}
                        onChange={e =>
                          handleTagChange(index, tag.id, e.target.value)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button id="new-line" type="button" onClick={appendProduct}>
            <MdAdd />
            New Line
          </button>
        </main>
      ) : (
        <main>
          <strong>Select the CSV file..</strong>
          <small>The file should contain the following columns:</small>
          <p>
            <span>name</span>
            {tags.map(tag => (
              <span>{tag.name}</span>
            ))}
          </p>
          <input type="file" className="file" onChange={handleFileChange} />
        </main>
      )}
      {!!products.length && (
        <>
          <small>{`Detected ${products.length} items to create.`}</small>
          {products.map(item => (
            <span>{item.name}</span>
          ))}
          <small>Select workflow to attach the new products to:</small>
          <Select
            options={options}
            onChange={handleOptionChange}
            value={selectedOption}
          />
          <button id="create" type="button" onClick={handleSubmit}>
            <MdCheck />
            Confirm
          </button>
        </>
      )}
    </Container>
  );
};

export default CreateProduct;
