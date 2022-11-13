import { useState } from 'react';

const useDisclose = (initiallyOpen = false) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  return {
    isOpen,
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
    onToggle: () => setIsOpen((state) => !state),
  };
};

export { useDisclose };
