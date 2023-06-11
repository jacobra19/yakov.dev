---
slug: recursion-in-react-simplified
title: Recursion in React simplified
description: Understand how recursion works with examples in React
authors: yakov
tags: [blog, react, recursion, 2022]
image: photo-1542355554783-b612ff00383c.avif
hide_table_of_contents: false
---

![Endless Stairs](./photo-1542355554783-b612ff00383c.avif)

Recursion is a computer science practice where a function calls itself until it reaches an exit condition. Sound pretty simple, right?

I Used to struggle with recursive code; it was hard to grasp the notion of something calling (invoking) itself, and it felt too abstract. Usually, recursion is demonstrated with the Fibonacci sequence, binary search tree, or some other theoretical example, which could be tough to wrap your head around. I wondered where such practice would be helpful UI-wise. For example, a comment section where each comment can have a sub-comment which will have a sub-comment of its own, which will have a sub-comment of its own, well, you got the idea.

:::info
First, let's write our comment component without recursion: the author name the comment's content.
:::

```jsx
const Comment = ({ author, content }) => {
  return (
    <div>
      <span>{author}: </span>
      <span>{content}</span>
    </div>
  );
};
```

:::info
Let's render a comment within a comment. It sounds pretty basic, right? We have to call the comment component inside its return statement.
:::

```jsx
const Comment = ({ author, content, subComment }) => {
  return (
    <div className='comment'>
      <span>{author}: </span>
      <span>{content}</span>
      <Comment {...subComment} />
    </div>
  );
};
```

What is wrong with the code above? It's not working! We get an error that says "Cannot read property 'author' of null".
We need the exit condition for this component. When do we want this component to stop rendering itself? If the comment object doesn't have a sub-comment would be the specific case.

We could do this in two ways:
:::info
Solution 1:
if the author or content props are missing then exit:
:::

```jsx
const Comment = ({ author, content, subComment }) => {
  if (!author || !content) return null;
  return (
    <div className='comment'>
      <span>{author}: </span>
      <span>{content}</span>
      <Comment {...subComment} />
    </div>
  );
};
```

:::info
Solution 2:
if the sub-comment object is null:
:::

```jsx
const Comment = ({ author, content, subComment }) => {
  return (
    <div className='comment'>
      <span>{author}: </span>
      <span>{content}</span>
      {subComment && <Comment {...subComment} />}
    </div>
  );
};
```

In the first solution, we call the Comment function (component). When the condition is not met, we exit it, and in the second solution, we check for the condition before calling the function.

You can play with the code here: https://codesandbox.io/s/simple-react-recursion-ycrtbb

Thanks for reading!
