import React, { useState } from 'react';

import { MdClose, MdAdd } from 'react-icons/md';
import { CreateButton, Container, Content } from './styles';

interface CreateNewPopupProps {
  text: string;
}

const CreateNewPopup: React.FC<CreateNewPopupProps> = ({ children, text }) => {
  const [showCard, setShowCard] = useState(false);

  return (
    <>
      <CreateButton
        type="button"
        className="create"
        onClick={() => setShowCard(true)}
      >
        <MdAdd />
        {text}
      </CreateButton>
      {showCard && (
        <Container>
          <button
            type="button"
            className="close"
            onClick={() => setShowCard(false)}
          >
            <MdClose />
          </button>
          <Content>{children}</Content>
        </Container>
      )}
    </>
  );
};

export default CreateNewPopup;
