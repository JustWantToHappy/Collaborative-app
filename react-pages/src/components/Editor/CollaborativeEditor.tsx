import React from 'react';
import ReactQuill from 'react-quill';
import { QuillBinding } from 'y-quill';
import { singleWebrtcProvider } from '@/utils';
import { BasicEditor } from './BasicEditor';
import { useWebRtcProvider, useLocalStorage } from '@/hooks';
import { LocalStorageKey } from '@/enum';

type Props = {
  deltaStr: string;
  sharedCloudFileId: string;
}
export const CollaborativeEditor: React.FC<Props> = (props) => {
  const editorRef = React.useRef<ReactQuill | null>(null);
  const quillBindingRef = React.useRef<QuillBinding>();
  const [userInfo] = useLocalStorage(LocalStorageKey.User_Info);
  const provider = useWebRtcProvider({ name: userInfo.name, id: userInfo.id }, props.sharedCloudFileId);

  React.useEffect(() => {
    const ydoc = singleWebrtcProvider.getYDoc();
    const ytext = ydoc.getText('quill');
    const quillBinding = new QuillBinding(ytext, editorRef.current?.editor, provider?.awareness);
    provider?.awareness.on('change', () => {
      console.info(Array.from(provider.awareness.getStates().values()), 'all users');
    });
    quillBindingRef.current = quillBinding;
    editorRef.current?.editor?.focus();
    return function () {
      quillBindingRef.current?.awareness?.destroy();
      quillBindingRef.current?.destroy();
    };
  }, [provider]);

  return <BasicEditor
    {...props}
    editable ref={editorRef}
    sharedCloudFileId={props.sharedCloudFileId} />;
};