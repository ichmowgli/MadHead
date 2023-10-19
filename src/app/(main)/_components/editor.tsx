'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const Editor = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
    extensions: [StarterKit],
    content: '',
  });

  return (
    <div className='h-[calc(100%-100px)] rounded-md dark:bg-[#ffff] md:max-w-3xl lg:max-w-4xl'>
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
