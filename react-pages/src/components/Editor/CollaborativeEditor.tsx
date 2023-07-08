import React from 'react';
import ReactQuill from 'react-quill';
import { QuillBinding } from 'y-quill';
import { singleWebrtcProvider } from '@/utils';
import { BasicEditor } from './BasicEditor';
import { useWebRtcProvider, useLocalStorage } from '@/hooks';
import { LocalStorageKey } from '@/enum';
import type { Props as BasicProps } from './BasicEditor';


interface Props extends BasicProps {
  sharedCloudFileId: string;
}

export const CollaborativeEditor: React.FC<Props> = ({ sharedCloudFileId, ...props }) => {
  const editorRef = React.useRef<ReactQuill | null>(null);
  const quillBindingRef = React.useRef<QuillBinding>();
  const [userInfo] = useLocalStorage(LocalStorageKey.User_Info);
  //const provider = useWebRtcProvider({ name: userInfo.name, id: userInfo.id }, sharedCloudFileId);

  React.useEffect(() => {
    if (editorRef.current) {
      const ydoc = singleWebrtcProvider.getYDoc();
      const ytext = ydoc.getText('quill');
      const provider = singleWebrtcProvider.joinWebRtcRoom(sharedCloudFileId);
      const quillBinding = new QuillBinding(ytext, editorRef.current.editor, provider?.awareness);
      quillBindingRef.current = quillBinding;
    }
    return function () {
      quillBindingRef.current?.destroy();
    };
  }, [sharedCloudFileId]);

  return <BasicEditor {...props} editable ref={editorRef} />;
};