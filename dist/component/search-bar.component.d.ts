/// <reference types="react" />
interface Props {
    query: string;
    setQuery: (query: string) => void;
    onSearch: (query: string) => void;
}
declare function SearchBar({ setQuery, query, onSearch }: Props): JSX.Element;
export default SearchBar;
