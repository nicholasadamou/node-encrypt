# Secrets

In order to have all API keys required they are encrypted and committed to the repository.

- This requires the `key.txt` file. `key.txt` should be placed in this folder.

- Currently only files with `.json` extensions are supported.

- If you update or add a `json` file you'll need to run `yarn encrypt` and then commit the encrypted files.

- If you pull a branch that has a set of updated secrets, you'll need to run `yarn decrypt` if it isn't run automatically by the husky web-hook.