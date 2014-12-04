# gmailto

Send quick Gmails from your command line.

## Installation
`npm install gmailto -g`

## Usage
```
  gmailto <emails> <subject> [<message>]
  gmailto -h | --help | --version
```

## Notes
The first time you run `gmailto`, it'll ask you for your name and your Gmail credentials (do **not** include `@gmail.com`):

```
  > Your name: John Doe
  > Gmail username: john.doe
  > Gmail password:
```
This information gets persisted in a file called `.gmailto.json` under your `HOME` directory. So if you want to reset your data, you can either edit this file or remove it and run `gmailto` again.

## Security

Password is securely stored in *Keychain* tool.

## Roadmap
- Attachments: idea of usage `gmailto john@doe.com "Document" --attach ~/some_document.doc`
- List of contacts (alias?): idea of usage `gmailto mom,dad "How are you?"`

## License
This is licensed under the feel-free-to-do-whatever-you-want-to-do license.