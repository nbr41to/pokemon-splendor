'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { COOKIE_NAMES } from '@/lib/cookie/names';
import { setCookie } from '@/lib/cookie/store';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export const SaveNameDialog = () => {
  const action = async (formData: FormData) => {
    const name = formData.get('name');
    if (typeof name !== 'string') return;
    if (name.length > 8) return;

    setCookie(COOKIE_NAMES.PLAYER_NAME, name);
  };

  return (
    <Dialog defaultOpen open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>あなたのお名前は？</DialogTitle>
          <DialogDescription>8文字以内で入力してください。</DialogDescription>
        </DialogHeader>
        <form action={action} className="flex gap-x-4">
          <Input name="name" maxLength={8} />
          <Button type="submit">保存</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
