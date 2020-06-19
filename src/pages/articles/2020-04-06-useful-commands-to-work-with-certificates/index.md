---
title: Useful commands to work with certificates
date: "2020-04-08"
layout: post
path: "/useful-commands-to-work-with-certificates/"
categories:
  - Certificates
  - SSL
  - openssl
draft: false
description: "A collection of commands to work with certificates for common operations"
image: ./images/https.png

---

<figure class="figure figure--right">
  <img src="./images/https.png" alt="https" />
</figure>

We seem to have switched to _https_ finally. That means we use certificates all the time, often without paying them much attention. How do you *see* the content of a certificate? Convert it to a different format? There are a bunch of useful commands that are hard to remember unless you use them frequently (or, conveniently, find a post about the topic). I want to share some of them, focusing on doing things from the command line. Maybe you have seen [this wonderful article about OpenSSL commands already](https://www.sslshopper.com/article-most-common-openssl-commands.html). I hope I can provide a bit more context.

As a refresher, we mostly use certificates to verify the identity of a server when using _https_. However, if you are using mTLS, the client needs to present a certificate as well. The [X.509](https://en.wikipedia.org/wiki/X.509) format is how we commonly see them in the wild.

We are going to use some handy tools for this job, which can be installed with [brew](https://brew.sh/), for example:

- [mkcert](https://github.com/FiloSottile/mkcert)
- [openssl](https://www.openssl.org/)
- `base64`

---

## Creating a test certificate

To get started, we need a certificate. If you own a domain, you'll want to use [LetsEncrypt](https://letsencrypt.org/) to generate one programmatically. For demonstration purposes, I'll use `mkcert`.

```console
mkcert -install
mkcert example.com app1.example.com app2.example.com
```

The result is stored under `example.com+2-key.pem` and `example.com+2.pem`

This certificate is issued for three domains, using what's called a [SAN](https://en.wikipedia.org/wiki/Subject_Alternative_Name), which extends the [Common Name](https://support.dnsimple.com/articles/what-is-common-name/) so that you can specify multiple domains. The CN is limited to 64 characters, which can be a problem for internal certificates with a lot of subdomains (don't ask how I learned this!).

Even though it is self-signed, we can still verify it:

```console
openssl verify -CAfile ~/Library/Application\ Support/mkcert/rootCA.pem example.com+2.pem
```

---

## Reading a certificate

You can read the certificate by using:

```console
openssl x509 -in example.com+2.pem -text -noout
```

which displays something like this:

```console
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            d7:98:98:19:27:dd:52:d0:1f:1f:07:b5:ea:85:54:eb
    Signature Algorithm: sha256WithRSAEncryption
        Issuer: O=mkcert development CA, OU=me@my-computer (My Name), CN=mkcert me@my-computer (My Name)
        Validity
            Not Before: Jun  1 00:00:00 2019 GMT
            Not After : Apr  6 20:21:32 2030 GMT
        Subject: O=mkcert development certificate, OU=me@my-computer (My Name)
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                Public-Key: (2048 bit)
                Modulus:
                    00:b1:b7:1b:14:f9:61:79:90:be:21:bc:91:12:78: (...)
                Exponent: 65537 (0x10001)
        X509v3 extensions:
            X509v3 Key Usage: critical
                Digital Signature, Key Encipherment
            X509v3 Extended Key Usage: 
                TLS Web Server Authentication
            X509v3 Basic Constraints: critical
                CA:FALSE
            X509v3 Authority Key Identifier: 
                keyid:34:0F:21:0C:F8:7D:D5:DF:E4:15:B6:15:B9:94:C9:2B:F3:E0:24:AD

            X509v3 Subject Alternative Name: 
                DNS:example.com, DNS:app1.example.com, DNS:app2.example.com
    Signature Algorithm: sha256WithRSAEncryption
         a8:52:3b:19:dc:74:4f:e3:6b:9c:cd:0c:59:c3:fe:e8:0b:2d: (...)
```

We can see there all the relevant information. The _X509v3 Subject Alternative Name_ tends to be the most interesting part because you can see the domains that the certificate covers.

### Encoded certificates

Usually, certificates are stored in PEM format in Base64 ASCII. You recognize them by the `---- BEGIN CERTIFICATE----` line in the beginning. That is what `mkcert` gives us, for instance.

Sometimes a PEM certificate is transmitted encoded in Base64 itself. Let's say we receive our certificate over the wire. We store it under `/tmp/b64-cert`, and it looks like this:

```console
LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUVlakNDQXVLZ0F3SUJBZ0lSQU5lWW1Ca24zVkxRSHg4SHRlcUZWT3N3RFFZSktvWklodmNOQVFFTEJRQXcKZ1lNeEhqQWNCZ05WQkFvVEZXMXJZMlZ5ZENCa1pYWmxiRzl3YldWdWRDQkRRVEVzTUNvR0ExVUVDd3dqYldabApjbTVoYm1SbGVrQm9hWE52YTJFZ0tFMWhjbWx2SUVabGNtNWhibVJsZWlreE16QXhCZ05WQkFNTUttMXJZMlZ5CmRDQnRabVZ5Ym1GdVpHVjZRR2hwYzI5cllTQW9UV0Z5YVc4Z1JtVnlibUZ1WkdWNktUQWVGdzB4T1RBMk1ERXcKTURBd01EQmFGdzB6TURBME1EWXlNREl4TXpKYU1GY3hKekFsQmdOVkJBb1RIbTFyWTJWeWRDQmtaWFpsYkc5dwpiV1Z1ZENCalpYSjBhV1pwWTJGMFpURXNNQ29HQTFVRUN3d2piV1psY201aGJtUmxla0JvYVhOdmEyRWdLRTFoCmNtbHZJRVpsY201aGJtUmxlaWt3Z2dFaU1BMEdDU3FHU0liM0RRRUJBUVVBQTRJQkR3QXdnZ0VLQW9JQkFRQ3gKdHhzVStXRjVrTDRodkpFU2VMNENTL3JET3RxbGZGN0syN1g3NERuQ0ExeHpDMlkwTkJxa1hPVWFka2VRZ1MrSgo4NVFZQlYrcWFFRGhZNVNMZm1MTGxkMmFWQnIvSG9MYVFuRDc4VXJuVHNHM1JJb2dEYlI0R25CQnJUc0ltQWk3CnRNeU1kVVZSc21EM1RYcmUxdFM4dmowL3RQNzE1UEQvRTd1Tk94M2VyYjUrQmtFY0JodElnbVU4ZUVybnpLMnEKNkV0N0tsUERwQm5mL2pySEM0ZU1URFBiRDhqeGZBRmhvZ2R0YUgrTGRxeDZ6Uk5mN2pTZXNXMTJNMW5JenpsTwpLa0IxaHBhOEZqc3Y3Ry9ONytFeHFzQzMrQjdaZHB5UWl5Zm8ydU1KL1lJQWJMN29sbnV5THF5UkZPNWNaNnp3Cjg5MG5lV1gweE5hWmE5bWo3RmNwQWdNQkFBR2pnWk13Z1pBd0RnWURWUjBQQVFIL0JBUURBZ1dnTUJNR0ExVWQKSlFRTU1Bb0dDQ3NHQVFVRkJ3TUJNQXdHQTFVZEV3RUIvd1FDTUFBd0h3WURWUjBqQkJnd0ZvQVVOQThoRFBoOQoxZC9rRmJZVnVaVEpLL1BnSkswd09nWURWUjBSQkRNd01ZSUxaWGhoYlhCc1pTNWpiMjJDRUdGd2NERXVaWGhoCmJYQnNaUzVqYjIyQ0VHRndjREl1WlhoaGJYQnNaUzVqYjIwd0RRWUpLb1pJaHZjTkFRRUxCUUFEZ2dHQkFLaFMKT3huY2RFL2phNXpOREZuRC91Z0xMYlNlV0NsVjFMSnFNU3NLbE16VXZ4aVlmKzdzeDZRUmxZcGtYeWpndVFUNwppRWZMWUhQZG8zeTJMNmFIaW9tbU1FUjNmWjAyMjJWUWJhV2hjUkJmUDgzdFhnQmdqN0pUZjArUUxjVERXZG9YCnd2KzZQNHNuNmVqV2xWc3drZTBQcjhLMm9DM1NyazVibjJFVVpQSU1oQnNMZFdmczBZbkZhRTFCY2ZlWGNVV0QKU3QzckRZcjFlSW1mQ1FTQ1BkU0ZwTU5HWS81dkdtWm5lVTNxbXlhS2hLNWZRREhkWVpQYlQ5NFE4ZDBVVXRaMgpEeWdxQmFmTG5oMWxmVHRRNi9NUjdIQlNWZCtWajcwRnFCajJlaEJlTXZhUDUrQlRCTEFCbWdoK0VMVHp6VTRUCmdHMHZuSzF2OUhvd1FDaVdadDkxZDRtdFRHbldJQVVHWGpKcDBjMmVHbU5NOUN4eVM0QTJNRXRJcngwZy9ESWQKNU9rMXZodnVJOTV4cWVOZ1E4UDBrOEF0VWlYdVp4Uk53M1FubHdLRzloMDhmVGJRc04rZEh1T2lhRWNPcWY4WgoxcStxakxQMlVsbmZYaGwyN25aUVgwZ3F5ZnROUldRV3pvc0V6cGh0RVpwdGJrVzZPUExhby9DNHhVRU5lQT09Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K
```

Yes, that's a very long line. `openssl` can't read that out of the box, so we've got to decode it first. Moreover, it can be that, once decoded the lines are too long, which confuses `openssl`. We'll decode and fold that string so that we can read the certificate again:

```console
base64 -d /tmp/b64-cert | fold -64 | openssl x509 -text -noout
```

### Binary certificates

Sometimes your certificate is encoded in [DER](https://wiki.openssl.org/index.php/DER), a binary format. The `JVM` world really likes to transport certificates in this way. You'll notice that if you inspect such a certificate, it will be mostly a bunch of special characters and gibberish. Luckily, `openssl` can convert from DER to PEM, in both directions.

```console
openssl x509 -in example.com+2.pem -outform DER -out example.com+2.der
openssl x509 -inform DER -in example.com+2.der -text -noout
```

### Binary certificates encoded in base64url

What if you have a certificate in DER format, that has been encoded in [base64url](https://base64.guru/standards/base64url)? Your first thought might be, "That's an oddly specific combination". But it can actually happen. If you are implementing your own ACME server, it is part of the [protocol to request a certificate](https://tools.ietf.org/html/rfc8555#section-7.1.5). I recently spent quite a bit of time trying to make sense of that.

There is no out-of-the-box tool to decode Base64 URL, but you can use a script like [this one](https://raw.githubusercontent.com/Moodstocks/moodstocks-api-clients/master/bash/base64url.sh). You can read this mysterious certificate by combining the script with the previous calls:

```console
./base64url.sh decode `cat /tmp/b64url-cert | tr -d '\n'` | openssl x509 -inform DER -text -noout
```

You will probably never run into this, but if you do, this will save you a ton of time.

---

## Checking a certificate on a remote server

What if you don't have the certificate, but want to get it from a remote server? _openssl_ is up to the task.

```console
echo -n | openssl s_client -connect google.com:443 -servername google.com | openssl x509 -text -noout
```

With the `s_client` command, we are requesting the certificate presented by a host on a specific port (usually 443). In this case, we are checking the certificate from _google.com_. We can pipe the output into the standard command for reading a certificate. We pipe the `echo -n` first so that it doesn't hang.

You might be wondering about the `-servername` option. That is related to [SNI](https://en.wikipedia.org/wiki/Server_Name_Indication). If the target is serving multiple domains under the same IP address, you might want to select the one associated with a domain. I recently needed the option when testing a Kubernetes [nginx ingress](https://github.com/kubernetes/ingress-nginx) that was serving a self-signed certificate unless I specified that option.

---

## We are only scratching the surface

This post was focused on reading existing certificates, but there are a ton more things that you can do with `openssl`, including writing them, extracting keys and whatnot. Not to mention [Certificate signing requests](https://en.wikipedia.org/wiki/Certificate_signing_request). Reading is a good place to familiarize yourself with certificates, however.

*EDIT 19/06/2020:* Fix `openssl s_client` command
