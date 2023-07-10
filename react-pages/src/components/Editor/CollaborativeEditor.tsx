import React from 'react';
import ReactQuill from 'react-quill';
import { QuillBinding } from 'y-quill';
import { BasicEditor } from './BasicEditor';
import { useLocalStorage } from '@/hooks';
import { LocalStorageKey } from '@/enum';
import { singleWebrtcProvider, getRandomColor } from '@/utils';
import { WebrtcProvider } from 'y-webrtc';
import { Awareness } from 'y-protocols/awareness';

type Props = {
  deltaStr: string;
  sharedCloudFileId: string;
}

export const CollaborativeEditor: React.FC<Props> = (props) => {
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
      editorRef.current?.editor?.focus();

      const provider = singleWebrtcProvider.joinWebRtcRoom(props.sharedCloudFileId);

      //用户重新进入编辑模式
      if (!provider?.awareness.getLocalState()) {
        provider?.awareness.setLocalState(preLocalStateRef); //加入用户本地状态
      }

      provider?.awareness.setLocalStateField('user', {
        name: user.name,
        color: getRandomColor(user.name),
        avatar: user.avatar,
        email: user.email,
      });
      providerRef.current = provider;
      quillBindingRef.current = new QuillBinding(ytext, editorRef.current?.editor, provider?.awareness);
      provider?.awareness.on('change', handleAwarenessChange);
      //保存用户之前的awareness实例的本地状态
      preLocalStateRef.current = provider?.awareness.getLocalState();
      awareness.current = provider?.awareness;
    } else {
      //将当前用户的本地状态移除
      providerRef.current?.awareness.setLocalState(null);
      cursors.style.display = 'none';//隐藏光标
    }
    
    return function () {
      if (edit) {
        providerRef.current?.awareness.off('change', handleAwarenessChange);
        quillBindingRef.current?.destroy?.();
      }
    };
  }, [edit, props.sharedCloudFileId, user, ytext]);

  return <BasicEditor {...props} ref={editorRef} changeEdit={changeEdit} />;
};
