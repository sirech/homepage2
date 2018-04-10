---
title: Storing team passwords with gopass
date: "2018-10-04"
layout: post
path: "/storing-passwords-with-gopass"
categories:
  - Security
  - gopass
draft: true
---

When you are working within a team, you tend to have a bunch of passwords that you need to share, such as the credentials that your app need to start for example. Or maybe you have some software where you need the team to share an account, because having one for everyone is too expensive.

People are slowly getting used to the idea of using a password manager for their own passwords. Still, these are some practices that I have observed recently:

- Storing the passwords on Post-It notes that everybody in the whole office can easily check.
- Writing the the password directly on the source code.
- Sending the passwords around via unencrypted email.

When I see those *practices* being used, I can only think of this quote from Scott Adams:

> The goal of every engineer is to retire without getting blamed for a major catastrophe. 

Leaking sensitive passwords is something that I personally don't want to attach to my resume, so I have been preaching a lot lately about storing them in a secure manner. There is a tool which I like for that, [gopass](https://github.com/justwatchcom/gopass**, and I want to talk about setting it up and using it.

<!--more-->

## GPG keys are still a PITA

## Adding/Removing people

## Using passwords from the command line

You know the best part about this? Any shell script can be integrated with this quite easily. I have a script at work that runs a test, and it prompts you for two keys every time it runs. I did this like ten times, and then I got sick of it and rewrote the script to read them from _gopass_ directly. 

**example***

Is that quality of life or what? Notice that if you are running the script on a `CI` pipeline, you can inject the variables beforehand, and the script will work both locally and there, without having to install `gopass` anywhere else and without changing the script.



