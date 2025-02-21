'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import Form from 'next/form';
import { useRouter } from 'next/navigation';
import { createRoom } from '../_utils/actions';

export const CreateRoomButton = () => {
  const router = useRouter();
  const handleOnAction = async (formData: FormData) => {
    const response = await createRoom(formData);
    if (!response) return;
    router.push(`/rooms/${response[0].id}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="fixed bottom-5 right-5 rounded-full"
        >
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新しく部屋を作成</DialogTitle>
          <DialogDescription>
            他のプレイヤーと一緒に遊ぶために部屋を作成します。
          </DialogDescription>
        </DialogHeader>
        <Form action={handleOnAction} className="flex gap-2">
          <Input name="name" />
          <Button type="submit">Submit</Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
