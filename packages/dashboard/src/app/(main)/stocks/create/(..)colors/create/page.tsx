import CreateColorPage from '@/app/(main)/stocks/colors/create/page';
import { Modal } from 'antd';

const CreateColorModal: React.FC = () => (
  <Modal open title="Create Color" footer={null} closable={false}>
    <CreateColorPage />
  </Modal>
);

export default CreateColorModal;
