'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { COOKIE_NAMES } from '@/lib/cookie/names';
import { setCookie } from '@/lib/cookie/store';

type Props = {
  value: string | undefined;
};
export const SwitchSprites = ({ value = 'officialArtwork' }: Props) => {
  const handleChange = async (value: string) => {
    await setCookie(COOKIE_NAMES.SPRITES_TYPE, value);
  };

  return (
    <RadioGroup
      defaultValue={value || 'officialArtwork'}
      onValueChange={handleChange}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="officialArtwork" id="officialArtwork" />
        <Label htmlFor="officialArtwork">Official Artwork</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="default" />
        <Label htmlFor="default">Default</Label>
      </div>
    </RadioGroup>
  );
};
