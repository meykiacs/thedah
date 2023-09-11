
# reset form

## controlled input

```jsx
export default function Form({ addTask }) {
  const [taskInp, setTaskInp] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    addTask(taskInp);
    setTaskInp("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write here"
        value={taskInp}
        onChange={(e) => {
          setTaskInp(e.target.value);
        }}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}
```

## uncontrolled

```jsx
export default function Form() {
  const formRef = useRef(null);

  const handleForm = async (event) => {
    // handle form logic
    ...
    formRef.current.reset();
  };

  return (
    <form ref={formRef} onSubmit={handleForm}>
      ...
    </form>
  );
}

```

## formdata

```jsx
const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  // handle form submission
  ...
  event.target.reset();
};

```
