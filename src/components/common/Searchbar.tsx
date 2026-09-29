import { Search } from "lucide-react";
import { Flex } from "./layout";
import { Input } from "../ui/input";
import { useRef, type ChangeEvent } from "react";

type SearchbarProps = {
  onChange: (value: string) => void;
  name?: string;
  value?: string;
  placeholder?: string;
};

function Searchbar({
  value,
  onChange,
  name = "searchbar",
  placeholder = "Search...",
}: SearchbarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    onChange?.(value);
  }

  return (
    <Flex
      className="items-center gap-2 bg-muted-foreground/20 rounded-xl overflow-hidden px-3 focus-within:ring"
      role="searchbox"
      onClick={() => {
        inputRef.current?.focus();
      }}
    >
      <Search size={16} className="text-muted-foreground" />
      <Input
        className="ring-transparent border-none ring-0! px-0 flex-1"
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={handleChange}
        ref={inputRef}
      />
    </Flex>
  );
}

export default Searchbar;
