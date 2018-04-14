---
title: Storing team passwords with gopass
date: "2018-04-15"
layout: post
path: "/storing-passwords-with-gopass"
categories:
  - Security
  - gopass
draft: false
---

When you are working within a team, you tend to have a bunch of passwords that you need to share, such as the credentials that your app needs to start for example. Or maybe you need to share an account for some service.

Everybody kind of knows that posting their own passwords in the open is not a great idea. Yet, team passwords are often not subjected to the same courtesy. These are some practices that I have observed recently:

- Storing the passwords on Post-It notes that everybody in the whole office can easily check.
- Writing the the password directly on the source code.
- Sending the passwords around via unencrypted email.

When I see this, I can only think of this quote from Scott Adams:

> The goal of every engineer is to retire without getting blamed for a major catastrophe. 

Leaking sensitive information is something that I personally don't want to attach to my resume, so I have been preaching a lot lately about storing them somewhere safe. There is a tool which I like for that, which is [gopass](https://github.com/justwatchcom/gopass). I want to talk about setting it up and using it.

<!--more-->

### What are you even talking about?

Quoting the website of the project, gopass is a rewrite of the pass password manager in Go. In other words, it is a password manager that can be easily used by multiple people. It is very command line friendly, which allows you to include it in scripts. Very easy to install as well with [brew](https://brew.sh/):

```bash
brew install gopass
```

you can commit the store to a `git` repository, and have every developer sync with it in order to access the secrets. It could look like this:

```bash
gopass setup --remote ssh://git@bitbucket.internal.instance.org/your-team/password-store --alias teams-store
gopass sync
```

## GPG keys are still a PITA

`gopass` itself is quite easy to use, but it works with _GPG_ keys to allow users to access the data. Everybody who has dealt with them knows that they are everything but user friendly. One shortcut is to use [Keybase](https://keybase.io/). This is a tool that makes creating keys significantly easier, as explained [here](https://github.com/pstadler/keybase-gpg-github). For the security paranoid, you might have reservations about uploading the private key, and might prefer to do it the hard way.

## Adding/Removing people

Once you have the whole thing set up, you can add your fellow developers to the repository. First you need to import the _GPG_ key and trust it, otherwise `gopass` will give an error when you try to add the new recipient. 

```bash
# Import (Keybase)
curl https://keybase.io/${keybase_user}/pgp_keys.asc | gpg --import
# Import (self created key)
gpg --keyserver ${cert_server} --recv-key ${KEYID}
# Trust
gpg --edit-key ${KEYID}
gpg> lsign
gpg> trust (level 4)
gpg> save
```

After that adding somebody to the repository is a piece of cake.

```bash
gopass recipients add --store=team-store ${KEYID}
``` 

## Using passwords from the command line

You know the best part about this? Any shell script can be integrated with this quite easily. I have a script at work that runs a test, and it prompts you for two keys every time it runs. I did this like ten times, and then I got sick of it and rewrote the script to read them from _gopass_ directly.

```bash
gopass show team-store/somewebsite/password
```

Is that quality of life or what? Notice that if you are running the script on a `CI` pipeline, you can inject the variables beforehand, and the script will work both locally and there, without having to install `gopass` anywhere else and without changing the script.

## Summary

In summary, there is no reason to have these passwords laying around when they can be safely stored in something like `gopass`. You know who has access, and can remove the keys when people leave the team. This of course does not fix the need to rotate the keys if somebody had access to them and now shouldn't.

## Alternatives

`gopass` is only one tool among many to deal with passwords. The point is not to use a concrete tool, but to become aware of the huge risk that you can incur by leaving passwords laying around. Here are some alternatives that can work as well:

- [KeePassX](https://www.keepassx.org/): Free an open source. The drawback is that there is only one master password for everybody.
- [1Password for teams](https://1password.com/teams/): I haven't used personally but it was used by some colleagues. It is not free, and the passwords end up in the cloud.
- [Sheesy](https://github.com/share-secrets-safely/cli): Written by a work colleague.
- [Vault by HashiCorp](https://www.vaultproject.io/): Introduces an online dependency and it is quite involved to set up and operate. `Vault` works better for providing secrets for applications.


