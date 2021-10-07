# StatusIndicator component

## props

- status: one of `active`, `inactive`, `draft` (active for success(green), inactive for error(red), draft for warning(yellow))
- title: the title beside the badge

## Example

```jsx
      <Status status="active" title="Active" />
      <Status status="inactive" title="In-Active" />
      <Status status="draft" title="In draft" />
```
