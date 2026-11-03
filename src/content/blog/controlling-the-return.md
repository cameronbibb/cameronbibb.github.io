---
title: "Controlling the Return"
description: "Exploring the concept of controlling the return in software development."
pubDate: 2022-01-15
updatedDate: 2022-01-15
---

<figure>

![Photo of a person playing tennis.](tennis-return.jpeg)

  <figcaption>Photo by Chino Rocha on Unsplash</figcaption>
</figure>

In Ruby, and any programming language for that matter, return value is important. If you don’t know what will be returned by a method or block you are eventually going to get unexpected, bug-introducing results. Luckily, whether explicit or implicit, return values are not too difficult to predict and control.

---

So far in learning Ruby I’ve done fairly well with being able to predict a return value. Today, however, I stumbled a bit over this as I was studying for Launch School’s RB109 written assessment. The problem that caused the stumbling looks like this:

```ruby
def example(str)
  i = 3
  loop do
    puts str
    i -= 1
    break if i == 0
  end
end
example('hello')
```

The general questions for this problem are “What does this code return? What does it output? What concept does it demonstrate?”

And I struggled with that first question on this code. I landed on the return value of `nil` because I recalled the `loop` method returning `nil` in a recent exercise I had completed. But, of course, even if the answer is correct, it’s not good enough if we’re just guessing. We have to understand why it operates the way it does if we are going to code with intent.

# **Determining Return Values in Ruby**

What is the return value of a piece of code? How do we figure that out? Well, in Ruby, it is always the result of the last expression evaluated. So if I have the following:

```ruby
puts "hello"
puts "world"
```

The code would output “hello” and “world” to the screen. We would also get the return value of the second call to `puts` which is `nil` since it is the last expression evaluated in the code. Punch this into irb and you’ll get:

```ruby
hello
world
=> nil
```

In the case of the code snippet from the beginning…

```ruby
def example(str)
  i = 3
  loop do
    puts str
    i -= 1
    break if i == 0
  end
end
example('hello')
```

…the last expression of the method `example` is `loop` with a block, and `loop` returns the result of the last evaluated expression of the block it is passed (that bit of code between the `do..end`). Within the block passed to `loop`, `break if i == 0` is the last expression. Well, what does `break` return? `break` returns `nil` unless it is given an explicit return value.

# **Implicit and Explicit Return Values**

Every evaluated expression in Ruby has a return value, an object that it returns. This object can be exploited or it can be ignored depending on the needs of the program. Usually when dealing with return values we are working with implicit returns. In the code above `nil` would be the implicit return value from executing `break if i == 0`. And we would probably just ignore this return value. However, we can make the return value explicit if we would like—if we need a certain type of object returned. With `break` we can put a variable or literal after the keyword and it will return that object (or, as it is with Ruby, a copy of the reference of that object, and you can find more about that here).

There are many ways we can explicitly return values. We can do this by simply placing the local variable that points to the object we want to return as the last line of the method. We can also use keywords such as `break` or `return` along with the object to return like so…

```ruby
return var
```

# **irb is Your Best Friend**

So, how do we know what a method is going to return? Most of the time we can look up the method in the ruby docs. If it’s a method you defined yourself then of course you get to determine what is returned (within agreed upon boundaries of course, there are rules here, we are a society ; ) ). For instance, if you are writing a method that returns a boolean you might include a `?` at the end of the name to indicate to others—and your future self—that the method returns a boolean value. Or, if the method mutates the caller or the argument, then put a `!` at the end of its name.

In other circumstances, irb is going to be your best friend when determining the return value of a method or expression. And, for me, todays stumble is a great example. I could not locate the return value for `loop` or `break` in the docs. So I opened irb in Terminal and typed in different variations of a loop with a block and the break keyword to see what return values I would get.

# **Conclusion**

If we want control over our program we have to know what it is doing on every line. This, of course, includes return values and objects that are being passed around. When it comes to return values, don’t guess. Control the return.
