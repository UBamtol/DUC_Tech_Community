import { useEffect, useRef } from 'react';
// import { useTheme } from 'next-themes';

const Comments = () => {
  const commentsRef = useRef<HTMLElement | null>(null);

  // // 아래 코드는 다크모드 적용을 위한 내용이기에 생략해도 무관하다.
  // const { theme, systemTheme } = useTheme();
  // const commentsTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    const scriptEl = document.createElement('script');
    scriptEl.src = 'https://utteranc.es/client.js';
    scriptEl.async = true;
    scriptEl.crossOrigin = 'anonymous';
    scriptEl.setAttribute('repo', 'UBamtol/DUC_Comments');
    scriptEl.setAttribute('issue-term', 'pathname');
    scriptEl.setAttribute('theme', 'github-light');
    scriptEl.setAttribute('label', 'Comment');

    commentsRef.current?.appendChild(scriptEl);
  }, []);

  return <section ref={commentsRef} />;
};

export default Comments;
