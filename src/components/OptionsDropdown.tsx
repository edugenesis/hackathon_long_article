import { createSignal } from 'solid-js';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from '~/components/ui/dropdown-menu';

export interface Options {
  ads: 'disabled' | 'enabled' | 'optimized';
  embeds: 'disabled' | 'enabled' | 'optimized';
}

const loadOptions = (): Options => {
  const storedOptions = localStorage.getItem('options');
  if (storedOptions) {
    return JSON.parse(storedOptions);
  }
  return {
    ads: 'optimized',
    embeds: 'optimized'
  };
};

export const [options, setOptions] = createSignal<Options>(loadOptions());

export function OptionsDropdown() {
  const updateOptions = (key: keyof Options, value: Options[keyof Options]) => {
    setOptions((prev) => {
      const newOptions = { ...prev, [key]: value };
      localStorage.setItem('options', JSON.stringify(newOptions));
      return newOptions;
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger as="button">Options</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem disabled class="font-bold">
          Ads
        </DropdownMenuItem>
        <DropdownMenuRadioGroup
          value={options().ads}
          onChange={(value) => updateOptions('ads', value as Options['ads'])}>
          <DropdownMenuRadioItem value="disabled">Disabled</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="enabled">Enabled</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="optimized">Optimized</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem disabled class="font-bold">
          Embeddings
        </DropdownMenuItem>
        <DropdownMenuRadioGroup
          value={options().embeds}
          onChange={(value) => updateOptions('embeds', value as Options['embeds'])}>
          <DropdownMenuRadioItem value="disabled">Disabled</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="enabled">Enabled</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="optimized">Optimized</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
