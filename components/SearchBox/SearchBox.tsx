import css from './SearchBox.module.css'
interface SearchBoxProps { 
  value: string;
  onSearch: (query: string) => void;
}
export default function SearchBox({ value,onSearch }: SearchBoxProps){ 
  return (
    <input type="text"
      className={ css.name}
      value={value}
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Write name of the meal..."
      aria-label='Search query'
    />
  )
}