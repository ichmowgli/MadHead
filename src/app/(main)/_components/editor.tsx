import './styles.css';

// import html2canvas from 'html2canvas';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Underline from '@tiptap/extension-underline';
import Document from '@tiptap/extension-document';
import Gapcursor from '@tiptap/extension-gapcursor';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect, useState } from 'react';
import { Icons } from '@/components/icons';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';

const MenuBarIcon = ({ editor }: any) => [
  {
    id: 1,
    name: 'bold',
    icon: Icons.bold,
    onClick: () => editor.chain().focus().toggleBold().run(),
    disable: !editor.can().chain().focus().toggleBold().run(),
    isActive: editor.isActive('bold')
      ? 'is-active text-[#3f3f3f] dark:text-[#3B3B3B]'
      : '',
    hover: false,
  },
  {
    id: 2,
    name: 'italic',
    icon: Icons.italic,
    onClick: () => editor.chain().focus().toggleItalic().run(),
    disable: !editor.can().chain().focus().toggleItalic().run(),
    isActive: editor.isActive('italic')
      ? 'is-active text-[#3f3f3f] dark:text-[#3B3B3B]'
      : '',
    hover: false,
  },
  {
    id: 21,
    name: 'underline',
    icon: Icons.underline,
    onClick: () => editor.chain().focus().toggleUnderline().run(),
    disable: false,
    isActive: editor.isActive('underline')
      ? 'is-active text-[#3f3f3f] dark:text-[#3B3B3B]'
      : '',
    hover: false,
  },
  {
    id: 3,
    name: 'strike',
    icon: Icons.strikethrough,
    onClick: () => editor.chain().focus().toggleStrike().run(),
    disable: !editor.can().chain().focus().toggleStrike().run(),
    isActive: editor.isActive('strike')
      ? 'is-active text-[#3f3f3f] dark:text-[#3B3B3B]'
      : '',
    hover: false,
  },
  {
    id: 4,
    name: 'code',
    icon: Icons.code,
    onClick: () => editor.chain().focus().toggleCode().run(),
    disable: !editor.can().chain().focus().toggleCode().run(),
    isActive: editor.isActive('code')
      ? 'is-active text-[#3f3f3f] dark:text-[#3B3B3B]'
      : '',
    hover: false,
  },
  {
    id: 5,
    name: 'heading1',
    icon: Icons.h1,
    onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    disable: false,
    isActive: editor.isActive('heading', { level: 1 })
      ? 'is-active text-[#3f3f3f] dark:text-[#3B3B3B]'
      : '',
    hover: false,
  },
  {
    id: 6,
    name: 'heading2',
    icon: Icons.h2,
    onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    disable: false,
    isActive: editor.isActive('heading', { level: 2 })
      ? 'is-active text-[#3f3f3f] dark:text-[#3B3B3B]'
      : '',
    hover: false,
  },
  {
    id: 13,
    name: 'heading3',
    icon: Icons.h3,
    onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    disable: false,
    isActive: editor.isActive('heading', { level: 3 })
      ? 'is-active text-[#3f3f3f] dark:text-[#3B3B3B]'
      : '',
    hover: false,
  },
  {
    id: 14,
    name: 'heading4',
    icon: Icons.h4,
    onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
    disable: false,
    isActive: editor.isActive('heading', { level: 4 })
      ? 'is-active text-[#3f3f3f] dark:text-[#3B3B3B]'
      : '',
    hover: false,
  },
  {
    id: 15,
    name: 'heading5',
    icon: Icons.h5,
    onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
    disable: false,
    isActive: editor.isActive('heading', { level: 5 })
      ? 'is-active text-[#3f3f3f] dark:text-[#3B3B3B]'
      : '',
    hover: false,
  },
  {
    id: 7,
    name: 'paragraph',
    icon: Icons.paragraph,
    onClick: () => editor.chain().focus().setParagraph().run(),
    disable: false,
    isActive: editor.isActive('paragraph')
      ? 'is-active text-[#3f3f3f] dark:text-[#3B3B3B]'
      : '',
    hover: false,
  },
  {
    id: 8,
    name: 'bullet list',
    icon: Icons.ul,
    onClick: () => editor.chain().focus().toggleBulletList().run(),
    disable: false,
    isActive: editor.isActive('bulletList')
      ? 'is-active text-[#3f3f3f] dark:text-[#3B3B3B] list-disc'
      : '',
    hover: false,
  },
  {
    id: 9,
    name: 'ordered list',
    icon: Icons.ol,
    onClick: () => editor.chain().focus().toggleOrderedList().run(),
    disable: false,
    isActive: editor.isActive('orderedList')
      ? 'is-active text-[#3f3f3f] dark:text-[#3B3B3B] list-decimal'
      : '',
    hover: false,
  },
  {
    id: 20,
    name: 'highlight',
    icon: Icons.bg,
    onClick: () => editor.chain().focus().toggleHighlight().run(),
    disable: false,
    isActive: editor.isActive('highlight')
      ? 'is-active text-[#3f3f3f] dark:text-[#3B3B3B]'
      : '',
    hover: false,
  },
  {
    id: 16,
    name: 'align left',
    icon: Icons.alignLeft,
    onClick: () => editor.chain().focus().setTextAlign('left').run(),
    disable: false,
    isActive: editor.isActive({ textAlign: 'left' }) ? 'is-active' : '',
    hover: false,
  },
  {
    id: 17,
    name: 'align center',
    icon: Icons.alignCenter,
    onClick: () => editor.chain().focus().setTextAlign('center').run(),
    disable: false,
    isActive: editor.isActive({ textAlign: 'center' })
      ? 'is-active text-[#3f3f3f] dark:text-[#3B3B3B] text-center'
      : '',
    hover: false,
  },
  {
    id: 18,
    name: 'align right',
    icon: Icons.alignRight,
    onClick: () => editor.chain().focus().setTextAlign('right').run(),
    disable: false,
    isActive: editor.isActive({ textAlign: 'right' }) ? 'is-active' : '',
    hover: false,
  },
  {
    id: 19,
    name: 'align justify',
    icon: Icons.alignJustify,
    onClick: () => editor.chain().focus().setTextAlign('justify').run(),
    disable: false,
    isActive: editor.isActive({ textAlign: 'justify' }) ? 'is-active' : '',
    hover: false,
  },
  {
    id: 10,
    name: 'code block',
    icon: Icons.codeblock,
    onClick: () => editor.chain().focus().toggleCodeBlock().run(),
    disable: false,
    isActive: editor.isActive('codeBlock')
      ? 'is-active text-[#3f3f3f] dark:text-[#3B3B3B]'
      : '',
    hover: false,
  },
  {
    id: 11,
    name: 'blockquote',
    icon: Icons.blockquote,
    onClick: () => editor.chain().focus().toggleBlockquote().run(),
    disable: false,
    isActive: editor.isActive('blockquote')
      ? 'is-active text-[#3f3f3f] dark:text-[#3B3B3B]'
      : '',
    hover: false,
  },
];

function MenuBar({ editor }: any) {
  if (!editor) {
    return null;
  }
  const MenuBarIconValue = MenuBarIcon({ editor });

  return (
    <div className='flex w-full flex-wrap items-center gap-2 rounded-t-xl bg-muted-foreground p-2 text-[#f5f5f5] dark:bg-background dark:text-[#CFCFCF]'>
      <input
        type='color'
        onInput={(event: any) =>
          editor.chain().focus().setColor(event.target.value).run()
        }
        value={editor.getAttributes('textStyle').color}
      />
      {MenuBarIconValue.map((item) =>
        item.hover ? (
          <Menubar className='border-none bg-transparent' key={item.id}>
            <MenubarMenu>
              <MenubarTrigger className='p-0'>
                <button
                  key={item.id}
                  disabled={item.disable}
                  className={`${
                    item.disable ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  <item.icon />
                </button>
              </MenubarTrigger>
            </MenubarMenu>
          </Menubar>
        ) : (
          <button
            key={item.id}
            onClick={item.onClick}
            disabled={item.disable}
            className={`${
              item.disable ? 'cursor-not-allowed' : 'cursor-pointer'
            } + ${item.isActive ? item.isActive : ''}`}
          >
            <item.icon />
          </button>
        )
      )}
    </div>
  );
}

type TiptapProps = {
  content: string;
  setContent: (content: string) => void;
  editorText: string;
};

function Tiptap(props: TiptapProps) {
  const { editorText, content, setContent } = props;
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] } as any),
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline.configure({
        HTMLAttributes: {
          class: 'my-custom-class',
        },
      }),
      Highlight,
      Document,
      Paragraph,
      Text,
      Gapcursor,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    editorProps: {
      attributes: {
        class: 'm-2 focus:outline-none',
      },
    },
    content,
  });

  useEffect(() => {
    if (editor && editorText) {
      editor
        .chain()
        .focus()
        .insertContent(editorText)
        .insertContent(`<br />`)
        .run();
    }
  }, [editorText, editor]);

  useEffect(() => {
    editor?.chain().focus().insertContent(content).run();
  }, [content, editor]);

  return (
    <div className='w-full rounded-2xl border-4 border-muted-foreground dark:border-background'>
      <MenuBar editor={editor} />
      <EditorContent className='w-full overflow-auto p-3' editor={editor} />
    </div>
  );
}

export default Tiptap;
