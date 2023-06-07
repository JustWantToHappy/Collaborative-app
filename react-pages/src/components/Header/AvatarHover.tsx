import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LocalStorageKey } from '@/enums';
import { useLocalStorage } from '@/hooks';
import styled from 'styled-components';


const StyleDiv = styled('div')`
  display: flex;
  flex-direction:column;
`;

export default function AvatarHover() {
  const [, , removeToken] = useLocalStorage(LocalStorageKey.User_Info, '');
  const navigate = useNavigate();

  return (
    <StyleDiv>
      <Button
        type="link"
      //这里就使用模态框的形式展示用户信息
      >
        个人信息
      </Button>
      <Button
        type="link"
        onClick={() => {
          removeToken();
          navigate('/');
        }}
      >
        退出登录
      </Button>
    </StyleDiv>
  );
}
