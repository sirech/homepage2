---
title: "Tips for Coding Interviews at FAANG"
date: "2022-07-11"
layout: post
path: "/tips-for-coding-interviews-at-faang/"
description: "Coding interviews at FAANG are difficult. Let me share some tips that helped me go through these interviews successfully"
categories:
  - Interviews
  - Coding Challenge
  - FAANG
  - Career
draft: false
related:
  - /how-not-to-do-a-take-home-coding-assignment/
  - /book-review-staff-engineer/
image: ./images/cover.jpeg
---

<div class="guide">

### Interviewing at BigTech

- [**Part 1 - Coding Interview**](../tips-for-coding-interviews-at-faang/)
- [Part 2 - System Design](../the-system-design-interview/)

</div>

<figure class="figure figure--right">
  <img src="./images/cover.jpeg" alt="Whiteboard interview" />
</figure>

Have you ever considered a position in [BigTech](https://en.wikipedia.org/wiki/Big_Tech) as an engineer? Lots of people do. There's no shortage of articles where people talk about their experiences.

If you've looked into it, you know that you'll have to pass a coding interview as part of the process. Possibly multiple rounds, depending on the company. You're unlikely to get an offer without a decent performance. Better be prepared for them.

Let's talk about coding interviews. There are way too many articles about this topic already. I'm assuming you're familiar with the format already. I'm going to focus on a bunch of things that helped me during the interview process at FAANG.

If you're not up to speed, check out [this article](https://blog.pragmaticengineer.com/preparing-for-the-systems-design-and-coding-interviews/#coding-interviews) from the pragmatic engineer. He's an invaluable source on all things related to tech.

## Coding Interviews Have Moved Online

Coding interviews are about writing a small program. Typically it's an algorithmic challenge. Traditionally, you'd do that in person, writing your code on a whiteboard.

Nowadays, most interviews happen remotely using some online editor. It's a pretty significant improvement, as coding on a whiteboard is quite uncomfortable. Still, don't expect much more than simple code highlighting. You don't get to compile or run your code. 

Thus, the very first thing to do is to get familiar with the environment you'll be using in the real interview.

## Preparing for a Coding Interview

It goes without saying, but if you're going through the process, you'll have to spend time preparing. If you can't commit to that, or you fundamentally oppose the idea, then you should skip the whole thing. I don't think you can realistically pass a FAANG interview loop without any preparation.

With that in mind, here are six tips for a more successful coding interview:

- The Right Amount of Grinding
- Speed is Key
- Share your Thoughts
- Get Used to Write Readable Code
- A Clear Structure
- Don't Give Up

### The Right Amount of Grinding

<figure class="figure figure--left">
  <img src="./images/grinding.jpeg" alt="Grinding" />
  <figcaption class="figure__caption">
  Putting that subscription to use
  </figcaption>
</figure>

There's a whole industry built around preparing for technical interviews. Books, videos, courses, websites, you name it. I would stick to [LeetCode](https://leetcode.com/). LeetCode is a highly convenient place to practice exercises similar to the ones you'll encounter.

LeetCode has a ton of exercises, though. It's easy to get lost. You read horror stories of people that spent months doing it full time. I don't think you need to get to those extremes to have success.

Aim for breadth. I used LeetCode to develop a broad portfolio of techniques you can apply to any problem. Some concrete recommendations:

- Cover a variety of structures, like Arrays, Hashes, Linked Lists, Heaps, Trees, or Graphs
- Cover a variety of techniques, like Binary Search, BFS/DFS, Sort, Backtracking, or Sliding Windows

Other structures like Tries or [Disjoint Sets](https://en.wikipedia.org/wiki/Disjoint_sets) make some difficult problems super easy. It's never a bad idea to expand your toolkit. 

Certain algorithms are just too hard to implement in the context of an interview. Nobody other than a sadist will ask you to write a Red-Black Tree in an interview. Then you have some edge cases, like Dynamic Programming. Google is supposed to like them a lot. Get familiar with some of them, but remember that plenty of people struggle mightily solving them.

LeetCode categorizes problems as _easy/medium/hard_. I doubt you will pass an interview for BigTech if you can only handle easy problems. If you are good at finishing medium problems, you're probably good to go. If you can reliably solve hard problems under the constraints of an interview you probably don't need my advice.

### Speed is Key

<figure class="figure figure--right">
  <img src="./images/kotlin.jpeg" alt="Kotlin" />
  <figcaption class="figure__caption">
  The king of terse code
  </figcaption>
</figure>

Interviews are short. You have about 15-20 minutes per problem to solve two problems, at best. Minimizing the amount of typing gives you back some valuable time.

For that reason, I recommend using the highest-level language you're comfortable with. I don't know if esoteric languages are a good bet, though.

Python is a common choice because it's both popular and high-level. I'm not a C++ person, but it feels a bit too low level. I find Java too verbose (consider using a newer version if you pick it). I don't like JavaScript as it doesn't have a very comprehensive standard library.

I ended up using Kotlin. Similar to Java, but much more succinct. You can use all the standard libraries. I like the language a lot, so it made my preparation easier. I think you should stick to one language, though. Most companies are fairly accommodating in that respect.

### Share your Thoughts

You can't solve problems silently. Even if you're correct, you might lose your interviewer. However, don't mistake this ubiquitous advice for constant talking. Just avoiding silence isn't good enough.

You should talk about the options that you're considering. What are the tradeoffs? Maybe you have a great idea that won't fit within the interview. Share your thoughts and let the interviewer participate. Many are happy to support you and offer valuable tips and input.

Once you start coding, shift to discuss why you are doing things. Explain the choices you make in data structures. Walk the interviewer through the structure of the code. Show her a coherent path. 

Talking while coding isn't easy to practice just by doing LeetCode. Consider walking a friend through a problem, or doing a mock interview.

### Get Used to Writing Readable Code

<figure class="figure figure--left">
  <img src="./images/readable.jpeg" alt="Readable" />
  <figcaption class="figure__caption">
  Good variable naming
  </figcaption>
</figure>

The pressure of getting something done quickly will tempt you to take shortcuts. Don't do that.

Use good variable names and split chunks into functions. Write idiomatic code. If needed, add a comment or two. It will help you, and it will help the interviewer evaluate you.

Splitting the code has another benefit; you can tackle things in order of importance. Most interviewers won't care if you leave boilerplate functions unimplemented. I've had interviewers that completed some of my methods while I was writing the core part.

You won't have linters or formatters to help produce readable output. It's on you to get this ingrained as a habit. Doing it naturally means you won't have to focus on it, which leaves space to focus on other meatier parts of the interview.

### A Clear Structure

Following a clear structure helped me a lot. If you get nervous you might forget important steps. Take this as an example:

- Understand the problem. State it in your own words.
- Input/Output. Write down some inputs and the outputs. Think of edge cases.
- Approach. Think of an approach, and explain the tradeoffs. 
- Code the solution
- Read through your solution carefully. Spot errors
- Test the code. Run a sample input manually
- How does the solution perform? Use the O-notation, for time and space
- Can you improve it?

Notice how coding is just one among many steps. That's comparable to how you'd approach a problem in real life.

<figure class="figure figure--right">
  <img src="./images/discipline.jpeg" alt="Discipline" />
  <figcaption class="figure__caption">
  Programmers estimating the time complexity of a double loop
  </figcaption>
</figure>

Being disciplined is key. It gives you time to explore the boundaries of the problem. Maybe you misunderstood the problem. Establishing a conversation helps you work on what the interviewer wants, not what you have in mind. Depending on seniority, you won't pass the interview if you only code a solution without thinking about edge cases and testing the solution by yourself.

If you don't find the optimal approach, take any solution that you can think of and iterate. Iterate continuously until you get to a good place. Clear code and discipline help tremendously here.

Given that you're diligently preparing, there's a chance that you get a problem that you've seen before. Don't pretend to struggle and "magically" find the optimal solution. You'll make an ass of yourself and fail in the process. Be honest in what you know. Let the interviewer change the problem if they need to, but don't force the issue yourself.

Learn to do reasonable O-notation estimations on the fly. Nobody is going to expect hard proof in the middle of the interview. A few heuristics go a long way.

### Don't Give Up!

If you get stuck, don't panic. Keep trying things, and keep voicing your thoughts. A naive solution is better than no solution. You might think that you're bombing the interview, but some problems are too big by design.

If you're running out of time, explain how you would continue with the parts that are missing. Whatever you do, don't give up. Even if your performance isn't great, show as much as possible.

## What if I Always Get Nervous During Coding Interviews?

Welcome to the club! Very few people are naturally good at this. An interview is a stressful situation, no matter what. Preparing well gives you the backbone to rely on when things get rough. Interviewers want you to succeed, for the most part.

Even if you are well prepared, you'll fail some interviews miserably. Shit happens. Don't take it as a personal failure. Everybody has gone through that.
