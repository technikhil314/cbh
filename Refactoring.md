# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

1. Early returns makes code more readable and predictable hence I have used early returns
2. The code becomes more readable as we are not mutating the `candidate` variable at all in the whole flow so developer does not have have to keep track if latest value in `candidate` making it more predictable and easy to following
3. Returning with some basic validations makes the validation rules as well very clear so the function consumer can also understand the data validations rules by taking a look at function body
4. Since hex representation of sha-512 is 128 characters long the first if was always going to meet `candidate.length <= MAX_PARTITION_KEY_LENGTH` so it made sense to return the hash without letting the flow through the `candidate.length <= MAX_PARTITION_KEY_LENGTH` condition check
