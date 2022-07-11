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

<figure class="figure figure--right">
  <img src="./images/cover.jpeg" alt="Whiteboard interview" />
</figure>

Have you ever considered a position in [BigTech](https://en.wikipedia.org/wiki/Big_Tech) as an engineer? Lots of people do. There's no shortage of articles talking about the process.

If you've looked into it, you're surely aware that you'll have to pass a coding interview as part of the process. Possibly multiple rounds, depending on the company. You're unlikely to get an offer without a decent performance. Better be prepared for them.

Let's talk about coding interviews. There are way too many articles about this topic already. I'm assuming you're familiar with the format already. I'm focusing on a bunch of things that helped me when I was going through the interview process at FAANG.

If you're not up to speed, check out [this article](https://blog.pragmaticengineer.com/preparing-for-the-systems-design-and-coding-interviews/#coding-interviews) from the pragmatic engineer. He's an invaluable source on all things related to tech.

## Coding Interviews Have Moved Online

Traditionally, a coding interview consisted of trying to solve an algorithmic problem with a small program, using only a whiteboard to write the code down. 

Nowadays, most interviews happen remotely using some online editor. This is a pretty big improvement, as coding on a whiteboard is really uncomfortable. Still, don't expect much more than simple code highlighting. You don't get to compile or run your code. 

Thus, the very first thing to do is to get familiar with the environment that you'll be using in the real interview.  

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

There's a whole industry built around preparing for technical interviews. Books, videos, courses, websites, you name it. I would stick to [LeetCode](https://leetcode.com/). LeetCode is an extremely convenient place to practice exercises similar to the ones you might face in a real interview.

LeetCode has a ton of exercises, though. It's easy to get lost. You read horror stories of people that spent months doing it full time. I don't think you need to get to those extremes to have success.

Aim for breadth. I used LeetCode as a way to develop a broad portfolio of techniques that you can apply to solve any problem, even if you haven't seen it before. Some concrete recommendations:

- Cover a variety of structures, like Arrays, Hashes, Linked Lists, Heaps, Trees, or Graphs
- Cover a variety of techniques, like Binary Search, BFS/DFS, Sort, Backtracking, or Sliding Windows

There are some other structures like Tries or [Disjoint Sets](https://en.wikipedia.org/wiki/Disjoint_sets) that make some difficult problems super easy. It's never a bad idea to expand your toolkit. 

Certain algorithms are just too hard to implement in the context of an interview. Nobody other than a sadist will ask you to write a Red-Black Tree in an interview. Then you have some edge cases, like Dynamic Programming. Google is supposed to like them a lot. Get familiar with some of them, but remember that plenty of people struggle mightily solving them.

LeetCode categorizes problems as _easy/medium/hard_. I doubt you will pass an interview for BigTech if you can only solve easy problems. If you are good at finishing medium problems, you're probably good to go. If you can reliably solve hard problems under the constraints of an interview you probably don't need my advice.

### Speed is Key

<figure class="figure figure--right">
  <img src="./images/kotlin.jpeg" alt="Kotlin" />
  <figcaption class="figure__caption">
  The king of terse code
  </figcaption>
</figure>

Interviews are short. To solve two problems, you have about 15-20 minutes per problem at best. Minimizing the amount of typing gives you back some valuable time.

For that reason, I recommend using the highest-level language that you're comfortable with. I don't know if esoteric languages are a good bet, though.

Python is a common choice because it's both popular and high-level. I'm not a C++ person, but it feels a bit too low level. I find Java too verbose (consider using a newer version if you pick it). I don't like JavaScript as it doesn't have a very comprehensive standard library.

I ended up using Kotlin. Similar to Java, but much more succinct. You can use all the standard libraries. I like the language a lot, so it made my preparation easier. I think you should stick to one language, though. Most companies are fairly accommodating in that respect.

### Share your Thoughts

You can't solve problems silently. Even if you're correct, chances are the interviewer got lost or you slightly misinterpreted the question. Don't mistake this advice as filling the silence by talking constantly.

You should talk about the options that you're considering. Even if it's just the brute force approach. Or one that you likely won't get done in time. Share your thoughts and let the interviewer participate. Many are happy to support you and offer valuable tips and input.

Once you start coding, shift to talk about why you are doing things. From the choices you make in data structures, to the structure of the code. Show your interviewer a coherent path. This isn't something that's easy to practice just by doing LeetCode. Consider walking a friend through a problem as practice.

### Get Used to Writing Readable Code

<figure class="figure figure--left">
  <img src="./images/readable.jpeg" alt="Readable" />
  <figcaption class="figure__caption">
  Good variable naming
  </figcaption>
</figure>

The pressure of getting something done quickly will tempt you to take shortcuts. Don't do that.

Use good variable names and split chunks into functions. Write idiomatic code. If needed, add a comment or two. It will help you, and it will help the interviewer evaluate you.

Splitting the code has another benefit; you can solve things in order of importance. If there's a function that's mostly fluff, most interviewers won't care if you leave it unimplemented. I've had interviewers that completed some of my methods while I was writing the core part.

You won't have linters or formatters to help produce readable output. It's on you to get this ingrained as a habit. Doing it naturally means you won't have to focus on it, which leaves space to focus on other meatier parts of the interview.

### A Clear Structure

Following a clear structure helped me a lot. If you get nervous you might forget important steps. Let's say, something along these lines:

- Understand the problem. State it in your own words.
- Input/Output. Write down some inputs and the outputs. Think of edge cases.
- Approach. Think of an approach, explain the tradeoffs. 
- Code the solution
- Read through your solution carefully. Spot errors
- Test the code. Run a sample input manually
- How does the solution perform? Use the O-notation, for time and space
- Can you improve it?

Notice how coding is just one among many steps. That's actually comparable to how you'd approach a problem in real life.

<figure class="figure figure--right">
  <img src="./images/discipline.jpeg" alt="Discipline" />
  <figcaption class="figure__caption">
  Programmers estimating the time complexity of a double loop
  </figcaption>
</figure>

Being disciplined is key. It gives you time to explore the boundaries of the problem. Maybe you misunderstood the problem. Establishing a conversation helps you solve what the interviewer wants you to solve, not what you have in mind. Depending on seniority, you won't pass the interview if you only code a solution without thinking about edge cases, and testing the solution by yourself.

If you don't find the optimal approach, take any solution that you can think of and iterate. Iterate continuously until you get to a good place. Clear code and discipline help tremendously here.

Given that you're diligently preparing, there's a chance that you get a problem that you've solved before. Don't pretend to struggle and "magically" find the optimal solution. You're going to make an ass of yourself and fail in the process. Be honest in what you know. Let the interviewer change the problem if they need to, but don't force the issue yourself.

Learn to do reasonable O-notation estimations on the fly. Nobody is going to expect a hard proof in the middle of the interview. A few heuristics go a long way.

### Don't Give Up!

If you get stuck, don't panic. Keep trying things, keep voicing your thoughts. A naive solution is better than no solution. You might think that you're bombing the interview, but some problems are too big by design.

If you're running out of time, explain how you would continue with the parts that are missing. Whatever you do, don't give up. Even if your performance isn't great, show as much as you can.

## What if I Always Get Nervous During Coding Interviews?

Welcome to the club! Very few people are naturally good at this. An interview is a stressful situation, no matter what. Preparing well gives you a backbone to rely on when things get rough. Interviewers want you to succeed, for the most part.

Even if you are well prepared, you'll fail some interviews miserably. Shit happens. Don't take it as a personal failure. Everybody has gone through that.
