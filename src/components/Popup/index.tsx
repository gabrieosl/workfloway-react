import React, { useCallback } from 'react';
import { MdClose } from 'react-icons/md';

import { Container, Wrapper } from './styles';

interface PopupProps {
  onClose(value: boolean): void;
}
const Popup: React.FC<PopupProps> = ({ onClose, children }) => {
  const handleClose = useCallback(
    e => {
      if (e.currentTarget.id === e.target.id) {
        onClose(false);
      }
    },
    [onClose],
  );

  return (
    <Container id="popup-void-area" onClick={handleClose}>
      <Wrapper>
        <button
          className="popup-close-button"
          type="button"
          onClick={handleClose}
        >
          <MdClose />
        </button>
        {children}
      </Wrapper>
    </Container>
  );
};

export default Popup;
