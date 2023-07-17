import React from 'react';

export function useTitle(title:string) {
  React.useEffect(() => {
    document.title=`${title}-在线文档协作平台`;
  },[title]);
}