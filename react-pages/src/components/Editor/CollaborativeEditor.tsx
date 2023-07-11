import React from 'react';
import { notification } from 'antd';
import type { User } from '@/types';
import ReactQuill from 'react-quill';
import { QuillBinding } from 'y-quill';
import { useLocalStorage } from '@/hooks';
import { LocalStorageKey } from '@/enum';
import { WebrtcProvider } from 'y-webrtc';
import { BasicEditor } from './BasicEditor';
import { Awareness } from 'y-protocols/awareness';
import { singleWebrtcProvider, getRandomColor, sharedSocket } from '@/utils';

type Props = {
  deltaStr: string;
  version: number;
  sharedCloudFileId: string;
}

export const CollaborativeEditor: React.FC<Props> = (props) => {
  const [notify, contextHolder] = notification.useNotification();
  const ydoc = singleWebrtcProvider.getYDoc();
  const ytext = ydoc.getText('quill');
  const [edit, setEdit] = React.useState(false);
  const [user] = useLocalStorage(LocalStorageKey.User_Info);
  const editorRef = React.useRef<ReactQuill | null>(null);
  const quillBindingRef = React.useRef<QuillBinding>();
  const providerRef = React.useRef<WebrtcProvider>();
  const awareness = React.useRef<Awareness>();
  const preLocalStateRef = React.useRef<{ [x in string]: any } | null | undefined>();

  const changeEdit = (edit: boolean) => setEdit(edit);


  React.useEffect(() => {
    const cursors = document.querySelector('.ql-cursors') as HTMLDivElement;

    const handleAwarenessChange = () => {
      //获取在线编辑的用户信息
      if (providerRef.current) {
        PubSub.publish('onlineEdit', Array.from(providerRef.current.awareness.getStates().values())
          .map(state => state.user)
          .filter(state => state !== undefined));
      }
    };
    //进入编辑模式后
    if (edit) {
      cursors.style.display = 'block';//显示光标

      const provider = singleWebrtcProvider.joinWebRtcRoom(props.sharedCloudFileId);

      //用户重新进入编辑模式
      if (!provider?.awareness.getLocalState()) {
        provider?.awareness.setLocalState(preLocalStateRef); //加入用户本地状态
      }
      //用户意识相关
      provider?.awareness.setLocalStateField('user', {
        name: user.name,
        color: getRandomColor(user.name),
        avatar: user.avatar,
        email: user.email,
      });
      provider?.awareness.on('change', handleAwarenessChange);

      providerRef.current = provider;
      quillBindingRef.current = new QuillBinding(ytext, editorRef.current?.editor, provider?.awareness);
      //保存用户之前的awareness实例的本地状态
      preLocalStateRef.current = provider?.awareness.getLocalState();
      awareness.current = provider?.awareness;
    } else {
      providerRef.current?.awareness.setLocalState(null); //将当前用户的本地状态移除
      cursors.style.display = 'none';//隐藏光标
    }

    return function () {
      if (edit) {
        providerRef.current?.awareness.setLocalState(null);
        providerRef.current?.awareness.off('change', handleAwarenessChange);
        quillBindingRef.current?.destroy?.();
      }
    };
  }, [edit, props.sharedCloudFileId, user, ytext]);


  React.useEffect(() => {
    if (!sharedSocket.connected) sharedSocket.connect();
    if (edit) {
      sharedSocket.emit('join',
        { documentId: props.sharedCloudFileId, userId: user.id },
        (usersCount: number) => {
          //如果当前用户只有一个，则初始化文档
          if (usersCount === 1) {
            editorRef.current?.editor?.setContents(JSON.parse(props.deltaStr));
          }
        });
    }
    return function () {
      if (sharedSocket.connected) sharedSocket.disconnect();
    };
  }, [edit, props.sharedCloudFileId, user.id, notify, props.deltaStr]);

  React.useEffect(() => {
    sharedSocket.on('join', (user: User) => {
      notify.info({
        message: <p style={{ display: 'flex', alignItems: 'center', columnGap: '2px' }}>
          <small style={{ fontWeight: 700 }}>{user.name}</small>
          <small>加入编辑</small>
        </p>,
      });
    });
    sharedSocket.on('leave', (user: User) => {
      notify.info({
        message: <p style={{ display: 'flex', alignItems: 'center', columnGap: '2px' }}>
          <small style={{ fontWeight: 700 }}>{user.name}</small>
          <small>离开编辑</small>
        </p>,
      });
    });
    return function () {
      sharedSocket.off('join');
      sharedSocket.off('leave');
    };
  }, [notify]);

  return <>
    {contextHolder}
    <BasicEditor {...props} ref={editorRef} changeEdit={changeEdit} />
  </>;
};
