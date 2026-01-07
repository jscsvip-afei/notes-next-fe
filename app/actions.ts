import { z } from 'zod';

const schema = z.object({
  title: z.string().min(1, 'Title is required').max(50, '标题过长，请缩短至50字以内'),
  content: z.string().min(1, 'Content is required').max(1000, '内容过长，请缩短至1000字以内'),
});

export function validateNote(title: string, content: string) {
  const validated = schema.safeParse({ title, content });

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  return { success: true, errors: {} };
}
