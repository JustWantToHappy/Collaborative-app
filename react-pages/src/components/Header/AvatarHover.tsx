import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LocalStorageKey } from '@/enums';
import { useLocalStorage } from '@/hooks';

export default function AvatarHover() {
  const [, , removeToken] = useLocalStorage(LocalStorageKey.User_Info, '');
  const navigate = useNavigate();

  return (
    <div>
      <Button
        type="link"
        onClick={() => {
          removeToken();
          navigate('/');
        }}
      >
        退出登录
      </Button>
    </div>
  );
}
