'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import itemsData from '@/constants/generated/items.json';
import Image from 'next/image';
import { useState } from 'react';

const replaceKana = (str: string) => {
  return str
    .replace(/[\u30a1-\u30f6]/g, (match) => {
      const chr = match.charCodeAt(0) - 0x60;

      return String.fromCharCode(chr);
    })
    .replace(/[\u30f7-\u30fc]/g, (match) => {
      const chr = match.charCodeAt(0) - 0x60;
      return String.fromCharCode(chr);
    });
};

export const SearchItem = () => {
  const [itemName, setItemName] = useState('');
  const [itemResults, setItemResults] = useState<typeof itemsData>(itemsData);

  const searchItem = () => {
    if (itemName.length === 0) {
      setItemResults(itemsData);
      return;
    }
    const itemResults = itemsData.filter((item) => {
      const kanaQuery = replaceKana(itemName);

      if (typeof item.name.ja === 'string') {
        const kanaName = replaceKana(item.name.ja);

        return kanaName.includes(kanaQuery);
      }
    });
    setItemResults(itemResults);
  };

  return (
    <div className="bg-background px-4 pb-4">
      <form
        className="sticky top-0 flex gap-2 border-b bg-white p-4"
        onSubmit={(e) => {
          e.preventDefault();
          searchItem();
        }}
      >
        <Input
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Search item"
        />
        <Button disabled={itemName.length === 1} type="submit">
          Search
        </Button>
      </form>
      <div className="grid grid-cols-3 border-l">
        {itemResults.map((item) => {
          return (
            <div
              key={item.id}
              className="flex w-44 items-center gap-2 border-b border-r p-1"
            >
              <Image
                src={item.sprites.default as string}
                width={40}
                height={40}
                alt=""
              />
              <div>
                <div className="text-xs">{item.name.entity}</div>
                <div className="text-sm">{item.name.ja}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
