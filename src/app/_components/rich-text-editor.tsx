"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";
import { FiBold, FiItalic, FiLink } from "react-icons/fi";

type Props = {
  content: string;
  onChange: (value: string) => void;
};

export default function RichTextEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content]);

  const addLink = () => {
    const url = window.prompt("Enter URL");
    if (url) {
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  return (
    <div className="rounded-lg p-3 border border-gray-300 shadow-sm">
      <div className="flex gap-2 border-b pb-2 mb-2">
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`p-1 cursor-pointer  rounded hover:bg-gray-200 ${
            editor?.isActive("bold") ? "bg-gray-300" : ""
          }`}
        >
          <FiBold />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`p-1 cursor-pointer  rounded hover:bg-gray-200 ${
            editor?.isActive("italic") ? "bg-gray-300" : ""
          }`}
        >
          <FiItalic />
        </button>
        <button
          type="button"
          onClick={addLink}
          className="p-1  cursor-pointer rounded hover:bg-gray-200"
        >
          <FiLink />
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="h-[200px] overflow-auto text-sm leading-tight outline-none focus:outline-none [&_.ProseMirror]:h-full [&_.ProseMirror]:outline-none"
      />
    </div>
  );
}
