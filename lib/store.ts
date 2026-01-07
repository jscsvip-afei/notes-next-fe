import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Note {
  id: string;
  title: string;
  content: string;
  updateTime: string;
}

interface NotesState {
  notes: Record<string, Note>;
  initialized: boolean;
  
  // Actions
  initializeNotes: () => void;
  addNote: (title: string, content: string) => string;
  updateNote: (id: string, title: string, content: string) => void;
  deleteNote: (id: string) => void;
  getNote: (id: string) => Note | null;
  getAllNotes: () => Note[];
}

// 示例 Markdown 笔记
const sampleMarkdownNote: Omit<Note, 'id'> = {
  title: "Markdown 语法示例",
  content: `# 欢迎使用 Markdown 笔记

这是一段测试内容，展示了常用的 Markdown 语法。

## 1. 文本样式
- **加粗文本**
- *斜体文本*
- ~~删除线~~
- \`行内代码\`

## 2. 列表
1. 第一项
2. 第二项
3. 第三项

## 3. 代码块
\`\`\`javascript
function helloWorld() {
  console.log("Hello, Markdown!");
}
\`\`\`

## 4. 引用
> 这是一个引用区块。
> 它可以包含多行文字。

## 5. 图片
![示例图片](https://lishhsx6kmthaacj.public.blob.vercel-storage.com/delivered-web-apps-min.svg)
![示例图片](https://lishhsx6kmthaacj.public.blob.vercel-storage.com/delivered-commerce-min.svg)

---
*最后更新于: ${new Date().toLocaleString('zh-CN')}*
`,
  updateTime: new Date().toISOString()
};

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: {},
      initialized: false,

      initializeNotes: () => {
        const state = get();
        if (state.initialized) return;
        
        const noteCount = Object.keys(state.notes).length;
        if (noteCount === 0) {
          const id = Date.now().toString();
          set({
            notes: {
              [id]: {
                id,
                ...sampleMarkdownNote
              }
            },
            initialized: true
          });
        } else {
          set({ initialized: true });
        }
      },

      addNote: (title: string, content: string) => {
        const id = Date.now().toString();
        const newNote: Note = {
          id,
          title,
          content,
          updateTime: new Date().toISOString()
        };
        
        set((state) => ({
          notes: {
            ...state.notes,
            [id]: newNote
          }
        }));
        
        return id;
      },

      updateNote: (id: string, title: string, content: string) => {
        set((state) => ({
          notes: {
            ...state.notes,
            [id]: {
              ...state.notes[id],
              title,
              content,
              updateTime: new Date().toISOString()
            }
          }
        }));
      },

      deleteNote: (id: string) => {
        set((state) => {
          const { [id]: _, ...rest } = state.notes;
          return { notes: rest };
        });
      },

      getNote: (id: string) => {
        const state = get();
        return state.notes[id] || null;
      },

      getAllNotes: () => {
        const state = get();
        return Object.values(state.notes).sort(
          (a, b) => new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime()
        );
      }
    }),
    {
      name: 'notes-storage',
      onRehydrateStorage: () => (state) => {
        // 在从 localStorage 恢复数据后自动初始化
        if (state) {
          state.initializeNotes();
        }
      }
    }
  )
);
