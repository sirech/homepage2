---
title: Replacing ESLint with prettier
date: "2018-08-29"
layout: post
path: "/replacing-eslint-with-prettier/"
categories:
  - JavaScript
  - prettier
  - eslint
related:
  - /migrating-to-gatsby2/
  - /angular-from-react-part1/
  - /playing-with-css-grid/
draft: false
description: "I've started using Prettier for formatting my code. ESLint is now purely a linter. Both of them work together beautifully"
---

As I mentioned [while talking about Angular](../angular-from-react-part1/#linting), I have been thinking lately about what should be the role of a linter on a project.

I am a huge fan of linters in general. I love the idea of outsourcing pointless discussions about how to style code to a ruthless program that runs automatically. I imagine the pipeline laughing at whoever broke the build last and scolding them:

> Nothing personal, human, but if you do not put a space before that brace I will block your feature forever

Linters can help with consistency throughout a codebase. They help catching potential errors as well. It is truly built-in quality almost for free.

However, I have been using some tools lately, such as [Terraform](https://www.terraform.io/docs/commands/fmt.html) or [Go](https://golang.org/pkg/fmt/), that take this one step further, and include a tool to directly format the code, without a linting and fixing phase. It actually makes a lot of sense, if you think about it. Automated checking is the first step, but why bother fixing the problems manually when you can automate that step as well?

<!--more-->

## Prettier

I have been using [Prettier](https://github.com/prettier/prettier) more and more in my projects. With this you can actually leave the formatting of the code to it, and use [ESLint](https://eslint.org/) to catch other errors. I really like this combination. _ESLint_ can still provide plenty of value, but I leave getting my code aligned and formatted to a tool that runs as often as I like.

Adding it to a project is really easy. You need to add the dependency first

```
yarn add --dev prettier
```

Then you can extend the `scripts` with a target for it

```json
"format": "prettier --write \"**/*.+(js|jsx|json|css|scss)\""
```

You can run this on commit. For this very blog if have it set up using [lint-staged](https://github.com/okonet/lint-staged) like [this](https://github.com/sirech/homepage2/blob/master/package.json#L81-L100).

And that is pretty (duh) much it. Neat and formatted code that you can share with people who obsess about these kind of details like you.

### Play nice with ESLint

Now you don't want your nicely formatted code to trigger a thousand _ESLint_ warnings. Luckily, somebody already thought of this. [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) allows you to turn off these rules, so that both tools keep working together properly.

### You want more?

Once you start with the formatting, you cannot stop. We already made it part of the commit hook, but why wait so long? Shouldn't the editor run `prettier` automatically on save? You bet it should. In my case, as a faithful _Emacs/Spacemacs_ user, I again made use of a bunch of existing packages so that I get `prettier` run on my _JavaScript_ buffers on save. The config [ain't pretty](https://github.com/sirech/spacemacs.d/blob/master/layers/aj-javascript/packages.el), but it does the job.

## Next

This is so cool, why keep it only for JS? I managed to integrate `terraform fmt` and `gofmt` already, and I wouldn't mind doing something similar for every language that I have to touch (even _bash_).
