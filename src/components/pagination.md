# CustomPagination component

## props

- count: total count of pages (integer)
- activePage: currently active page (integer)
- onChange: page change event handler

### prop examples

count:

```jsx
const count = pages.length;
```

activePage:

```js
const activePage = activePageState;
```

onChange:

```js
const onChange = (event, value) => setPage(value);
```

## Example

```jsx
export default function PaginationControlled() {
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <CustomPagination count={10} activePage={page} onChange={handleChange} />
  );
}
```
