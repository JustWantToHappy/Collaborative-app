import { Modal } from 'antd';
import React from 'react';

interface Props {
  open: boolean;
  close: () => void;
}


const Index: React.FC<Props> = (props) => {
  const { open, close } = props;

  return (
    <Modal title='共享文件' open={open} onCancel={close}>

    </Modal>
  );
};

export default Index;