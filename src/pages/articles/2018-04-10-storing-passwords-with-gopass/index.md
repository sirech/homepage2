---
title: Storing team passwords with gopass
date: "2018-04-15"
layout: post
path: "/storing-passwords-with-gopass/"
categories:
  - Security
  - gopass
draft: false
---

When you are working in a team, you tend to have a bunch of passwords that you need to share, such as the credentials that your app needs to start for example. Or maybe you need to share an account for some service.

Everybody kind of knows that posting their own passwords in the open is not a great idea. Yet, team passwords are often not subjected to the same courtesy. These are some practices that I have observed recently:

- Storing the passwords on Post-It notes that everybody in the whole office can easily check.
- Writing the the password directly on the source code.
- Sending the passwords around via unencrypted email.

When I see this, I can only think of this quote from Scott Adams:

> The goal of every engineer is to retire without getting blamed for a major catastrophe. 

Leaking sensitive information is something that I personally don't want to attach to my resume, so I have been preaching a lot lately about storing them somewhere safe. There is a tool which I like for that, which is [gopass](https://github.com/justwatchcom/gopass). I want to talk about setting it up and using it.

<!--more-->

### What are you even talking about?

Quoting the website of the project, `gopass` is a rewrite of the pass password manager in Go. In other words, it is a password manager that can be easily used by multiple people. It is very command line friendly, which allows you to include it in scripts. Very easy to install as well with [brew](https://brew.sh/). We will be installing [GPG](https://www.gnupg.org/) as well, since that is what actually provides the security:

```bash
brew install gopass gpg2
```

## GPG keys are still a PITA

`gopass` itself is quite easy to use, but the encryption is done with _GPG_. Everybody who has dealt with that knows that it is everything but user friendly. One shortcut is to use [Keybase](https://keybase.io/). This is a tool that makes creating keys significantly easier, as explained [here](https://github.com/pstadler/keybase-gpg-github). 

This is a rough summary of the steps you need to follow in order to get your _GPG_ up and running with _Keybase_ for OS X:

- Install _Keybase_:

```
brew cask install keybase
```

- Open the app and create an account
- Create a key through the _CLI_:

```bash
keybase login
keybase pgp gen
```

You will be asked if you want to push the secret key to keybase.io. That is more convenient, but you have to be aware that this puts your key in somebody's else server.

Also it is a good idea to set a passphrase when the key is exported to the GnuPG keychain.

- The key you just created is not trusted by default. You do this with `gpg` itself:

```bash
gpg --edit-key ${YOUR_EMAIL}
gpg> trust (ultimate level)
gpg> 5
gpg> save
```

In order for _GPG_ to work properly, you need to run this:

```bash
export GPG_TTY=$(tty)
```

adding it to your `~/.bashrc` will ensure that you don't have to do it manually every time.

## Initializing a new password store

The sharing part happens through a `git` repository. Every developer syncs with it in order to access the secrets. The first step is to initialize `gopass` itself:

```bash
gopass init
```

It will ask for a key, which we just created. It should for the passphrase that you set up for your _GPG_ key. After that, you can set up the store for the team:

```bash
gopass setup --remote ssh://git@bitbucket.internal.instance.org/your-team/password-store --alias team-store
gopass sync
```

## Adding/Removing people

Once you have the whole thing set up, you can add your fellow developers to the repository. For every developer, you need to import her _GPG_ key and trust it, otherwise will fail when trying to add new recipients

```bash
curl https://keybase.io/${keybase_user}/pgp_keys.asc | gpg --import
# Trust
gpg --edit-key ${EMAIL_OF_THE_DEV}
gpg> lsign
gpg> trust (level 4)
gpg> save
```

After that adding somebody to the repository is a piece of cake.

```bash
gopass recipients add --store=team-store ${KEYID}
``` 

your fellow developers don't need to create a new repository. Instead, once they key has been added to the recipients list, they can just clone it:

```bash
gopass clone ssh://git@bitbucket.internal.instance.org/your-team/password-store team-store
```

Note that if you don't add them to the recipients list first, cloning the repo will result in an error.

## Using passwords from the command line

You know the best part about this? Any shell script can be integrated with this quite easily. I have a script at work that runs a test, and it prompts you for two keys every time it runs. I did this like ten times, and then I got sick of it and rewrote the script to read them from _gopass_ directly.

```bash
gopass show team-store/somewebsite/password
```

Is that quality of life or what? Notice that if you are running the script on a `CI` pipeline, you can inject the variables beforehand, and the script will work both locally and there, without having to install `gopass` anywhere else and without changing the script.

## Troubleshooting

`gpg` tends to give arcane error messages. I built a [verification script](https://github.com/sirech/gopass-verify) that helps debugging the most common issues. You can run it with:

```
git clone https://github.com/sirech/gopass-verify.git && cd gopass-verify && ./go verify
```

Otherwise you can set the debugging flag.

```
export GOPASS_DEBUG=true
```

Running any `gopass` command afterwards will produce a lot more output that should send you in the right direction.

## Summary

In summary, there is no reason to have these passwords laying around when they can be safely stored in something like `gopass`. You know who has access, and can remove the keys when people leave the team. This of course does not fix the need to rotate the keys if somebody had access to them and now shouldn't.

## Alternatives

`gopass` is only one tool among many to deal with passwords. The point is not to use a concrete tool, but to become aware of the huge risk that you can incur by leaving passwords laying around. Here are some alternatives that can work as well:

- [KeePassX](https://www.keepassx.org/): Free an open source. The drawback is that there is only one master password for everybody.
- [1Password for teams](https://1password.com/teams/): I haven't used personally but it was used by some colleagues. It is not free, and the passwords end up in the cloud.
- [Sheesy](https://github.com/share-secrets-safely/cli): Written by a work colleague.
- [Vault by HashiCorp](https://www.vaultproject.io/): Introduces an online dependency and it is quite involved to set up and operate. `Vault` works better for providing secrets for applications.

### Revisions

- 08/2019: Added *Troubleshooting* section.


